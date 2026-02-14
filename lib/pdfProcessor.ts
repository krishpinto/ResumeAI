import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker for pdf.js
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.');
  }
}

export async function validatePDFFile(file: File): Promise<boolean> {
  try {
    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      throw new Error('File must be a PDF');
    }
    
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size must be less than 10MB');
    }
    
    return true;
  } catch (error) {
    console.error('PDF validation error:', error);
    throw error;
  }
}

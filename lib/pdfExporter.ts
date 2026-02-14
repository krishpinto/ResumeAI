import html2pdf from 'html2pdf.js';

export async function generatePDFFromElement(
  element: HTMLElement,
  filename: string = 'resume.pdf'
): Promise<void> {
  try {
    if (!element) {
      throw new Error('Element not found for PDF generation');
    }

    // Create a clone to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;

    const options = {
      margin: 0.5,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      },
      jsPDF: {
        orientation: 'portrait',
        unit: 'in',
        format: 'letter',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    await html2pdf().set(options).from(clonedElement).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}

export async function downloadResumePDF(
  element: HTMLElement,
  resumeTitle: string = 'resume'
): Promise<void> {
  try {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${resumeTitle.replace(/\s+/g, '-')}-${timestamp}.pdf`;
    
    await generatePDFFromElement(element, filename);
  } catch (error) {
    console.error('Error downloading resume PDF:', error);
    throw error;
  }
}

export function prepareElementForPDFExport(element: HTMLElement): HTMLElement {
  // Create a copy for styling
  const copy = element.cloneNode(true) as HTMLElement;
  
  // Remove any interactive elements or styling that doesn't work in PDF
  const scripts = copy.querySelectorAll('script, style, [data-no-export]');
  scripts.forEach(el => el.remove());

  // Ensure text color is black for better PDF compatibility
  const allElements = copy.querySelectorAll('*');
  allElements.forEach((el: Element) => {
    const htmlEl = el as HTMLElement;
    // Don't override if there's already inline style with color
    if (!htmlEl.style.color) {
      htmlEl.style.color = '#000000';
    }
  });

  return copy;
}

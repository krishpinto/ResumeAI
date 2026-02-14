'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import type { ResumeData } from '@/types/resume';
import { ResumePreview } from '@/components/ResumePreview';
import { extractTextFromPDF, validatePDFFile } from '@/lib/pdfProcessor';

type Step = 'upload' | 'extracting' | 'extracted' | 'formatting' | 'preview';

export default function ResumeEnhancer() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [fileName, setFileName] = useState<string>('');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [error, setError] = useState<string>('');
  const [extractionProgress, setExtractionProgress] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setFileName(file.name);

    try {
      // Validate file
      await validatePDFFile(file);

      // Step 1: Extract text from PDF
      setCurrentStep('extracting');
      setExtractionProgress('Extracting text from PDF...');
      const extractedText = await extractTextFromPDF(file);

      if (!extractedText || extractedText.trim().length === 0) {
        throw new Error('No text could be extracted from the PDF. Please ensure the PDF contains readable text.');
      }

      setExtractionProgress('Parsing resume data with AI...');
      setCurrentStep('extracted');

      // Step 2: Send to extraction API
      const extractResponse = await fetch('/api/extractResume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ extractedText }),
      });

      if (!extractResponse.ok) {
        const errorData = await extractResponse.json();
        throw new Error(errorData.error || 'Failed to extract resume data');
      }

      const { data: extractedData } = await extractResponse.json();

      setExtractionProgress('Formatting resume with ATS optimization...');
      setCurrentStep('formatting');

      // Step 3: Format the extracted data
      const formatResponse = await fetch('/api/formatResume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ extractedData }),
      });

      if (!formatResponse.ok) {
        const errorData = await formatResponse.json();
        throw new Error(errorData.error || 'Failed to format resume');
      }

      const { data: formattedData } = await formatResponse.json();
      setResumeData(formattedData);
      setCurrentStep('preview');
    } catch (error) {
      console.error('Error processing resume:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while processing your resume';
      setError(errorMessage);
      setCurrentStep('upload');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const input = document.getElementById('file-upload') as HTMLInputElement;
      if (input) {
        input.files = files;
        handleFileUpload({ target: input } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleRetry = () => {
    setCurrentStep('upload');
    setFileName('');
    setResumeData(null);
    setError('');
    setExtractionProgress('');
  };

  // Step 1: Upload
  if (currentStep === 'upload') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Resume Formatter</h1>
            <p className="text-xl text-gray-600">
              Upload your resume and let our AI extract, parse, and format it into an ATS-optimized document
            </p>
          </div>

          <Card className="border-2 border-gray-200 shadow-lg">
            <CardContent className="pt-8">
              <div
                className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer bg-white"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  PDF files up to 10MB
                </p>
                <label
                  htmlFor="file-upload"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Choose File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900">Error</h3>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // Step 2 & 3: Extracting and Formatting
  if (currentStep === 'extracting' || currentStep === 'extracted' || currentStep === 'formatting') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardContent className="pt-12">
              <div className="flex flex-col items-center justify-center p-8">
                <div className="mb-6">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Your Resume</h2>
                <p className="text-gray-600 text-center mb-6">{extractionProgress}</p>
                
                {/* Progress indicator */}
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                      currentStep === 'extracting' ? 'bg-blue-600' : 'bg-green-600'
                    }`}>
                      {currentStep === 'extracting' ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className="text-gray-700">Extracting text from PDF</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                      currentStep === 'extracted' ? 'bg-blue-600' : currentStep !== 'extracting' ? 'bg-green-600' : 'bg-gray-300'
                    }`}>
                      {currentStep === 'extracted' ? <Loader2 className="w-4 h-4 animate-spin" /> : currentStep !== 'extracting' ? <CheckCircle2 className="w-4 h-4" /> : <span>2</span>}
                    </div>
                    <span className="text-gray-700">Parsing with AI</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                      currentStep === 'formatting' ? 'bg-blue-600' : currentStep === 'preview' ? 'bg-green-600' : 'bg-gray-300'
                    }`}>
                      {currentStep === 'formatting' ? <Loader2 className="w-4 h-4 animate-spin" /> : currentStep === 'preview' ? <CheckCircle2 className="w-4 h-4" /> : <span>3</span>}
                    </div>
                    <span className="text-gray-700">Formatting with ATS optimization</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // Step 4: Preview and Download
  if (currentStep === 'preview' && resumeData) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={handleRetry}
              className="mb-6"
            >
              Upload Another Resume
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Formatted Resume</h1>
            <p className="text-gray-600">
              Your resume has been extracted, parsed, and optimized for ATS systems. Edit any information below and download your PDF.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <ResumePreview
              data={resumeData}
              onDataChange={setResumeData}
            />
          </div>
        </div>
      </main>
    );
  }

  return null;
}

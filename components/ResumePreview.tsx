'use client';

import React, { useState } from 'react';
import type { ResumeData } from '@/types/resume';
import { ATSResumeTemplate } from './ATSResumeTemplate';
import { Button } from './ui/button';
import { Download, Edit2, Eye } from 'lucide-react';
import { downloadResumePDF } from '@/lib/pdfExporter';

interface ResumePreviewProps {
  data: ResumeData;
  onDataChange?: (data: ResumeData) => void;
  isLoading?: boolean;
}

export function ResumePreview({ data, onDataChange, isLoading }: ResumePreviewProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<ResumeData>(data);
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = React.useRef<HTMLDivElement>(null);

  const handleSaveEdits = () => {
    onDataChange?.(editData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditMode(false);
  };

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      if (resumeRef.current) {
        const filename = `${data.contact.fullName || 'resume'}-${new Date().toISOString().split('T')[0]}.pdf`;
        await downloadResumePDF(resumeRef.current, data.contact.fullName || 'resume');
      }
    } catch (error) {
      console.error('Failed to download PDF:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(editData));
    
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setEditData(newData);
  };

  if (isEditMode) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Resume</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdits}
              disabled={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg">Contact Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={editData.contact.fullName}
                onChange={(e) => updateField('contact.fullName', e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={editData.contact.email}
                onChange={(e) => updateField('contact.email', e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={editData.contact.phoneNumber}
                onChange={(e) => updateField('contact.phoneNumber', e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                type="url"
                value={editData.contact.linkedIn || ''}
                onChange={(e) => updateField('contact.linkedIn', e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <input
                type="url"
                value={editData.contact.github || ''}
                onChange={(e) => updateField('contact.github', e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Portfolio</label>
              <input
                type="url"
                value={editData.contact.portfolio || ''}
                onChange={(e) => updateField('contact.portfolio', e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg">Professional Summary</h3>
          <textarea
            value={editData.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm min-h-24"
            placeholder="Enter your professional summary..."
          />
        </div>

        {/* Skills */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg">Skills</h3>
          <textarea
            value={editData.skills.join(', ')}
            onChange={(e) => updateField('skills', e.target.value.split(',').map(s => s.trim()))}
            className="w-full px-3 py-2 border rounded-md text-sm min-h-20"
            placeholder="Enter skills separated by commas..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resume Preview</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditMode(true)}
            disabled={isLoading}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading || isLoading}
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? 'Downloading...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <ATSResumeTemplate ref={resumeRef} data={editData} />
      </div>
    </div>
  );
}

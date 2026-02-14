import { NextResponse } from 'next/server';
import type { ResumeData } from '@/types/resume';
import {
  validateResumeData,
  removeEmptyFields,
  generateProfessionalSummary,
  enhanceBulletPoints,
  cleanAndNormalizeResume,
} from '@/lib/resumeProcessor';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { extractedData } = body;

    if (!extractedData) {
      return NextResponse.json(
        { error: 'Missing extracted data' },
        { status: 400 }
      );
    }

    // Validate and clean the extracted data
    let resumeData: ResumeData = validateResumeData(extractedData);

    // Apply smart formatting and normalization
    resumeData = cleanAndNormalizeResume(resumeData);

    // Generate summary if still missing
    if (!resumeData.summary) {
      resumeData.summary = generateProfessionalSummary(resumeData);
    }

    // Enhance all bullet points
    resumeData.workExperience = resumeData.workExperience.map(exp => ({
      ...exp,
      achievements: exp.achievements.map(a => enhanceBulletPoints(a)),
    }));

    resumeData.projects = resumeData.projects.map(proj => ({
      ...proj,
      achievements: proj.achievements.map(a => enhanceBulletPoints(a)),
    }));

    return NextResponse.json({
      success: true,
      data: resumeData,
    });
  } catch (error) {
    console.error('Error formatting resume:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to format resume';
    
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
}

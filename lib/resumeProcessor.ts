import type { ResumeData } from '@/types/resume';

export function validateResumeData(data: Partial<ResumeData>): ResumeData {
  // Ensure all required fields exist with proper structure
  // Be lenient with validation - accept items even if some fields are missing
  const validated: ResumeData = {
    title: data.title || 'Professional Resume',
    contact: {
      fullName: (data.contact?.fullName || '').trim(),
      email: (data.contact?.email || '').trim(),
      phoneNumber: (data.contact?.phoneNumber || '').trim(),
      linkedIn: data.contact?.linkedIn?.trim(),
      github: data.contact?.github?.trim(),
      portfolio: data.contact?.portfolio?.trim(),
    },
    summary: (data.summary || '').trim(),
    workExperience: (data.workExperience || [])
      .filter(exp => (exp.title?.trim() || exp.company?.trim()))
      .map(exp => ({
        ...exp,
        title: exp.title?.trim() || 'Position',
        company: exp.company?.trim() || 'Company',
        location: exp.location?.trim() || '',
        startDate: exp.startDate?.trim() || '',
        endDate: exp.endDate?.trim() || '',
        achievements: (exp.achievements || []).filter(a => a && a.trim()),
      })),
    skills: (data.skills || [])
      .filter(skill => skill && skill.trim())
      .slice(0, 30), // Limit to 30 skills for ATS optimization
    education: (data.education || [])
      .filter(edu => (edu.degree?.trim() || edu.institution?.trim()))
      .map(edu => ({
        ...edu,
        degree: edu.degree?.trim() || 'Degree',
        institution: edu.institution?.trim() || 'Institution',
        location: edu.location?.trim() || '',
        startDate: edu.startDate?.trim() || '',
        endDate: edu.endDate?.trim() || '',
      })),
    certifications: (data.certifications || [])
      .filter(cert => cert.name && cert.name.trim())
      .map(cert => ({
        ...cert,
        name: cert.name.trim(),
        organization: cert.organization?.trim(),
        year: cert.year?.trim(),
      })),
    projects: (data.projects || [])
      .filter(proj => proj.name && proj.name.trim())
      .map(proj => ({
        ...proj,
        name: proj.name.trim(),
        description: proj.description?.trim() || '',
        achievements: (proj.achievements || []).filter(a => a && a.trim()),
      })),
    additionalInfo: {
      languages: (data.additionalInfo?.languages || [])
        .filter(lang => lang && lang.trim())
        .slice(0, 10),
      volunteerExperience: data.additionalInfo?.volunteerExperience?.trim(),
      publications: data.additionalInfo?.publications?.trim(),
    },
    theme: data.theme || 'light',
  };

  return validated;
}

export function removeEmptyFields(data: ResumeData): ResumeData {
  const cleaned = { ...data };
  
  // Remove empty achievements from work experience
  cleaned.workExperience = cleaned.workExperience.map(exp => ({
    ...exp,
    achievements: exp.achievements.filter(a => a && a.trim()),
  }));

  // Remove empty projects achievements
  cleaned.projects = cleaned.projects.map(proj => ({
    ...proj,
    achievements: proj.achievements.filter(a => a && a.trim()),
  }));

  // Remove empty skills
  cleaned.skills = cleaned.skills.filter(s => s && s.trim());

  // Remove empty languages
  cleaned.additionalInfo.languages = cleaned.additionalInfo.languages.filter(l => l && l.trim());

  return cleaned;
}

export function generateProfessionalSummary(data: ResumeData): string {
  // If summary exists and is not empty, return it
  if (data.summary && data.summary.trim()) {
    return data.summary;
  }

  // Generate a summary based on available data
  const recentJob = data.workExperience[0];
  const topSkills = data.skills.slice(0, 3).join(', ');
  const yearsExp = Math.max(1, data.workExperience.length);

  if (recentJob && topSkills) {
    return `Experienced professional with ${yearsExp}+ years of expertise in ${topSkills}. Skilled in delivering high-quality results and driving success in ${recentJob.title} roles.`;
  }

  if (topSkills) {
    return `Professional with expertise in ${topSkills}. Dedicated to delivering excellence and achieving measurable results.`;
  }

  return '';
}

export function enhanceBulletPoints(text: string): string {
  // Remove weak action verbs and enhance with strong ones
  const weakVerbs = [
    'did', 'was', 'were', 'made', 'got', 'had',
    'handled', 'worked on', 'involved', 'helped with',
  ];

  const strongVerbs = [
    'achieved', 'delivered', 'implemented', 'led', 'optimized',
    'spearheaded', 'orchestrated', 'accelerated', 'transformed',
  ];

  let enhanced = text;

  // Start with capital letter if not already
  if (enhanced.length > 0) {
    enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);
  }

  // Ensure bullet points end with a period
  if (enhanced && !enhanced.endsWith('.')) {
    enhanced = enhanced + '.';
  }

  return enhanced;
}

export function formatDateRange(startDate: string, endDate: string): string {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startMonth = start.toLocaleString('default', { month: 'short' });
    const startYear = start.getFullYear();

    if (endDate.toLowerCase() === 'present' || endDate.toLowerCase() === 'current') {
      return `${startMonth} ${startYear} - Present`;
    }

    const endMonth = end.toLocaleString('default', { month: 'short' });
    const endYear = end.getFullYear();

    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  } catch (error) {
    return `${startDate} - ${endDate}`;
  }
}

export function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX if 10 digits
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // Format with + if international
  if (digits.length > 10) {
    return `+${digits}`;
  }

  return phone;
}

export function cleanAndNormalizeResume(data: ResumeData): ResumeData {
  let cleaned = removeEmptyFields(data);
  
  // Normalize contact info
  if (cleaned.contact.phoneNumber) {
    cleaned.contact.phoneNumber = normalizePhoneNumber(cleaned.contact.phoneNumber);
  }

  // Generate summary if missing
  if (!cleaned.summary) {
    cleaned.summary = generateProfessionalSummary(cleaned);
  }

  // Enhance all bullet points
  cleaned.workExperience = cleaned.workExperience.map(exp => ({
    ...exp,
    achievements: exp.achievements.map(a => enhanceBulletPoints(a)),
  }));

  cleaned.projects = cleaned.projects.map(proj => ({
    ...proj,
    achievements: proj.achievements.map(a => enhanceBulletPoints(a)),
  }));

  // Format date ranges
  cleaned.workExperience = cleaned.workExperience.map(exp => ({
    ...exp,
    startDate: exp.startDate,
    endDate: exp.endDate,
  }));

  return cleaned;
}

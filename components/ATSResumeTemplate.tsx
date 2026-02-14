'use client';

import React from 'react';
import type { ResumeData } from '@/types/resume';

interface ATSResumeTemplateProps {
  data: ResumeData;
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

export const ATSResumeTemplate = React.forwardRef<
  HTMLDivElement,
  ATSResumeTemplateProps
>(({ data }, ref) => {
  const hasWorkExperience = data.workExperience && data.workExperience.length > 0;
  const hasEducation = data.education && data.education.length > 0;
  const hasSkills = data.skills && data.skills.length > 0;
  const hasCertifications = data.certifications && data.certifications.length > 0;
  const hasProjects = data.projects && data.projects.length > 0;
  const hasLanguages = data.additionalInfo?.languages && data.additionalInfo.languages.length > 0;
  const hasVolunteer = data.additionalInfo?.volunteerExperience && data.additionalInfo.volunteerExperience.trim();
  const hasPublications = data.additionalInfo?.publications && data.additionalInfo.publications.trim();

  return (
    <div
      ref={ref}
      className="w-full max-w-4xl mx-auto bg-white p-8 text-gray-900 font-sans leading-relaxed"
      style={{
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        lineHeight: '1.5',
        color: '#000',
        backgroundColor: '#fff',
      }}
    >
      {/* Header - Contact Information */}
      <div className="mb-4 border-b-2 border-gray-900 pb-3">
        <h1 className="text-3xl font-bold mb-2" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {data.contact.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap gap-2 text-sm" style={{ fontSize: '11px' }}>
          {data.contact.phoneNumber && (
            <span>{data.contact.phoneNumber}</span>
          )}
          {data.contact.email && (
            <>
              {data.contact.phoneNumber && <span>|</span>}
              <span>{data.contact.email}</span>
            </>
          )}
          {data.contact.linkedIn && (
            <>
              <span>|</span>
              <span>{data.contact.linkedIn}</span>
            </>
          )}
          {data.contact.github && (
            <>
              <span>|</span>
              <span>{data.contact.github}</span>
            </>
          )}
          {data.contact.portfolio && (
            <>
              <span>|</span>
              <span>{data.contact.portfolio}</span>
            </>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && data.summary.trim() && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{ fontSize: '12px', fontWeight: 'bold' }}>
            Professional Summary
          </h2>
          <p className="text-sm" style={{ fontSize: '11px' }}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {hasWorkExperience && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{ fontSize: '12px', fontWeight: 'bold' }}>
            Work Experience
          </h2>
          
          {data.workExperience.map((job, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-baseline" style={{ fontSize: '11px' }}>
                <div>
                  <span className="font-bold">{job.title}</span>
                  <span className="mx-2">|</span>
                  <span>{job.company}</span>
                </div>
                {job.startDate && job.endDate && (
                  <span className="text-gray-700">
                    {job.startDate} – {job.endDate}
                  </span>
                )}
              </div>
              {job.location && (
                <p className="text-sm text-gray-700 mb-1" style={{ fontSize: '11px' }}>
                  {job.location}
                </p>
              )}
              
              {job.achievements && job.achievements.length > 0 && (
                <ul className="mt-1 ml-4" style={{ fontSize: '11px' }}>
                  {job.achievements
                    .filter(a => a && a.trim())
                    .map((achievement, aidx) => (
                      <li key={aidx} className="list-disc mb-1">
                        {achievement}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {hasSkills && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{ fontSize: '12px', fontWeight: 'bold' }}>
            Skills
          </h2>
          <p className="text-sm" style={{ fontSize: '11px' }}>
            {data.skills.filter(s => s && s.trim()).join(' • ')}
          </p>
        </div>
      )}

      {/* Education */}
      {hasEducation && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{ fontSize: '12px', fontWeight: 'bold' }}>
            Education
          </h2>
          
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-between items-baseline" style={{ fontSize: '11px' }}>
                <div>
                  <span className="font-bold">{edu.degree}</span>
                  {edu.institution && (
                    <>
                      <span className="mx-2">|</span>
                      <span>{edu.institution}</span>
                    </>
                  )}
                </div>
                {edu.startDate && edu.endDate && (
                  <span className="text-gray-700">
                    {edu.startDate} – {edu.endDate}
                  </span>
                )}
              </div>
              {edu.location && (
                <p className="text-sm text-gray-700" style={{ fontSize: '11px' }}>
                  {edu.location}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {hasCertifications && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{ fontSize: '12px', fontWeight: 'bold' }}>
            Certifications
          </h2>
          
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="text-sm mb-1" style={{ fontSize: '11px' }}>
              <span className="font-bold">{cert.name}</span>
              {cert.organization && (
                <>
                  <span className="mx-2">|</span>
                  <span>{cert.organization}</span>
                </>
              )}
              {cert.year && (
                <>
                  <span className="mx-2">|</span>
                  <span>{cert.year}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {hasProjects && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{ fontSize: '12px', fontWeight: 'bold' }}>
            Projects
          </h2>
          
          {data.projects.map((project, idx) => (
            <div key={idx} className="mb-3">
              <div className="font-bold text-sm" style={{ fontSize: '11px' }}>
                {project.name}
              </div>
              {project.description && (
                <p className="text-sm text-gray-700 mb-1" style={{ fontSize: '11px' }}>
                  {project.description}
                </p>
              )}
              
              {project.achievements && project.achievements.length > 0 && (
                <ul className="ml-4" style={{ fontSize: '11px' }}>
                  {project.achievements
                    .filter(a => a && a.trim())
                    .map((achievement, aidx) => (
                      <li key={aidx} className="list-disc mb-1">
                        {achievement}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Additional Information */}
      {(hasLanguages || hasVolunteer || hasPublications) && (
        <div>
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{ fontSize: '12px', fontWeight: 'bold' }}>
            Additional Information
          </h2>
          
          {hasLanguages && (
            <p className="text-sm mb-1" style={{ fontSize: '11px' }}>
              <span className="font-bold">Languages:</span> {data.additionalInfo.languages.filter(l => l && l.trim()).join(', ')}
            </p>
          )}
          
          {hasVolunteer && (
            <p className="text-sm mb-1" style={{ fontSize: '11px' }}>
              <span className="font-bold">Volunteer Experience:</span> {data.additionalInfo.volunteerExperience}
            </p>
          )}
          
          {hasPublications && (
            <p className="text-sm" style={{ fontSize: '11px' }}>
              <span className="font-bold">Publications:</span> {data.additionalInfo.publications}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

ATSResumeTemplate.displayName = 'ATSResumeTemplate';

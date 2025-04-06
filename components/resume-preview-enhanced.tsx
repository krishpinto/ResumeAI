"use client"

import type React from "react"
import type { ResumeData } from "@/types/resume"

interface ResumePreviewProps {
  resumeData: ResumeData
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  if (!resumeData) return <div>No resume data available</div>

  return (
    <div className="p-8 font-sans">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{resumeData.contact?.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 text-sm mt-1">
          {resumeData.contact?.email && <span>{resumeData.contact.email}</span>}
          {resumeData.contact?.phoneNumber && <span>{resumeData.contact.phoneNumber}</span>}
          {resumeData.contact?.linkedIn && <span>{resumeData.contact.linkedIn}</span>}
          {resumeData.contact?.github && <span>{resumeData.contact.github}</span>}
          {resumeData.contact?.portfolio && <span>{resumeData.contact.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Professional Summary</h2>
          <p>{resumeData.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {resumeData.workExperience && resumeData.workExperience.length > 0 && resumeData.workExperience[0].title && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Work Experience</h2>
          {resumeData.workExperience.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p>
                    {job.company}
                    {job.location ? `, ${job.location}` : ""}
                  </p>
                </div>
                <div className="text-sm">
                  {job.startDate} - {job.endDate || "Present"}
                </div>
              </div>
              {job.achievements && job.achievements.filter((a) => a).length > 0 && (
                <ul className="list-disc pl-5 mt-2">
                  {job.achievements
                    .filter((a) => a)
                    .map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && resumeData.education[0].degree && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p>
                    {edu.institution}
                    {edu.location ? `, ${edu.location}` : ""}
                  </p>
                </div>
                <div className="text-sm">
                  {edu.startDate} - {edu.endDate || "Present"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.filter((s) => s).length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills
              .filter((s) => s)
              .map((skill, index) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications[0].name && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Certifications</h2>
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-semibold">{cert.name}</h3>
              <p>
                {cert.organization} ({cert.year})
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects[0].name && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="mb-1">{project.description}</p>
              {project.achievements && project.achievements.filter((a) => a).length > 0 && (
                <ul className="list-disc pl-5">
                  {project.achievements
                    .filter((a) => a)
                    .map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResumePreview


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { PlusCircle, Trash2, ArrowRight, ArrowLeft } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import ResumePreview from "@/components/resume-preview-enhanced"
import { type ResumeData, getResumeData } from "@/types/resume"

export default function SkillsPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<ResumeData>(getResumeData())
  const { state } = useSidebar()

  // Save resume data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  const handleSkillChange = (index: number, value: string) => {
    setResumeData((prev) => {
      const newData = { ...prev }
      newData.skills[index] = value
      return newData
    })
  }

  const addSkill = () => {
    setResumeData((prev) => {
      return {
        ...prev,
        skills: [...prev.skills, ""],
      }
    })
  }

  const removeSkill = (index: number) => {
    setResumeData((prev) => {
      const newData = { ...prev }
      newData.skills = newData.skills.filter((_, i) => i !== index)
      return newData
    })
  }

  const handleCertificationChange = (index: number, field: string, value: string) => {
    setResumeData((prev) => {
      const newData = { ...prev }
      newData.certifications[index] = {
        ...newData.certifications[index],
        [field]: value,
      }
      return newData
    })
  }

  const addCertification = () => {
    setResumeData((prev) => {
      return {
        ...prev,
        certifications: [
          ...prev.certifications,
          {
            name: "",
            organization: "",
            year: "",
          },
        ],
      }
    })
  }

  const removeCertification = (index: number) => {
    setResumeData((prev) => {
      const newData = { ...prev }
      newData.certifications = newData.certifications.filter((_, i) => i !== index)
      return newData
    })
  }

  const handlePrevious = () => {
    router.push("/resume-builder/education")
  }

  const handleNext = () => {
    router.push("/resume-builder/projects")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left side - Form */}
      <div
        className={`${
          state === "collapsed" ? "w-full md:w-1/2" : "w-1/2"
        } overflow-auto p-6 border-r transition-all duration-300`}
      >
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Skills & Certifications</h1>

          <div className="space-y-8">
            <div>
              <Label htmlFor="skills">Skills</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Add your technical and soft skills. Be specific and include skills relevant to your target job.
              </p>

              {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Input
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    placeholder={`Skill ${index + 1}`}
                    className="mr-2"
                  />
                  {resumeData.skills.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button variant="outline" onClick={addSkill} className="w-full mt-2">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </div>

            <div>
              <Label htmlFor="certifications">Certifications</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Add any relevant certifications or professional qualifications.
              </p>

              {resumeData.certifications.map((cert, index) => (
                <Card key={index} className="p-4 relative mb-4">
                  {resumeData.certifications.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeCertification(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                      <Input
                        id={`cert-name-${index}`}
                        value={cert.name}
                        onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                        placeholder="AWS Certified Solutions Architect"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`cert-year-${index}`}>Year</Label>
                      <Input
                        id={`cert-year-${index}`}
                        value={cert.year}
                        onChange={(e) => handleCertificationChange(index, "year", e.target.value)}
                        placeholder="2022"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Label htmlFor={`cert-org-${index}`}>Issuing Organization</Label>
                      <Input
                        id={`cert-org-${index}`}
                        value={cert.organization}
                        onChange={(e) => handleCertificationChange(index, "organization", e.target.value)}
                        placeholder="Amazon Web Services"
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <Button variant="outline" onClick={addCertification} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Education
              </Button>
              <Button onClick={handleNext}>
                Next: Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Preview */}
      <div
        className={`${
          state === "collapsed" ? "hidden md:block md:w-1/2" : "w-1/2"
        } overflow-auto bg-muted/30 p-6 transition-all duration-300`}
      >
        <div className="sticky top-6">
          <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  )
}


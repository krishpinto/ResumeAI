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

export default function ExperiencePage() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<ResumeData>(getResumeData())
  const { state } = useSidebar()

  // Save resume data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  const handleInputChange = (index: number, field: string, value: string) => {
    setResumeData((prev) => {
      const newData = { ...prev }
      newData.workExperience[index] = {
        ...newData.workExperience[index],
        [field]: value,
      }
      return newData
    })
  }

  const handleAchievementChange = (jobIndex: number, achievementIndex: number, value: string) => {
    setResumeData((prev) => {
      const newData = { ...prev }
      newData.workExperience[jobIndex].achievements[achievementIndex] = value
      return newData
    })
  }

  const addWorkExperience = () => {
    setResumeData((prev) => {
      return {
        ...prev,
        workExperience: [
          ...prev.workExperience,
          {
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            achievements: ["", "", ""],
          },
        ],
      }
    })
  }

  const removeWorkExperience = (index: number) => {
    setResumeData((prev) => {
      const newData = { ...prev }
      newData.workExperience = newData.workExperience.filter((_, i) => i !== index)
      return newData
    })
  }

  const handlePrevious = () => {
    router.push("/resume-builder/basic-info")
  }

  const handleNext = () => {
    router.push("/resume-builder/education")
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
          <h1 className="text-2xl font-bold mb-6">Work Experience</h1>

          <div className="space-y-8">
            {resumeData.workExperience.map((job, index) => (
              <Card key={index} className="p-4 relative">
                {resumeData.workExperience.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeWorkExperience(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`job-title-${index}`}>Job Title</Label>
                    <Input
                      id={`job-title-${index}`}
                      value={job.title}
                      onChange={(e) => handleInputChange(index, "title", e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input
                      id={`company-${index}`}
                      value={job.company}
                      onChange={(e) => handleInputChange(index, "company", e.target.value)}
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <Label htmlFor={`job-location-${index}`}>Location</Label>
                    <Input
                      id={`job-location-${index}`}
                      value={job.location}
                      onChange={(e) => handleInputChange(index, "location", e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                      <Input
                        id={`start-date-${index}`}
                        value={job.startDate}
                        onChange={(e) => handleInputChange(index, "startDate", e.target.value)}
                        placeholder="Jan 2020"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`end-date-${index}`}>End Date</Label>
                      <Input
                        id={`end-date-${index}`}
                        value={job.endDate}
                        onChange={(e) => handleInputChange(index, "endDate", e.target.value)}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Key Achievements</Label>
                  {job.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="mb-2">
                      <Input
                        value={achievement}
                        onChange={(e) => handleAchievementChange(index, achievementIndex, e.target.value)}
                        placeholder={`Achievement ${achievementIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <Button variant="outline" onClick={addWorkExperience} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Work Experience
            </Button>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Basic Info
              </Button>
              <Button onClick={handleNext}>
                Next: Education
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


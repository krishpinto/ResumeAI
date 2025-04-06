"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { PlusCircle, Trash2, ArrowRight, ArrowLeft } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import ResumePreview from "@/components/resume-preview-enhanced"
import { type ResumeData, getResumeData } from "@/types/resume"

export default function ProjectsPage() {
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
      newData.projects[index] = {
        ...newData.projects[index],
        [field]: value,
      }
      return newData
    })
  }

  const handleAchievementChange = (projectIndex: number, achievementIndex: number, value: string) => {
    setResumeData((prev) => {
      const newData = { ...prev }
      newData.projects[projectIndex].achievements[achievementIndex] = value
      return newData
    })
  }

  const addProject = () => {
    setResumeData((prev) => {
      return {
        ...prev,
        projects: [
          ...prev.projects,
          {
            name: "",
            description: "",
            achievements: ["", ""],
          },
        ],
      }
    })
  }

  const removeProject = (index: number) => {
    setResumeData((prev) => {
      const newData = { ...prev }
      newData.projects = newData.projects.filter((_, i) => i !== index)
      return newData
    })
  }

  const handlePrevious = () => {
    router.push("/resume-builder/skills")
  }

  const handleNext = () => {
    router.push("/resume-builder/theme")
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
          <h1 className="text-2xl font-bold mb-6">Projects</h1>

          <div className="space-y-8">
            {resumeData.projects.map((project, index) => (
              <Card key={index} className="p-4 relative">
                {resumeData.projects.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}

                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                    <Input
                      id={`project-name-${index}`}
                      value={project.name}
                      onChange={(e) => handleInputChange(index, "name", e.target.value)}
                      placeholder="E-commerce Platform"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-desc-${index}`}>Description</Label>
                    <Textarea
                      id={`project-desc-${index}`}
                      value={project.description}
                      onChange={(e) => handleInputChange(index, "description", e.target.value)}
                      placeholder="Briefly describe the project, technologies used, and your role"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Key Achievements</Label>
                    {project.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="mb-2">
                        <Input
                          value={achievement}
                          onChange={(e) => handleAchievementChange(index, achievementIndex, e.target.value)}
                          placeholder={`Achievement ${achievementIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            <Button variant="outline" onClick={addProject} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Project
            </Button>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Skills
              </Button>
              <Button onClick={handleNext}>
                Next: Theme
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


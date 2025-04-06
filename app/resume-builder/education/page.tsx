"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { PlusCircle, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import ResumePreview from "@/components/resume-preview-enhanced";
import { type ResumeData, getResumeData } from "@/types/resume";

export default function EducationPage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData>(getResumeData());
  const { state } = useSidebar();

  // Save resume data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const handleInputChange = (index: number, field: string, value: string) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      newData.education[index] = {
        ...newData.education[index],
        [field]: value,
      };
      return newData;
    });
  };

  const addEducation = () => {
    setResumeData((prev) => {
      return {
        ...prev,
        education: [
          ...prev.education,
          {
            degree: "",
            institution: "",
            location: "",
            startDate: "",
            endDate: "",
          },
        ],
      };
    });
  };

  const removeEducation = (index: number) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      newData.education = newData.education.filter((_, i) => i !== index);
      return newData;
    });
  };

  const handlePrevious = () => {
    router.push("/resume-builder/experience");
  };

  const handleNext = () => {
    router.push("/resume-builder/skills");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left side - Form */}
      <div
        className={`${
          state === "collapsed" ? "w-full md:w-1/2" : "w-1/2"
        } overflow-auto p-6 border-r transition-all duration-300`}
      >
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Education</h1>

          <div className="space-y-8">
            {resumeData.education.map((edu, index) => (
              <Card key={index} className="p-4 relative">
                {resumeData.education.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`degree-${index}`} className="mb-1">
                      Degree
                    </Label>
                    <Input
                      id={`degree-${index}`}
                      value={edu.degree}
                      onChange={(e) =>
                        handleInputChange(index, "degree", e.target.value)
                      }
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`institution-${index}`} className="mb-1">
                      Institution
                    </Label>
                    <Input
                      id={`institution-${index}`}
                      value={edu.institution}
                      onChange={(e) =>
                        handleInputChange(index, "institution", e.target.value)
                      }
                      placeholder="University of California"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`edu-location-${index}`} className="mb-1">
                      Location
                    </Label>
                    <Input
                      id={`edu-location-${index}`}
                      value={edu.location}
                      onChange={(e) =>
                        handleInputChange(index, "location", e.target.value)
                      }
                      placeholder="Berkeley, CA"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label
                        htmlFor={`edu-start-date-${index}`}
                        className="mb-1"
                      >
                        Start Date
                      </Label>
                      <Input
                        id={`edu-start-date-${index}`}
                        value={edu.startDate}
                        onChange={(e) =>
                          handleInputChange(index, "startDate", e.target.value)
                        }
                        placeholder="Sep 2016"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`edu-end-date-${index}`} className="mb-1">
                        End Date
                      </Label>
                      <Input
                        id={`edu-end-date-${index}`}
                        value={edu.endDate}
                        onChange={(e) =>
                          handleInputChange(index, "endDate", e.target.value)
                        }
                        placeholder="Jun 2020"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <Button variant="outline" onClick={addEducation} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Education
            </Button>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Experience
              </Button>
              <Button onClick={handleNext}>
                Next: Skills
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
  );
}

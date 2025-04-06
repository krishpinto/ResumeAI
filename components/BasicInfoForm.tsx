"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import ResumePreview from "@/components/resume-preview-enhanced";
import { type ResumeData, defaultResumeData } from "@/types/resume";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function BasicInfoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id"); // Get the resumeId from the query parameters
  const { state } = useSidebar(); // Get the state from the useSidebar hook

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem("resumeData");
    return savedData ? JSON.parse(savedData) : defaultResumeData;
  });

  useEffect(() => {
    if (resumeId) {
      const fetchResumeData = async () => {
        try {
          const docRef = doc(db, "resumes", resumeId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setResumeData({ id: resumeId, ...docSnap.data() } as ResumeData);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching resume:", error);
        }
      };

      fetchResumeData();
    }
  }, [resumeId]);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const handleInputChange = (
    section: string | null,
    field: string,
    value: string
  ) => {
    setResumeData((prev) => {
      const newData = { ...prev };

      if (section === "contact") {
        newData.contact = { ...newData.contact, [field]: value };
      } else {
        newData[field as keyof ResumeData] = value as any;
      }

      return newData;
    });
  };

  const handleNext = () => {
    router.push("/resume-builder/experience");
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
          <h1 className="text-2xl font-bold mb-6">Basic Information</h1>

          <div className="space-y-6">
            <div>
              <Label htmlFor="resume-title" className="mb-1">
                Resume Title
              </Label>
              <Input
                id="resume-title"
                value={resumeData?.title || ""}
                onChange={(e) =>
                  handleInputChange(null, "title", e.target.value)
                }
                placeholder="e.g., Senior Developer Resume"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full-name" className="mb-1">
                  Full Name
                </Label>
                <Input
                  id="full-name"
                  value={resumeData?.contact.fullName || ""}
                  onChange={(e) =>
                    handleInputChange("contact", "fullName", e.target.value)
                  }
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email" className="mb-1">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData?.contact.email || ""}
                  onChange={(e) =>
                    handleInputChange("contact", "email", e.target.value)
                  }
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="mb-1">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={resumeData?.contact.phoneNumber || ""}
                  onChange={(e) =>
                    handleInputChange("contact", "phoneNumber", e.target.value)
                  }
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <Label htmlFor="linkedin" className="mb-1">
                  LinkedIn (optional)
                </Label>
                <Input
                  id="linkedin"
                  value={resumeData?.contact.linkedIn || ""}
                  onChange={(e) =>
                    handleInputChange("contact", "linkedIn", e.target.value)
                  }
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <Label htmlFor="github" className="mb-1">
                  GitHub (optional)
                </Label>
                <Input
                  id="github"
                  value={resumeData?.contact.github || ""}
                  onChange={(e) =>
                    handleInputChange("contact", "github", e.target.value)
                  }
                  placeholder="github.com/johndoe"
                />
              </div>
              <div>
                <Label htmlFor="portfolio" className="mb-1">
                  Portfolio Website (optional)
                </Label>
                <Input
                  id="portfolio"
                  value={resumeData?.contact.portfolio || ""}
                  onChange={(e) =>
                    handleInputChange("contact", "portfolio", e.target.value)
                  }
                  placeholder="johndoe.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="summary" className="mb-1">
                Professional Summary
              </Label>
              <Textarea
                id="summary"
                value={resumeData?.summary || ""}
                onChange={(e) =>
                  handleInputChange(null, "summary", e.target.value)
                }
                placeholder="Briefly describe your professional background and key strengths"
                rows={4}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Tip: Keep your summary concise and highlight your most relevant
                skills and experiences.
              </p>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext}>
                Next: Experience
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
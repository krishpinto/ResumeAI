"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save, Download } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import ResumePreview from "@/components/resume-preview-enhanced";
import {
  type ResumeData,
  type ResumeTheme,
  defaultResumeData,
  getResumeData,
} from "@/types/resume";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ThemePage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData>(getResumeData());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { state } = useSidebar();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User ID:", user.uid); // Log the user ID
        setUserId(user.uid); // Save the user ID in state
      } else {
        console.log("No user is currently authenticated.");
        router.push("/login"); // Redirect to login page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const handleThemeChange = (value: ResumeTheme) => {
    setResumeData((prev) => ({
      ...prev,
      theme: value,
    }));
  };

  const handleSaveResume = async () => {
    setIsLoading(true);

    try {
      if (!userId) {
        console.error("User is not authenticated");
        return;
      }

      console.log("Saving resume for User ID:", userId);

      const dataToSave = {
        ...resumeData,
        userId,
        lastUpdated: new Date().toISOString(),
      };

      console.log("Data being saved:", dataToSave);

      if (resumeData.id) {
        // If resumeId exists, update the document
        const docRef = doc(db, "resumes", resumeData.id);
        await setDoc(docRef, dataToSave, { merge: true });
        console.log("Resume updated successfully");
      } else {
        // If no resumeId, create a new document
        const resumeCollection = collection(db, "resumes");
        const docRef = await addDoc(resumeCollection, dataToSave);
        console.log("Resume created successfully with ID:", docRef.id);

        // Update the resumeData state with the new ID
        setResumeData((prev) => ({
          ...prev,
          id: docRef.id,
        }));
      }

      // Clear localStorage and reset resumeData state
      localStorage.removeItem("resumeData");
      setResumeData(defaultResumeData);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadResume = () => {
    const resumeContent = `
    Resume Title: ${resumeData?.title || "N/A"}
    Full Name: ${resumeData?.contact?.fullName || "N/A"}
    Email: ${resumeData?.contact?.email || "N/A"}
    Phone Number: ${resumeData?.contact?.phoneNumber || "N/A"}
    LinkedIn: ${resumeData?.contact?.linkedIn || "N/A"}
    GitHub: ${resumeData?.contact?.github || "N/A"}
    Portfolio: ${resumeData?.contact?.portfolio || "N/A"}

    Summary:
    ${resumeData?.summary || "N/A"}

    Work Experience:
    ${
      resumeData?.workExperience
        ?.map(
          (exp) =>
            `- ${exp.title || "N/A"} at ${exp.company || "N/A"} (${
              exp.startDate || "N/A"
            } - ${exp.endDate || "N/A"})\n  Achievements: ${
              exp.achievements?.join(", ") || "N/A"
            }`
        )
        .join("\n") || "N/A"
    }

    Skills:
    ${resumeData?.skills?.join(", ") || "N/A"}

    Education:
    ${
      resumeData?.education
        ?.map(
          (edu) =>
            `- ${edu.degree || "N/A"} from ${edu.institution || "N/A"} (${
              edu.startDate || "N/A"
            } - ${edu.endDate || "N/A"})`
        )
        .join("\n") || "N/A"
    }

    Certifications:
    ${
      resumeData?.certifications
        ?.map((cert) => `- ${cert.name || "N/A"} (${cert.year || "N/A"})`)
        .join("\n") || "N/A"
    }

    Projects:
    ${
      resumeData?.projects
        ?.map(
          (proj) =>
            `- ${proj.name || "N/A"}: ${
              proj.description || "N/A"
            }\n  Achievements: ${proj.achievements?.join(", ") || "N/A"}`
        )
        .join("\n") || "N/A"
    }

    Additional Information:
    Languages: ${resumeData?.additionalInfo?.languages?.join(", ") || "N/A"}
    Volunteer Experience: ${
      resumeData?.additionalInfo?.volunteerExperience || "N/A"
    }
    Publications: ${resumeData?.additionalInfo?.publications || "N/A"}
  `;

    // Create a Blob for the plain text file
    const blob = new Blob([resumeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resumeData?.title || "resume"}.txt`; // Use the resume title as the file name
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);

    console.log("Resume downloaded successfully as plain text.");
  };

  const downloadResume = async (id: string) => {
    try {
      const docRef = doc(db, "resumes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const resumeData = docSnap.data();

        // Format the resume data into plain text
        const resumeContent = `
        Resume Title: ${resumeData.title || "N/A"}
        Full Name: ${resumeData.contact?.fullName || "N/A"}
        Email: ${resumeData.contact?.email || "N/A"}
        Phone Number: ${resumeData.contact?.phoneNumber || "N/A"}
        LinkedIn: ${resumeData.contact?.linkedIn || "N/A"}
        GitHub: ${resumeData.contact?.github || "N/A"}
        Portfolio: ${resumeData.contact?.portfolio || "N/A"}

        Summary:
        ${resumeData.summary || "N/A"}

        Work Experience:
        ${
          resumeData.workExperience
            ?.map(
              (exp: any) =>
                `- ${exp.title || "N/A"} at ${exp.company || "N/A"} (${
                  exp.startDate || "N/A"
                } - ${exp.endDate || "N/A"})\n  Achievements: ${
                  exp.achievements?.join(", ") || "N/A"
                }`
            )
            .join("\n") || "N/A"
        }

        Skills:
        ${resumeData.skills?.join(", ") || "N/A"}

        Education:
        ${
          resumeData.education
            ?.map(
              (edu: any) =>
                `- ${edu.degree || "N/A"} from ${edu.institution || "N/A"} (${
                  edu.startDate || "N/A"
                } - ${edu.endDate || "N/A"})`
            )
            .join("\n") || "N/A"
        }

        Certifications:
        ${
          resumeData.certifications
            ?.map(
              (cert: any) => `- ${cert.name || "N/A"} (${cert.year || "N/A"})`
            )
            .join("\n") || "N/A"
        }

        Projects:
        ${
          resumeData.projects
            ?.map(
              (proj: any) =>
                `- ${proj.name || "N/A"}: ${
                  proj.description || "N/A"
                }\n  Achievements: ${proj.achievements?.join(", ") || "N/A"}`
            )
            .join("\n") || "N/A"
        }

        Additional Information:
        Languages: ${resumeData.additionalInfo?.languages?.join(", ") || "N/A"}
        Volunteer Experience: ${
          resumeData.additionalInfo?.volunteerExperience || "N/A"
        }
        Publications: ${resumeData.additionalInfo?.publications || "N/A"}
      `;

        // Create a Blob for the plain text file
        const blob = new Blob([resumeContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        // Create a temporary <a> element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = `${resumeData.title || "resume"}.txt`; // Use the resume title as the file name
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);

        console.log("Resume downloaded successfully as plain text.");
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  const handlePrevious = () => {
    router.push("/resume-builder/projects"); // Navigate to the "Projects" page
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
          <h1 className="text-2xl font-bold mb-6">Choose a Theme</h1>

          <div className="space-y-8">
            <RadioGroup
              value={resumeData.theme}
              onValueChange={handleThemeChange}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="light"
                  id="theme-light"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="theme-light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <div className="h-24 w-full bg-white border rounded-md mb-2 flex items-center justify-center text-center p-2">
                    <div className="text-xs">Light Theme Preview</div>
                  </div>
                  <div className="font-semibold">Light</div>
                </Label>
              </div>

              <div>
                <RadioGroupItem
                  value="dark"
                  id="theme-dark"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="theme-dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <div className="h-24 w-full bg-gray-900 border rounded-md mb-2 flex items-center justify-center text-center p-2 text-white">
                    <div className="text-xs">Dark Theme Preview</div>
                  </div>
                  <div className="font-semibold">Dark</div>
                </Label>
              </div>

              <div>
                <RadioGroupItem
                  value="vibrant"
                  id="theme-vibrant"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="theme-vibrant"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <div className="h-24 w-full bg-gradient-to-r from-purple-500 to-pink-500 border rounded-md mb-2 flex items-center justify-center text-center p-2 text-white">
                    <div className="text-xs">Vibrant Theme Preview</div>
                  </div>
                  <div className="font-semibold">Vibrant</div>
                </Label>
              </div>
            </RadioGroup>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Projects
              </Button>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={handleDownloadResume}>
                  <Download className="mr-2 h-4 w-4" />
                  Download File
                </Button>
                <Button onClick={handleSaveResume} disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Resume
                    </>
                  )}
                </Button>
              </div>
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
          <div
            className={`rounded-lg shadow-sm overflow-hidden ${
              resumeData.theme === "dark"
                ? "bg-gray-900 text-white"
                : resumeData.theme === "vibrant"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white"
            }`}
          >
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

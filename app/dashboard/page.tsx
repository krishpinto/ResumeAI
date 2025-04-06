"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Plus, Download, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust the import path to your Firebase configuration
import { getAuth } from "firebase/auth";

export default function Dashboard() {
  const [resumes, setResumes] = useState<
    {
      id: string;
      title?: string;
      lastUpdated?: string;
      theme?: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      const auth = getAuth();
      const userId = auth.currentUser?.uid; // Get the authenticated user's ID

      if (!userId) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const q = query(
          collection(db, "resumes"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);

        const fetchedResumes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setResumes(fetchedResumes);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const deleteResume = async (id: string) => {
    try {
      await deleteDoc(doc(db, "resumes", id));
      setResumes(resumes.filter((resume) => resume.id !== id));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
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

  return (
    <div className="container py-8 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <Link href="/resume-builder/basic-info/">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Resume
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p>Loading resumes...</p>
        </div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
          <p className="text-muted-foreground mb-6">
            Create your first resume to get started
          </p>
          <Link href="/resume-builder/basic-info/">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Resume
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {resume.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Last updated: {resume.lastUpdated}
                </p>
                <p className="text-sm">
                  Theme: <span className="capitalize">{resume.theme}</span>
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => downloadResume(resume.id)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <div className="flex gap-2">
                  <Link href={`/resume-builder/basic-info/?id=${resume.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => deleteResume(resume.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

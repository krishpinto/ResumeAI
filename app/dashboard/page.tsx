"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import {
  FileText,
  Plus,
  Download,
  Edit,
  Trash2,
  Eye,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

// Resume template thumbnails
const resumeTemplates = {
  modern: "/placeholder.svg?height=600&width=450",
  professional: "/placeholder.svg?height=600&width=450",
  creative: "/placeholder.svg?height=600&width=450",
  minimal: "/placeholder.svg?height=600&width=450",
  executive: "/placeholder.svg?height=600&width=450",
  light: "/placeholder.svg?height=600&width=450",
  dark: "/placeholder.svg?height=600&width=450",
};

// Sample resume data for preview
const sampleResumeData = {
  contact: {
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phoneNumber: "(555) 123-4567",
    linkedIn: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    portfolio: "alexjohnson.dev",
  },
  summary:
    "Experienced software engineer with 5+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies.",
  workExperience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      startDate: "Jan 2021",
      endDate: "Present",
      achievements: [
        "Led a team of 5 developers to deliver a major product feature that increased user engagement by 35%",
        "Implemented CI/CD pipeline that reduced deployment time by 60%",
        "Optimized database queries resulting in 40% faster page load times",
      ],
    },
    {
      title: "Software Developer",
      company: "Digital Solutions LLC",
      startDate: "Jun 2018",
      endDate: "Dec 2020",
      achievements: [
        "Developed responsive web applications using React and TypeScript",
        "Collaborated with UX designers to implement user-friendly interfaces",
        "Mentored junior developers and conducted code reviews",
      ],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
  ],
  education: [
    {
      degree: "Master of Computer Science",
      institution: "University of Technology",
      startDate: "2016",
      endDate: "2018",
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "State University",
      startDate: "2012",
      endDate: "2016",
    },
  ],
};

export default function Dashboard() {
  const [resumes, setResumes] = useState<
    {
      id: string;
      title?: string;
      lastUpdated?: string;
      theme?: string;
      data?: any;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResumes = async () => {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;

      if (!userId) {
        console.error("User is not authenticated");
        setLoading(false);
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
          ...(doc.data() as {
            title?: string;
            lastUpdated?: string;
            theme?: string;
            data?: any;
          }),
        }));

        // Sort resumes by date (newest first)
        const sortedResumes = [...fetchedResumes].sort((a, b) => {
          return (
            new Date(b.lastUpdated || 0).getTime() -
            new Date(a.lastUpdated || 0).getTime()
          );
        });

        setResumes(sortedResumes);
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
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const confirmDelete = (id: string) => {
    setResumeToDelete(id);
    setDeleteDialogOpen(true);
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
        link.download = `${resumeData.title || "resume"}.txt`;
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  const openPreview = async (id: string) => {
    try {
      const docRef = doc(db, "resumes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const resumeData = docSnap.data();
        setSelectedResume({
          id: docSnap.id,
          ...resumeData,
        });
        setPreviewOpen(true);
      }
    } catch (error) {
      console.error("Error fetching resume for preview:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <p className="text-muted-foreground mt-1">
            Manage and preview all your created resumes
          </p>
        </div>
        <Link href="/resume-builder/basic-info/">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Resume
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Resumes</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <Skeleton className="h-48 w-full rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-1" />
                      <Skeleton className="h-4 w-1/3" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Skeleton className="h-9 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No resumes found</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You haven't created any resumes yet. Create your first resume
                  to get started.
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
                  <Card
                    key={resume.id}
                    className="group overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    <CardHeader className="p-0 relative">
                      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="gap-1"
                            onClick={() => openPreview(resume.id)}
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg line-clamp-1">
                            {resume.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              {resume.lastUpdated
                                ? new Date(
                                    resume.lastUpdated
                                  ).toLocaleDateString()
                                : "No date"}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {resume.theme || "Default"}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 flex-1"
                        onClick={() => downloadResume(resume.id)}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 flex-1"
                        onClick={() =>
                          router.push(
                            `/resume-builder/basic-info/?id=${resume.id}`
                          )
                        }
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-destructive hover:text-destructive"
                        onClick={() => confirmDelete(resume.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <Skeleton className="h-48 w-full rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-1" />
                      <Skeleton className="h-4 w-1/3" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Skeleton className="h-9 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.slice(0, 6).map((resume) => (
                  <Card
                    key={resume.id}
                    className="group overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    <CardHeader className="p-0 relative">
                      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="gap-1"
                            onClick={() => openPreview(resume.id)}
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg line-clamp-1">
                            {resume.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              {resume.lastUpdated
                                ? new Date(
                                    resume.lastUpdated
                                  ).toLocaleDateString()
                                : "No date"}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {resume.theme || "Default"}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 flex-1"
                        onClick={() => downloadResume(resume.id)}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 flex-1"
                        onClick={() =>
                          router.push(
                            `/resume-builder/basic-info/?id=${resume.id}`
                          )
                        }
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-destructive hover:text-destructive"
                        onClick={() => confirmDelete(resume.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Resume Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>
              {selectedResume?.title || "Resume Preview"}
            </DialogTitle>
            <DialogDescription>
              Preview how your resume will look to employers
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[calc(90vh-100px)] p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-[800px] mx-auto">
              <div className="border-b pb-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedResume?.contact?.fullName ||
                    sampleResumeData.contact.fullName}
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>
                      {selectedResume?.contact?.email ||
                        sampleResumeData.contact.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>
                      {selectedResume?.contact?.phoneNumber ||
                        sampleResumeData.contact.phoneNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add other sections like Summary, Work Experience, Skills, etc. */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Summary
                </h2>
                <p className="text-gray-700">
                  {selectedResume?.summary || sampleResumeData.summary}
                </p>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="p-6 pt-0">
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="gap-1"
                  onClick={() =>
                    selectedResume && downloadResume(selectedResume.id)
                  }
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  className="gap-1"
                  onClick={() => {
                    setPreviewOpen(false);
                    selectedResume &&
                      router.push(
                        `/resume-builder/basic-info/?id=${selectedResume.id}`
                      );
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Edit Resume
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resume</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this resume? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => resumeToDelete && deleteResume(resumeToDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

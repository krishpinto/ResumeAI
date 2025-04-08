"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FileText, Plus, Edit, Trash2, Eye, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

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
      try {
        // Fetch resumes for the current user
        const q = query(collection(db, "resumes"));
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

  const openPreview = async (id: string) => {
    try {
      const docRef = doc(db, "resumes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const resumeData = docSnap.data();
        setSelectedResume({
          id: docSnap.id,
          title: resumeData.title || "Untitled Resume",
          name: resumeData.contact?.fullName || "No Name Provided",
          summary: resumeData.summary || "No Summary Provided",
        });
        setPreviewOpen(true);
      }
    } catch (error) {
      console.error("Error fetching resume for preview:", error);
    }
  };

  const deleteResume = async () => {
    if (!resumeToDelete) return;

    try {
      await deleteDoc(doc(db, "resumes", resumeToDelete));
      setResumes(resumes.filter((resume) => resume.id !== resumeToDelete));
      setDeleteDialogOpen(false);
      setResumeToDelete(null);
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const confirmDelete = (id: string) => {
    setResumeToDelete(id);
    setDeleteDialogOpen(true);
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

      <div className="rounded-lg shadow-sm border p-6">
        <Tabs defaultValue="all" className="w-full">
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
              <div className="text-center py-12 rounded-lg">
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
                      <div className="relative h-48 overflow-hidden">
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

      {/* Preview Dialog */}
      {previewOpen && selectedResume && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedResume.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">{selectedResume.name}</h2>
              <p className="text-sm text-muted-foreground">
                {selectedResume.summary}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this resume? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={deleteResume}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

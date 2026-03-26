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
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">My Resumes</h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage and preview all your created resumes
            </p>
          </div>
          <Link href="/resume-builder/basic-info/">
            <Button variant="outline" size="sm" className="gap-2 bg-background border-border text-foreground hover:bg-muted transition-colors h-9 px-4 rounded-md">
              <Plus className="h-4 w-4" />
              Create New Resume
            </Button>
          </Link>
        </div>

        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="overflow-hidden bg-card border-border">
                  <CardHeader className="p-0">
                    <Skeleton className="h-40 w-full rounded-none bg-muted" />
                  </CardHeader>
                  <CardContent className="p-5">
                    <Skeleton className="h-5 w-2/3 mb-3 bg-muted" />
                    <Skeleton className="h-4 w-1/3 bg-muted/80" />
                  </CardContent>
                  <CardFooter className="p-5 pt-0 gap-2 flex justify-end border-t border-border mt-2">
                    <Skeleton className="h-8 w-8 rounded-md bg-muted/80 mt-4" />
                    <Skeleton className="h-8 w-8 rounded-md bg-muted/80 mt-4" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-xl bg-card">
              <div className="h-12 w-12 rounded-full bg-muted border border-border flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-base font-medium text-foreground mb-1.5">No resumes yet</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Create your first resume to get started. It only takes a few minutes.
              </p>
              <Link href="/resume-builder/basic-info/">
                <Button variant="outline" size="sm" className="gap-2 bg-background border-border text-foreground hover:bg-muted">
                  <Plus className="h-4 w-4" />
                  Create Resume
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => {
                const titleInitial = (resume.title || "U")[0].toUpperCase();
                return (
                  <Card
                    key={resume.id}
                    className="group flex flex-col overflow-hidden bg-card border-border hover:border-muted-foreground/30 transition-all duration-300 hover:shadow-lg hover:shadow-border/50"
                  >
                    <CardHeader className="p-0 relative border-b border-border">
                      <div className="relative h-44 bg-muted/50 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                        {/* Subtle background decoration */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(150,150,150,0.05)_0%,transparent_100%)] pointer-events-none" />
                        
                        <div className="relative h-14 w-14 rounded-full bg-background border border-border flex items-center justify-center text-xl font-medium text-foreground mb-4 shadow-inner">
                          {titleInitial}
                        </div>
                        <h3 className="relative font-medium text-foreground line-clamp-1 text-sm z-10">
                          {resume.title || "Untitled Resume"}
                        </h3>
                        
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="gap-2 bg-foreground text-background hover:bg-muted-foreground border-0 font-medium"
                            onClick={() => openPreview(resume.id)}
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 flex-1">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground text-base truncate">
                            {resume.title || "Untitled"}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              {resume.lastUpdated
                                ? new Date(resume.lastUpdated).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })
                                : "No date"}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize text-[10px] px-2 py-0.5 h-auto bg-muted border-border text-muted-foreground font-medium whitespace-nowrap">
                          {resume.theme || "Default"}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-4 border-t border-border gap-2 flex justify-end bg-muted/30">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        onClick={() =>
                          router.push(`/resume-builder/basic-info/?id=${resume.id}`)
                        }
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => confirmDelete(resume.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Preview Dialog */}
        {previewOpen && selectedResume && (
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogContent className="bg-card border-border text-card-foreground shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-foreground text-xl">{selectedResume.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <h2 className="text-lg font-medium text-foreground">{selectedResume.name}</h2>
                <div className="bg-muted p-4 rounded-lg border border-border">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedResume.summary}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        {deleteDialogOpen && (
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="bg-card border-border text-card-foreground shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-foreground text-lg">Confirm Deletion</DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2">
                  Are you sure you want to delete this resume? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 sm:justify-end gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                  className="bg-transparent border-border text-foreground hover:bg-muted"
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={deleteResume} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 border-0">
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

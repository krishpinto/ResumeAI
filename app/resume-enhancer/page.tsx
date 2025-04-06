"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoogleGenAI } from "@google/genai";

export default function ResumeEnhancer() {
  const [responseText, setResponseText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("upload");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setActiveTab("preview");

    try {
      // Step 1: Extract content using GoogleGenAI
      const fileData = await file.arrayBuffer();
      const base64Data = btoa(String.fromCharCode(...new Uint8Array(fileData)));

      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY || "",
      });

      const contents = [
        {
          text: `Extract the following details from the document in a structured JSON format. Ensure all fields are included, even if they are empty:

{
  "contact": {
    "fullName": "",
    "phoneNumber": "",
    "email": "",
    "linkedIn": "",
    "github": "",
    "portfolio": ""
  },
  "summary": "",
  "workExperience": [
    {
      "title": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "achievements": ["", "", ""]
    }
  ],
  "skills": ["", "", ""],
  "education": [
    {
      "degree": "",
      "institution": "",
      "location": "",
      "startDate": "",
      "endDate": ""
    }
  ],
  "certifications": [
    {
      "name": "",
      "organization": "",
      "year": ""
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "achievements": ["", ""]
    }
  ],
  "additionalInfo": {
    "languages": ["", ""],
    "volunteerExperience": "",
    "publications": ""
  }
}
`,
        },
        {
          inlineData: {
            mimeType: file.type,
            data: base64Data,
          },
        },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: contents,
      });

      // Debugging: Log the raw response
      console.log("Raw Response:", response);

      // Step 2: Validate and sanitize the response
      let extractedContent;
      try {
        const rawText = response.text || "";
        const sanitizedText = rawText.trim().replace(/```json|```/g, "");
        extractedContent = JSON.parse(sanitizedText);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        throw new Error("Invalid JSON response from the AI model.");
      }

      // Debugging: Log the extracted content
      console.log("Extracted Content:", extractedContent);

      // Step 3: Format the extracted content into the resume template
      const formatResponse = await fetch("/api/formatResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extractedContent }),
      });

      if (!formatResponse.ok) {
        throw new Error("Failed to format resume");
      }

      const { formattedResume } = await formatResponse.json();

      // Step 4: Update the state with the formatted resume
      setResponseText(formattedResume);
    } catch (error) {
      console.error("Error processing the file:", error);
      setResponseText("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([responseText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "enhanced_resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Resume Enhancer</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Upload your existing resume and our AI will enhance it with
          professional language and formatting
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload">Upload Resume</TabsTrigger>
            <TabsTrigger value="preview" disabled={!responseText && !loading}>
              Enhanced Resume
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="w-full">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
                  <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    PDF (MAX. 5MB)
                  </p>
                  <label
                    htmlFor="file-upload"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                  >
                    Choose File
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {fileName && (
                    <p className="mt-2 text-sm">Selected: {fileName}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="w-full">
            <Card>
              <CardContent className="pt-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p>Enhancing your resume...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button className="gap-2" onClick={handleDownload}>
                        <Download className="h-4 w-4" />
                        Download Enhanced Resume
                      </Button>
                    </div>
                    <div className="bg-muted/30 p-6 rounded-lg">
                      <pre className="whitespace-pre-wrap font-sans text-sm">
                        {responseText}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

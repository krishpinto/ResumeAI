// Resume data types
export type ResumeTheme = "light" | "dark" | "vibrant";

export interface ContactInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  name: string;
  organization: string;
  year: string;
}

export interface Project {
  name: string;
  description: string;
  achievements: string[];
}

export interface AdditionalInfo {
  languages: string[];
  volunteerExperience?: string;
  publications?: string;
}

export type ResumeData = {
  id?: string; // Optional ID for Firestore document
  title: string;
  contact: {
    fullName: string;
    email: string;
    phoneNumber: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
  };
  summary: string;
  workExperience: Array<{
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  }>;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    location?: string;
    startDate: string;
    endDate: string;
  }>;
  certifications: Array<{
    name: string;
    organization?: string;
    year: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    achievements: string[];
  }>;
  additionalInfo: {
    languages: string[];
    volunteerExperience?: string;
    publications?: string;
  };
  theme: string;
  lastUpdated?: string; // Add this property to track the last updated timestamp
};

// Default resume data
export const defaultResumeData: ResumeData = {
  title: "My Professional Resume",
  contact: {
    fullName: "",
    phoneNumber: "",
    email: "",
    linkedIn: "",
    github: "",
    portfolio: "",
  },
  summary: "",
  workExperience: [
    {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      achievements: ["", "", ""],
    },
  ],
  skills: ["", "", ""],
  education: [
    {
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
    },
  ],
  certifications: [
    {
      name: "",
      organization: "",
      year: "",
    },
  ],
  projects: [
    {
      name: "",
      description: "",
      achievements: ["", ""],
    },
  ],
  additionalInfo: {
    languages: [""],
    volunteerExperience: "",
    publications: "",
  },
  theme: "light",
};

// Helper function to get resume data from localStorage
export const getResumeData = (): ResumeData => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      return JSON.parse(savedData);
    }
  }
  return defaultResumeData;
};

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { extractedContent } = body;

    // Debugging: Log the received extracted content
    console.log("Received Extracted Content:", extractedContent);

    if (!extractedContent) {
      return NextResponse.json(
        { error: "Missing extracted content" },
        { status: 400 }
      );
    }

    const structuredContent = {
      summary: extractedContent.summary || "",
      workExperience: extractedContent.workExperience || [],
      skills: extractedContent.skills || [],
      education: extractedContent.education || [],
      certifications: extractedContent.certifications || [],
      projects: extractedContent.projects || [],
      additionalInfo: extractedContent.additionalInfo || {
        languages: [],
        volunteerExperience: "",
        publications: "",
      },
      contact: extractedContent.contact || {
        fullName: "",
        phoneNumber: "",
        email: "",
        linkedIn: "",
        github: "",
        portfolio: "",
      },
    };

    // Replace placeholders in the template with the extracted content
    const formattedResume = `
${structuredContent.contact.fullName || "[Full Name]"}
${structuredContent.contact.phoneNumber || "[Phone Number]"} | ${
      structuredContent.contact.email || "[Email]"
    } | ${structuredContent.contact.linkedIn || "[LinkedIn Profile]"} | ${
      structuredContent.contact.github || "[GitHub]"
    } | ${structuredContent.contact.portfolio || "[Portfolio/Website]"}

Professional Summary
${structuredContent.summary || "[Summary not provided]"}

Work Experience
${
  structuredContent.workExperience
    ?.map(
      (job: any) => `
${job.title || "[Job Title]"} – ${job.company || "[Company Name]"}, ${
        job.location || "[Location]"
      } | ${job.startDate || "[Start Date]"} – ${job.endDate || "[End Date]"}

${job.achievements
  ?.map((achievement: string) => `- ${achievement || "[Achievement]"}`)
  .join("\n")}
`
    )
    .join("\n") || "[Work experience not provided]"
}

Skills
${structuredContent.skills?.join(" | ") || "[Skills not provided]"}

Education
${
  structuredContent.education
    ?.map(
      (edu: any) => `
${edu.degree || "[Degree]"} – ${edu.institution || "[Institution]"}, ${
        edu.location || "[Location]"
      } | ${edu.startDate || "[Start Date]"} – ${edu.endDate || "[End Date]"}
`
    )
    .join("\n") || "[Education not provided]"
}

Certifications & Training (if applicable)
${
  structuredContent.certifications
    ?.map(
      (cert: any) => `
${cert.name || "[Certification Name]"}, ${
        cert.organization || "[Issuing Organization]"
      }, ${cert.year || "[Year]"}
`
    )
    .join("\n") || "[Certifications not provided]"
}

Projects (if applicable)
${
  structuredContent.projects
    ?.map(
      (project: any) => `
${project.name || "[Project Name]"} – ${
        project.description || "[Project Description]"
      }

${project.achievements
  ?.map((achievement: string) => `- ${achievement || "[Achievement]"}`)
  .join("\n")}
`
    )
    .join("\n") || "[Projects not provided]"
}

Additional Information (if applicable)
Languages: ${
      structuredContent.additionalInfo.languages?.join(", ") ||
      "[Languages not provided]"
    }
Volunteer Experience: ${
      structuredContent.additionalInfo.volunteerExperience ||
      "[Volunteer Experience not provided]"
    }
Publications: ${
      structuredContent.additionalInfo.publications ||
      "[Publications not provided]"
    }
    `;

    // Debugging: Log the formatted resume
    console.log("Formatted Resume:", formattedResume);

    return NextResponse.json({ formattedResume });
  } catch (error) {
    console.error("Error formatting resume:", error);
    return NextResponse.json(
      { error: "Failed to format resume" },
      { status: 500 }
    );
  }
}

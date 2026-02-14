import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/genai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { extractedText } = body;

    if (!extractedText) {
      return NextResponse.json(
        { error: 'Missing extracted text from PDF' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are an expert resume parser. Extract and structure the resume information from the following text into a JSON object. 

Be thorough but only include information that is clearly present in the resume. For fields that are not found, use appropriate empty values (empty strings for text, empty arrays for lists).

Return a valid JSON object with this exact structure:
{
  "contact": {
    "fullName": "string - the person's full name",
    "email": "string - email address if found",
    "phoneNumber": "string - phone number if found",
    "linkedIn": "string - LinkedIn URL if found",
    "github": "string - GitHub URL if found",
    "portfolio": "string - portfolio/website URL if found"
  },
  "summary": "string - professional summary or objective if present",
  "workExperience": [
    {
      "title": "string - job title",
      "company": "string - company name",
      "location": "string - location if available",
      "startDate": "string - start date",
      "endDate": "string - end date or 'Present'",
      "achievements": ["string - achievement/responsibility bullet points"]
    }
  ],
  "skills": ["array of skills - parse from skills section"],
  "education": [
    {
      "degree": "string - degree type",
      "institution": "string - school/university name",
      "location": "string - location if available",
      "startDate": "string - graduation or start date",
      "endDate": "string - graduation date"
    }
  ],
  "certifications": [
    {
      "name": "string - certification name",
      "organization": "string - issuing organization",
      "year": "string - year obtained"
    }
  ],
  "projects": [
    {
      "name": "string - project name",
      "description": "string - brief project description",
      "achievements": ["string - project highlights/technologies used"]
    }
  ],
  "additionalInfo": {
    "languages": ["array of languages if listed"],
    "volunteerExperience": "string - volunteer work if listed",
    "publications": "string - publications or articles if listed"
  }
}

Resume Text:
${extractedText}

IMPORTANT: Return ONLY the JSON object, no additional text. Make sure the JSON is valid and complete.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract JSON from response (it might be wrapped in code blocks)
    let jsonString = responseText;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonString = jsonMatch[0];
    }

    const extractedData = JSON.parse(jsonString);

    // Validate the response has required structure
    if (!extractedData.contact) {
      throw new Error('Invalid response structure from Gemini');
    }

    return NextResponse.json({
      success: true,
      data: extractedData,
    });
  } catch (error) {
    console.error('Error extracting resume:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to extract resume data';
    
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
}

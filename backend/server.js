import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not defined in your .env file.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/generate-questions", async (req, res) => {
  try {
    const { topic, difficulty, subjects, additionalInfo, exam, language } = req.body;
    if (!topic || !exam) {
      return res.status(400).json({ error: "Exam and Topic are required" });
    }

    // --- Dynamically build the prompt ---
    let prompt = `
      You are a quiz generator. Your task is to generate 50 multiple-choice questions
      for a student preparing for the ${exam} exam.
      The main topic of the quiz is "${topic}".

      You must respond with only a valid JSON array of objects. Do not include any text,
      markdown formatting, or code fences before or after the array.

      Each object in the array must have the following keys: "id", "question",
      "options", "correct_answer", and "explanation". The "options" key must
      be an array of strings.
    `;

    // Add optional details to the prompt if they exist
    if (language) {
      prompt += `\nThe questions should be in ${language}.`;
    }
    if (difficulty) {
      prompt += `\nThe difficulty level for the questions should be ${difficulty}.`;
    }
    if (subjects) {
      prompt += `\nFocus specifically on the following subjects: ${subjects}.`;
    }
    if (additionalInfo) {
      prompt += `\nConsider the following additional details: ${additionalInfo}.`;
    }
    // --- End of prompt building ---

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Find and extract the JSON array from the response text
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');
    
    if (startIndex !== -1 && endIndex !== -1) {
      const jsonString = text.substring(startIndex, endIndex + 1);
      const questions = JSON.parse(jsonString);
      res.json({ questions });
    } else {
      throw new Error("Valid JSON not found in the response.");
    }

  } catch (err) {
    console.error("--- Detailed Error ---");
    console.error(err);
    console.error("--- End Detailed Error ---");
    res.status(500).json({ error: "Failed to generate questions. Check the backend console for more details." });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);
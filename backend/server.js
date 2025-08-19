import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Check for API Key
if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not defined in your .env file.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generate-questions", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    // We removed the generationConfig and will control the output via the prompt
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a quiz generator. Your task is to generate 50 multiple-choice questions
      on the topic "${topic}".

      You must respond with only a valid JSON array of objects. Do not include any text,
      markdown formatting, or code fences like \`\`\`json before or after the array.

      Each object in the array must have the following keys: "id", "question",
      "options", "correct_answer", and "explanation". The "options" key must
      be an array of strings.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // The model should now return clean JSON, but we'll parse it to be sure.
    const questions = JSON.parse(text);
    res.json({ questions });

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
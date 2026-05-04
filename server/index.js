import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/parse', async (req, res) => {
    console.log("📩 Request received. Using Gemini 2.5...");

    try {
        const { text } = req.body;
        
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash" 
        });

        const prompt = `
            Extract resume data into STRICT JSON. 
            No conversational text. No markdown.
            Format: { 
                "name": "", 
                "skills": [], 
                "experience": [], 
                "education": [] 
            }
            Text: ${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let cleanText = response.text().trim();

        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
        
        res.json(JSON.parse(cleanText));

    } catch (error) {
        console.error("❌ SERVER ERROR:", error.message);
        res.status(500).json({ error: "Gemini 2.5 Error", details: error.message });
    }
});

app.listen(3000, () => console.log('🚀 Server active on Port 3000'));
import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        const prompt = `
 You are a helpful book assistant.

 When a user provides a book title and author, give a short summary of the book in 80-100 words.

 Book: ${userMessage}
 `;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent(prompt);

        const reply = result.response.text();

        res.json({ reply });

    } catch (error) {

        console.error(error);
        res.json({ reply: "Something went wrong" });

    }

});

app.listen(process.env.PORT, () => {
    console.log("Server running on port 3000");
});
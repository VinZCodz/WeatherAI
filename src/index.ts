import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local', override: true });// Add your own .env.local

const openai=new OpenAI({
    apiKey: process.env.GOOGLE_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const response=openai.chat.completions.create({
    model: "gemini-2.0-flash-lite",
    reasoning_effort: "low",
    messages:[
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Explain to me how AI works",
        },
    ]
});

console.log(response.choices[0].message);   
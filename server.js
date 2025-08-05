// server.js

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(bodyParser.json());

// Initialize the Google Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Fast and capable model

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // Separate the system prompt and few-shot examples from the user message
    const system_prompt = messages.find(m => m.role === 'system').content;
    const few_shot_examples = messages.find(m => m.role === 'assistant').content;
    const user_message = messages.find(m => m.role === 'user').content;

    // Combine them into a single prompt for Gemini
    const fullPrompt = `${system_prompt}\n\nHere are some examples of how you should respond:\n${few_shot_examples}\n\nNow, answer this question:\nQ: ${user_message}\nA:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // Send the response back in the same format OpenAI did
    res.json({ message: { role: 'assistant', content: text } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
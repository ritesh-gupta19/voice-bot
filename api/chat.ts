
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define the shape of the message objects
interface Message {
  role: 'system' | 'assistant' | 'user';
  content: string;
}

// Initialize the Google Gemini client from environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// This is the Vercel Serverless Function handler with types
export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const messages: Message[] = req.body.messages;

    // Find the different parts of the prompt
    const system_prompt = messages.find((m) => m.role === 'system')?.content || '';
    const few_shot_examples = messages.find((m) => m.role === 'assistant')?.content || '';
    const user_message = messages.find((m) => m.role === 'user')?.content || '';

    const fullPrompt = `${system_prompt}\n\nHere are some examples of how you should respond:\n${few_shot_examples}\n\nNow, answer this question:\nQ: ${user_message}\nA:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // Send the response back in the format your frontend expects
    res.status(200).json({ message: { role: 'assistant', content: text } });

  } catch (err) {
    console.error(err); // This will log the actual error on the Vercel dashboard

    // Type-safe error handling
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
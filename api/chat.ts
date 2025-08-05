
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Use 'module.exports' instead of 'export default'
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body;

    const system_prompt = messages.find((m) => m.role === 'system')?.content || '';
    const few_shot_examples = messages.find((m) => m.role === 'assistant')?.content || '';
    const user_message = messages.find((m) => m.role === 'user')?.content || '';

    const fullPrompt = `${system_prompt}\n\nHere are some examples of how you should respond:\n${few_shot_examples}\n\nNow, answer this question:\nQ: ${user_message}\nA:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ message: { role: 'assistant', content: text } });

  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
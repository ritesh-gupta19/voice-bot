import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end();
  const { messages } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });
    return res.status(200).json({ message: completion.choices[0].message });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

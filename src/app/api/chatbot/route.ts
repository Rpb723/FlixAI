import { NextResponse } from 'next/server';
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

export async function POST(req: Request) {
  const { userMessage } = await req.json();  // Extract user input from the request

  try {
    // Call OpenAI API to get AI's response
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            { role: 'system', content: 'Please only respond with movie recommendations or movie-related information based on input if title, genre, release year, etc. and when referencing a movie always forever use this structure with "Title: movieName, Year: givenYear, Genre: givenGenre, then any additional properties after if any"' },  // System instruction to limit to movie content
            { role: 'user', content: userMessage },  // User message to send to the AI
        ],
      });
    const aiResponse = completion.choices[0]?.message?.content?.trim();  
    return NextResponse.json({ message: aiResponse }); // Send AI response back to frontend
  } catch (error) {
    return NextResponse.json({ error: 'Error with AI request' }, { status: 500 });
  }
}

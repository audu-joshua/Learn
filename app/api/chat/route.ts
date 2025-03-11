import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Get the last user message
    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()

    if (!lastUserMessage) {
      return NextResponse.json({ message: "Hello! How can I help you with your studies today?" })
    }

    // System prompt to restrict the AI to academic topics
    const systemPrompt = `
      You are an academic assistant for students preparing for exams in Nigeria.
      You can ONLY answer questions related to academic subjects, exam preparation, 
      study techniques, and educational content.
      
      If a student asks about non-academic topics, politely redirect them to ask about 
      their studies, homework, or exam preparation.
      
      Focus on these subjects:
      - Mathematics
      - English Language
      - Sciences (Physics, Chemistry, Biology)
      - Social Studies
      - History
      - Geography
      - Literature
      - Computer Science
      
      Keep your answers concise, accurate, and appropriate for primary and secondary school students.
      
      If asked about sensitive topics, politics, entertainment, or anything not related to education,
      respond with: "I'm here to help with your academic questions. Let's focus on your studies!"
    `

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: lastUserMessage.content,
      system: systemPrompt,
      maxTokens: 500,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}


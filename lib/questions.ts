import { supabase } from "@/lib/supabase"
import type { Question, Answer } from "@/lib/supabase-schema"

// Fetch questions by subject, topic, and exam type
export async function getQuestions({
  subjectId,
  topicId,
  examTypeId,
  limit = 10,
  difficulty,
}: {
  subjectId?: string
  topicId?: string
  examTypeId?: string
  limit?: number
  difficulty?: "easy" | "medium" | "hard"
}) {
  let query = supabase.from("questions").select(`
      *,
      answers(*),
      subjects:subject_id(name),
      topics:topic_id(name),
      exam_types:exam_type_id(name)
    `)

  if (subjectId) {
    query = query.eq("subject_id", subjectId)
  }

  if (topicId) {
    query = query.eq("topic_id", topicId)
  }

  if (examTypeId) {
    query = query.eq("exam_type_id", examTypeId)
  }

  if (difficulty) {
    query = query.eq("difficulty", difficulty)
  }

  const { data, error } = await query.limit(limit)

  if (error) {
    console.error("Error fetching questions:", error)
    throw error
  }

  return data
}

// Get a single question with its answers
export async function getQuestion(questionId: string) {
  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      answers(*),
      subjects:subject_id(name),
      topics:topic_id(name),
      exam_types:exam_type_id(name)
    `)
    .eq("id", questionId)
    .single()

  if (error) {
    console.error("Error fetching question:", error)
    throw error
  }

  return data
}

// Create a new question with answers
export async function createQuestion(
  question: Omit<Question, "id" | "created_at">,
  answers: Omit<Answer, "id" | "question_id" | "created_at">[],
) {
  // Start a transaction
  const { data: questionData, error: questionError } = await supabase
    .from("questions")
    .insert(question)
    .select()
    .single()

  if (questionError) {
    console.error("Error creating question:", questionError)
    throw questionError
  }

  // Add answers with the question_id
  const answersWithQuestionId = answers.map((answer) => ({
    ...answer,
    question_id: questionData.id,
  }))

  const { error: answersError } = await supabase.from("answers").insert(answersWithQuestionId)

  if (answersError) {
    console.error("Error creating answers:", answersError)
    // In a real app, you might want to delete the question if answers fail
    throw answersError
  }

  return questionData
}

// Submit a user's answer to a question
export async function submitAnswer(
  userId: string,
  questionId: string,
  answerId: string | null,
  textResponse: string | null,
  quizSessionId?: string,
) {
  // First, determine if the answer is correct
  let isCorrect = false

  if (answerId) {
    // For multiple choice questions
    const { data: answer } = await supabase.from("answers").select("is_correct").eq("id", answerId).single()

    isCorrect = answer?.is_correct || false
  } else if (textResponse) {
    // For essay questions, you might want to implement some auto-grading logic
    // or mark it for manual review
    isCorrect = false // Default to false for manual review
  }

  // Record the user's response
  const { data, error } = await supabase
    .from("user_responses")
    .insert({
      user_id: userId,
      question_id: questionId,
      answer_id: answerId,
      text_response: textResponse,
      is_correct: isCorrect,
      quiz_session_id: quizSessionId,
    })
    .select()
    .single()

  if (error) {
    console.error("Error submitting answer:", error)
    throw error
  }

  // If this is part of a quiz session, update the score
  if (quizSessionId && isCorrect) {
    await supabase
      .from("quiz_sessions")
      .update({ score: supabase.rpc("increment", { x: 1 }) })
      .eq("id", quizSessionId)
  }

  return data
}

// Start a new quiz session
export async function startQuizSession(
  userId: string,
  examTypeId: string,
  subjectId?: string,
  topicId?: string,
  totalQuestions = 10,
) {
  const { data, error } = await supabase
    .from("quiz_sessions")
    .insert({
      user_id: userId,
      exam_type_id: examTypeId,
      subject_id: subjectId,
      topic_id: topicId,
      total_questions: totalQuestions,
      score: 0,
      completed: false,
    })
    .select()
    .single()

  if (error) {
    console.error("Error starting quiz session:", error)
    throw error
  }

  return data
}

// Complete a quiz session
export async function completeQuizSession(quizSessionId: string) {
  const { data, error } = await supabase
    .from("quiz_sessions")
    .update({
      completed: true,
      completed_at: new Date().toISOString(),
    })
    .eq("id", quizSessionId)
    .select()
    .single()

  if (error) {
    console.error("Error completing quiz session:", error)
    throw error
  }

  return data
}

// Get user's quiz history
export async function getUserQuizHistory(userId: string) {
  const { data, error } = await supabase
    .from("quiz_sessions")
    .select(`
      *,
      exam_types:exam_type_id(name),
      subjects:subject_id(name),
      topics:topic_id(name)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching quiz history:", error)
    throw error
  }

  return data
}

// Get subjects
export async function getSubjects() {
  const { data, error } = await supabase.from("subjects").select("*").order("name")

  if (error) {
    console.error("Error fetching subjects:", error)
    throw error
  }

  return data
}

// Get topics by subject
export async function getTopics(subjectId?: string) {
  let query = supabase.from("topics").select("*").order("name")

  if (subjectId) {
    query = query.eq("subject_id", subjectId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching topics:", error)
    throw error
  }

  return data
}

// Get exam types
export async function getExamTypes() {
  const { data, error } = await supabase.from("exam_types").select("*").order("name")

  if (error) {
    console.error("Error fetching exam types:", error)
    throw error
  }

  return data
}


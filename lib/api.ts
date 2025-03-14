import { supabase } from "./supabase"
import type { School } from "./supabase-schema"

// Subjects
export async function getSubjects() {
  const { data, error } = await supabase.from("subjects").select("*").order("name")

  return { data, error }
}

export async function getSubjectById(id: string) {
  const { data, error } = await supabase.from("subjects").select("*, topics(*)").eq("id", id).single()

  return { data, error }
}

// Topics
export async function getTopicsBySubject(subjectId: string) {
  const { data, error } = await supabase.from("topics").select("*").eq("subject_id", subjectId).order("order")

  return { data, error }
}

export async function getTopicById(id: string) {
  const { data, error } = await supabase
    .from("topics")
    .select("*, subject:subjects(*), lessons(*)")
    .eq("id", id)
    .single()

  return { data, error }
}

// Lessons
export async function getLessonsByTopic(topicId: string) {
  const { data, error } = await supabase.from("lessons").select("*").eq("topic_id", topicId).order("order")

  return { data, error }
}

export async function getLessonById(id: string) {
  const { data, error } = await supabase.from("lessons").select("*, topic:topics(*)").eq("id", id).single()

  return { data, error }
}

// Questions
export async function getQuestionsByTopic(topicId: string) {
  const { data, error } = await supabase.from("questions").select("*, answers(*)").eq("topic_id", topicId)

  return { data, error }
}

export async function getQuestionById(id: string) {
  const { data, error } = await supabase.from("questions").select("*, answers(*)").eq("id", id).single()

  return { data, error }
}

// Quizzes
export async function getPublicQuizzes() {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*, subject:subjects(*), topic:topics(*), exam_type:exam_types(*)")
    .eq("is_public", true)
    .order("created_at", { ascending: false })

  return { data, error }
}

export async function getQuizById(id: string) {
  const { data, error } = await supabase
    .from("quizzes")
    .select(
      "*, subject:subjects(*), topic:topics(*), exam_type:exam_types(*), quiz_questions(*, question:questions(*, answers(*)))",
    )
    .eq("id", id)
    .single()

  return { data, error }
}

export async function getQuizzesBySchool(schoolId: string) {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*, subject:subjects(*), topic:topics(*), exam_type:exam_types(*)")
    .eq("school_id", schoolId)
    .order("created_at", { ascending: false })

  return { data, error }
}

// Quiz Sessions
export async function createQuizSession(quizId: string, userId: string) {
  const { data, error } = await supabase
    .from("quiz_sessions")
    .insert([
      {
        quiz_id: quizId,
        user_id: userId,
        started_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  return { data, error }
}

export async function getQuizSessionById(id: string) {
  const { data, error } = await supabase
    .from("quiz_sessions")
    .select("*, quiz:quizzes(*), user_responses(*, question:questions(*, answers(*)))")
    .eq("id", id)
    .single()

  return { data, error }
}

export async function submitQuizAnswer(
  sessionId: string,
  questionId: string,
  answerId?: string,
  textResponse?: string,
) {
  const { data, error } = await supabase
    .from("user_responses")
    .insert([
      {
        quiz_session_id: sessionId,
        question_id: questionId,
        answer_id: answerId,
        text_response: textResponse,
      },
    ])
    .select()

  return { data, error }
}

export async function completeQuizSession(sessionId: string, score: number, percentage: number, passed: boolean) {
  const { data, error } = await supabase
    .from("quiz_sessions")
    .update({
      completed_at: new Date().toISOString(),
      score,
      percentage,
      passed,
    })
    .eq("id", sessionId)
    .select()
    .single()

  return { data, error }
}

// Exam Types
export async function getExamTypes() {
  const { data, error } = await supabase.from("exam_types").select("*").order("name")

  return { data, error }
}

// Schools
export async function getSchoolById(id: string) {
  const { data, error } = await supabase.from("schools").select("*").eq("id", id).single()

  return { data, error }
}

export async function createSchool(school: Partial<School>) {
  const { data, error } = await supabase.from("schools").insert([school]).select().single()

  return { data, error }
}

export async function updateSchool(id: string, updates: Partial<School>) {
  const { data, error } = await supabase.from("schools").update(updates).eq("id", id).select().single()

  return { data, error }
}

// User Quiz History
export async function getUserQuizHistory(userId: string) {
  const { data, error } = await supabase
    .from("quiz_sessions")
    .select("*, quiz:quizzes(*, subject:subjects(*), topic:topics(*), exam_type:exam_types(*))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return { data, error }
}


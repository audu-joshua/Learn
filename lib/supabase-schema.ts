// This file defines the types for your Supabase database schema

export type Question = {
    id: string
    content: string
    explanation?: string
    difficulty: "easy" | "medium" | "hard"
    question_type: "multiple_choice" | "true_false" | "essay" | "fill_blank"
    subject_id: string
    topic_id: string
    exam_type_id: string
    created_at: string
    created_by: string
    image_url?: string
  }
  
  export type Answer = {
    id: string
    question_id: string
    content: string
    is_correct: boolean
    created_at: string
  }
  
  export type Profile = {
    id: string
    username: string
    full_name: string
    avatar_url: string | null
    school: string | null
    grade: string | null
    exam_type: string | null
    created_at: string
  }
  
  export type Subject = {
    id: string
    name: string
    description?: string
    icon?: string
    created_at: string
  }
  
  export type Topic = {
    id: string
    subject_id: string
    name: string
    description?: string
    created_at: string
  }
  
  export type ExamType = {
    id: string
    name: string
    description?: string
    created_at: string
  }
  
  export type QuizSession = {
    id: string
    user_id: string
    exam_type_id: string
    subject_id?: string
    topic_id?: string
    score: number
    total_questions: number
    completed: boolean
    created_at: string
    completed_at?: string
  }
  
  export type UserResponse = {
    id: string
    user_id: string
    question_id: string
    answer_id?: string
    text_response?: string
    is_correct: boolean
    quiz_session_id?: string
    created_at: string
  }
  
  
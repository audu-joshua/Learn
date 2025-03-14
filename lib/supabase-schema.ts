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

// Enhanced schema to support school-student relationships

export type School = {
  id: string
  name: string
  address: string
  logo_url?: string
  contact_email: string
  contact_phone?: string
  subscription_status: "trial" | "active" | "inactive"
  subscription_tier: "basic" | "standard" | "premium"
  created_at: string
}

export type Class = {
  id: string
  school_id: string
  name: string // e.g., "Primary 4A", "JSS 2B"
  academic_year: string // e.g., "2023/2024"
  teacher_id?: string // Class teacher
  created_at: string
}

export type SchoolStudent = {
  id: string
  user_id: string // References auth.users
  school_id: string
  class_id: string
  admission_number: string
  status: "active" | "graduated" | "transferred" | "suspended"
  joined_at: string
}

export type Teacher = {
  id: string
  user_id: string // References auth.users
  school_id: string
  subjects: string[] // Array of subject IDs
  is_admin: boolean // Whether teacher has admin privileges
  created_at: string
}

export type SchoolExam = {
  id: string
  school_id: string
  title: string
  description?: string
  subject_id: string
  class_ids: string[] // Array of class IDs this exam is for
  start_time: string
  end_time: string
  duration_minutes: number
  is_published: boolean
  created_by: string // user_id of creator
  created_at: string
}

export type ExamQuestion = {
  id: string
  exam_id: string
  question_id: string
  order: number
  marks: number
  created_at: string
}

export type StudentResult = {
  id: string
  student_id: string // user_id
  exam_id: string
  school_id: string
  class_id: string
  total_score: number
  max_score: number
  percentage: number
  grade: string // A, B, C, etc.
  teacher_comment?: string
  created_at: string
}

export type ResultDetail = {
  id: string
  result_id: string
  question_id: string
  answer_id?: string
  text_response?: string
  score: number
  max_score: number
  is_correct: boolean
  created_at: string
}


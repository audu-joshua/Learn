// User and Authentication Types
export type UserRole = "student" | "school_admin" | "teacher" | "parent" | "admin"

export interface User {
  photoURL: null
  displayName: string | undefined
  uid: string
  id: string
  email: string | undefined
  created_at: string
  last_sign_in_at?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

export interface Profile {
  id: string
  user_id: string
  full_name: string
  avatar_url?: string
  role: UserRole
  email: string
  phone?: string
  bio?: string
  school_id?: string
  class_level?: string
  created_at: string
  updated_at: string
}

export interface School {
  id: string
  name: string
  logo_url?: string
  address: string
  city: string
  state: string
  country: string
  phone: string
  email: string
  website?: string
  admin_id: string
  created_at: string
  updated_at: string
}

// Educational Content Types
export interface Subject {
  id: string
  name: string
  description?: string
  icon_url?: string
  created_at: string
  updated_at: string
}

export interface Topic {
  id: string
  subject_id: string
  name: string
  description?: string
  order: number
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  topic_id: string
  title: string
  content: string
  video_url?: string
  duration_minutes: number
  order: number
  created_at: string
  updated_at: string
}

// Exam and Quiz Types
export interface ExamType {
  id: string
  name: string
  description?: string
  icon_url?: string
  created_at: string
  updated_at: string
}

export interface Question {
  id: string
  topic_id: string
  exam_type_id?: string
  question_text: string
  question_type: "multiple_choice" | "true_false" | "fill_blank" | "essay"
  difficulty: "easy" | "medium" | "hard"
  explanation?: string
  created_at: string
  updated_at: string
}

export interface Answer {
  id: string
  question_id: string
  answer_text: string
  is_correct: boolean
  created_at: string
  updated_at: string
}

export interface Quiz {
  id: string
  title: string
  description?: string
  subject_id?: string
  topic_id?: string
  exam_type_id?: string
  duration_minutes: number
  passing_percentage: number
  is_public: boolean
  school_id?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question_id: string
  order: number
  points: number
  created_at: string
  updated_at: string
}

export interface QuizSession {
  id: string
  quiz_id: string
  user_id: string
  started_at: string
  completed_at?: string
  score?: number
  percentage?: number
  passed?: boolean
  created_at: string
  updated_at: string
}

export interface UserResponse {
  id: string
  quiz_session_id: string
  question_id: string
  answer_id?: string
  text_response?: string
  is_correct?: boolean
  points_awarded?: number
  created_at: string
  updated_at: string
}

// Notification Types
export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  is_read: boolean
  link?: string
  created_at: string
  updated_at: string
}

// Payment and Subscription Types
export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  duration_days: number
  features: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UserSubscription {
  id: string
  user_id: string
  plan_id: string
  started_at: string
  expires_at: string
  is_active: boolean
  payment_id?: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  subscription_id?: string
  amount: number
  currency: string
  payment_method: string
  status: "pending" | "completed" | "failed" | "refunded"
  transaction_id?: string
  created_at: string
  updated_at: string
}


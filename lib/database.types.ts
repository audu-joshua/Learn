export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export  interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          avatar_url: string | null
          role: string
          email: string
          phone: string | null
          bio: string | null
          school_id: string | null
          class_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          avatar_url?: string | null
          role: string
          email: string
          phone?: string | null
          bio?: string | null
          school_id?: string | null
          class_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          avatar_url?: string | null
          role?: string
          email?: string
          phone?: string | null
          bio?: string | null
          school_id?: string | null
          class_level?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      schools: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          address: string
          city: string
          state: string
          country: string
          phone: string
          email: string
          website: string | null
          admin_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          address: string
          city: string
          state: string
          country: string
          phone: string
          email: string
          website?: string | null
          admin_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          address?: string
          city?: string
          state?: string
          country?: string
          phone?: string
          email?: string
          website?: string | null
          admin_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          name: string
          description: string | null
          icon_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      topics: {
        Row: {
          id: string
          subject_id: string
          name: string
          description: string | null
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          subject_id: string
          name: string
          description?: string | null
          order: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          subject_id?: string
          name?: string
          description?: string | null
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          topic_id: string
          title: string
          content: string
          video_url: string | null
          duration_minutes: number
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          topic_id: string
          title: string
          content: string
          video_url?: string | null
          duration_minutes: number
          order: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          topic_id?: string
          title?: string
          content?: string
          video_url?: string | null
          duration_minutes?: number
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      exam_types: {
        Row: {
          id: string
          name: string
          description: string | null
          icon_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          topic_id: string
          exam_type_id: string | null
          question_text: string
          question_type: string
          difficulty: string
          explanation: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          topic_id: string
          exam_type_id?: string | null
          question_text: string
          question_type: string
          difficulty: string
          explanation?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          topic_id?: string
          exam_type_id?: string | null
          question_text?: string
          question_type?: string
          difficulty?: string
          explanation?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      answers: {
        Row: {
          id: string
          question_id: string
          answer_text: string
          is_correct: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question_id: string
          answer_text: string
          is_correct: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question_id?: string
          answer_text?: string
          is_correct?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      quizzes: {
        Row: {
          id: string
          title: string
          description: string | null
          subject_id: string | null
          topic_id: string | null
          exam_type_id: string | null
          duration_minutes: number
          passing_percentage: number
          is_public: boolean
          school_id: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          subject_id?: string | null
          topic_id?: string | null
          exam_type_id?: string | null
          duration_minutes: number
          passing_percentage: number
          is_public: boolean
          school_id?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          subject_id?: string | null
          topic_id?: string | null
          exam_type_id?: string | null
          duration_minutes?: number
          passing_percentage?: number
          is_public?: boolean
          school_id?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      quiz_questions: {
        Row: {
          id: string
          quiz_id: string
          question_id: string
          order: number
          points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          quiz_id: string
          question_id: string
          order: number
          points: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          quiz_id?: string
          question_id?: string
          order?: number
          points?: number
          created_at?: string
          updated_at?: string
        }
      }
      quiz_sessions: {
        Row: {
          id: string
          quiz_id: string
          user_id: string
          started_at: string
          completed_at: string | null
          score: number | null
          percentage: number | null
          passed: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          quiz_id: string
          user_id: string
          started_at: string
          completed_at?: string | null
          score?: number | null
          percentage?: number | null
          passed?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          quiz_id?: string
          user_id?: string
          started_at?: string
          completed_at?: string | null
          score?: number | null
          percentage?: number | null
          passed?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      user_responses: {
        Row: {
          id: string
          quiz_session_id: string
          question_id: string
          answer_id: string | null
          text_response: string | null
          is_correct: boolean | null
          points_awarded: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          quiz_session_id: string
          question_id: string
          answer_id?: string | null
          text_response?: string | null
          is_correct?: boolean | null
          points_awarded?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          quiz_session_id?: string
          question_id?: string
          answer_id?: string | null
          text_response?: string | null
          is_correct?: boolean | null
          points_awarded?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          link: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          link?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          link?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscription_plans: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          duration_days: number
          features: string[]
          is_active: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          duration_days?: number
          features?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          started_at: string
          expires_at: string
          is_active: boolean
          payment_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          started_at: string
          expires_at: string
          is_active: boolean
          payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          started_at?: string
          expires_at?: string
          is_active?: boolean
          payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          subscription_id: string | null
          amount: number
          currency: string
          payment_method: string
          status: string
          transaction_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subscription_id?: string | null
          amount: number
          currency: string
          payment_method: string
          status: string
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subscription_id?: string | null
          amount?: number
          currency?: string
          payment_method?: string
          status?: string
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}


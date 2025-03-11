import { createClient } from "@supabase/supabase-js"

// Check if environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing. Please check your .env.local file.")
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "")

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


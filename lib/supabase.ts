import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"
import { Profile } from "./types"

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Helper functions for auth
export async function signUp(email: string, password: string, metadata: { full_name: string; role: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  return { data, error }
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })

  return { data, error }
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  })

  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Profile management
export async function getProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  return { data, error }
}

export async function createProfile(profile: Partial<Profile>) {
  const { data, error } = await supabase.from("profiles").insert([profile]).select()

  return { data, error }
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select()

  return { data, error }
}

export async function uploadAvatar(userId: string, file: File) {
  // Create a unique file name
  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
  const filePath = `avatars/${fileName}`

  // Upload the file
  const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true })

  if (uploadError) {
    return { error: uploadError }
  }

  // Get the public URL
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)

  // Update the user profile with the new avatar URL
  const { data: profile, error: updateError } = await updateProfile(userId, {
    avatar_url: data.publicUrl,
  })

  if (updateError) {
    return { error: updateError }
  }

  return { data: { avatar_url: data.publicUrl }, error: null }
}

// Export types
export type { Profile }


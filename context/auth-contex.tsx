"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import type { Profile } from "../lib/types"

// Extend the User type to include missing properties
interface User {
  id: string
  email?: string
  photoURL?: string
  displayName?: string
  uid?: string
}

// Define the state type
interface AuthState {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  error: string | null
}

// Define the action types
type AuthAction =
  | { type: "AUTH_LOADING" }
  | { type: "AUTH_SUCCESS"; payload: { user: User; profile: Profile | null } }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "PROFILE_UPDATED"; payload: Profile }

// Initial state
const initialState: AuthState = {
  user: null,
  profile: null,
  isLoading: true,
  error: null,
}

// Create the reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_LOADING":
      return { ...state, isLoading: true, error: null }
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        profile: action.payload.profile,
        isLoading: false,
        error: null,
      }
    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        profile: null,
        isLoading: false,
        error: action.payload,
      }
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        profile: null,
        isLoading: false,
        error: null,
      }
    case "PROFILE_UPDATED":
      return {
        ...state,
        profile: action.payload,
      }
    default:
      return state
  }
}

// Create the context
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ error: any | null }>
  loginWithGoogle: () => Promise<{ error: any | null }>
  signup: (email: string, password: string, fullName: string, role: string) => Promise<{ error: any | null }>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any | null }>
  updateUserPassword: (password: string) => Promise<{ error: any | null }>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create the provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Initialize auth state
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        if (session?.user) {
          dispatch({ type: "AUTH_LOADING" })
          try {
            // Get user profile
            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();
  
            if (profileError && profileError.code !== "PGRST116") {
              console.error("Error fetching profile:", profileError);
            }
  
            dispatch({
              type: "AUTH_SUCCESS",
              payload: { user: { ...session.user, uid: session.user.id }, profile: profile || null },
            });

            if (profileError && profileError.code !== "PGRST116") {
              console.error("Error fetching profile:", profileError)
            }

            dispatch({
              type: "AUTH_SUCCESS",
              payload: { user: session.user, profile: profile || null },
            })
          } catch (error) {
            console.error("Error in auth state change:", error)
            dispatch({ type: "AUTH_ERROR", payload: "Failed to get user data" })
          }
        }
      } else if (event === "SIGNED_OUT") {
        dispatch({ type: "AUTH_LOGOUT" })
      }
    })

    // Initial session check
    const checkSession = async () => {
      dispatch({ type: "AUTH_LOADING" })
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          // Get user profile
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (profileError && profileError.code !== "PGRST116") {
            console.error("Error fetching profile:", profileError)
          }

          dispatch({
            type: "AUTH_SUCCESS",
            payload: { user: session.user, profile: profile || null },
          })
        } else {
          dispatch({ type: "AUTH_LOGOUT" })
        }
      } catch (error) {
        console.error("Error checking session:", error)
        dispatch({ type: "AUTH_ERROR", payload: "Failed to check authentication session" })
      }
    }

    checkSession()

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Auth methods
  const login = async (email: string, password: string) => {
    dispatch({ type: "AUTH_LOADING" })
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        dispatch({ type: "AUTH_ERROR", payload: error.message })
        return { error }
      }

      // Profile will be loaded by the auth state change listener
      return { error: null }
    } catch (error: any) {
      dispatch({ type: "AUTH_ERROR", payload: error.message })
      return { error }
    }
  }

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        return { error }
      }

      return { error: null }
    } catch (error: any) {
      return { error }
    }
  }

  const signup = async (email: string, password: string, fullName: string, role: string) => {
    dispatch({ type: "AUTH_LOADING" })
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        dispatch({ type: "AUTH_ERROR", payload: error.message })
        return { error }
      }

      // Create profile
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            user_id: data.user.id,
            full_name: fullName,
            email,
            role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])

        if (profileError) {
          console.error("Error creating profile:", profileError)
          return { error: profileError }
        }
      }

      return { error: null }
    } catch (error: any) {
      dispatch({ type: "AUTH_ERROR", payload: error.message })
      return { error }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    dispatch({ type: "AUTH_LOGOUT" })
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      return { error }
    } catch (error: any) {
      return { error }
    }
  }

  const updateUserPassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      return { error }
    } catch (error: any) {
      return { error }
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!state.user) {
      return { error: new Error("User not authenticated") }
    }

    try {
      const { data, error } = await supabase.from("profiles").update(updates).eq("id", state.user.id).select().single()

      if (error) {
        return { error }
      }

      dispatch({ type: "PROFILE_UPDATED", payload: data })
      return { error: null }
    } catch (error: any) {
      return { error }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithGoogle,
        signup,
        logout,
        resetPassword,
        updateUserPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


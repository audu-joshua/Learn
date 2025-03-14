import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import type {Database} from "../../../lib/database.types"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Check if the user has a profile
    if (user) {
      const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      // If no profile exists, create one
      if (error && error.code === "PGRST116") {
        const { data: userData } = await supabase.auth.getUser()

        if (userData.user) {
          const userMetadata = userData.user.user_metadata

          await supabase.from("profiles").insert([
            {
              id: user.id,
              user_id: user.id,
              full_name: userMetadata?.full_name || userData.user.email?.split("@")[0] || "User",
              email: userData.user.email || "",
              role: userMetadata?.role || "student",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}


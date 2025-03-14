import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the request is for a protected route
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/settings") ||
    req.nextUrl.pathname.startsWith("/school-portal") ||
    req.nextUrl.pathname.startsWith("/admin")

  // Check if the request is for an auth route
  const isAuthRoute =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup") ||
    req.nextUrl.pathname.startsWith("/forgot-password")

  // If the user is not authenticated and trying to access a protected route
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is authenticated and trying to access an auth route
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Check for role-based access
  if (session && isProtectedRoute) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    // School portal access check
    if (
      req.nextUrl.pathname.startsWith("/school-portal") &&
      profile?.role !== "school_admin" &&
      profile?.role !== "teacher"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Admin access check
    if (req.nextUrl.pathname.startsWith("/admin") && profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api (API routes that don't need auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/public).*)",
  ],
}


import { NextRequest, NextResponse } from "next/server"
import { getSession, COOKIE_NAME } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  const url = new URL(req.url)
  const isAdminPath = url.pathname.startsWith("/admin") && !url.pathname.startsWith("/admin/login")
  if (!isAdminPath) return NextResponse.next()

  const token = req.cookies.get(COOKIE_NAME)?.value
  const session = await getSession(token)
  if (!session) return NextResponse.redirect(new URL("/admin/login", req.url))
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}



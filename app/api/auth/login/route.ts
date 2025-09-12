import { NextRequest, NextResponse } from "next/server"
import { createSession, verifyUser, COOKIE_NAME } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
    const user = await verifyUser(email, password)
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    const token = await createSession(user)
    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 60 * 60 * 24 })
    return res
  } catch (e) {
    console.error("Login error:", e)
    return NextResponse.json({ error: "Server error", details: e instanceof Error ? e.message : "Unknown error" }, { status: 500 })
  }
}



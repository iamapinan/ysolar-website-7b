import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { COOKIE_NAME, getSession } from "@/lib/auth"
import { createTeamMember } from "@/services/content.service"

export async function POST(req: NextRequest) {
  const token = cookies().get(COOKIE_NAME)?.value
  const session = await getSession(token)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const id = await createTeamMember(body)
  return NextResponse.json({ id })
}



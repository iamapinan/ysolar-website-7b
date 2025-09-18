import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { COOKIE_NAME, getSession } from "@/lib/auth"
import { deleteTeamMember, getTeamMemberById, updateTeamMember } from "@/services/content.service"

async function auth() {
  const token = cookies().get(COOKIE_NAME)?.value
  const session = await getSession(token)
  if (!session) return null
  return session
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const item = await getTeamMemberById(Number(params.id))
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const ok = await updateTeamMember(Number(params.id), body)
  return NextResponse.json({ ok })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const ok = await deleteTeamMember(Number(params.id))
  return NextResponse.json({ ok })
}



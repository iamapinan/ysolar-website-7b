import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
export const runtime = 'nodejs'
import { COOKIE_NAME, getSession } from "@/lib/auth"
import { deleteService, getServiceById, updateService } from "@/services/content.service"

async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const session = await getSession(token)
  if (!session) return null
  return session
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const item = await getServiceById(Number(id))
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  await updateService(Number(id), body)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const ok = await deleteService(Number(id))
  return NextResponse.json({ ok })
}



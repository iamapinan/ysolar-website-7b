import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
export const runtime = 'nodejs'
import { COOKIE_NAME, getSession } from "@/lib/auth"
import { deleteArticle, getArticleById, updateArticle } from "@/services/content.service"

async function auth() {
  const token = cookies().get(COOKIE_NAME)?.value
  const session = await getSession(token)
  if (!session) return null
  return session
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const item = await getArticleById(Number(params.id))
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  await updateArticle(Number(params.id), body)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const ok = await deleteArticle(Number(params.id))
  return NextResponse.json({ ok })
}



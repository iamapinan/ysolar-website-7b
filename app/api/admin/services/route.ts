import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { COOKIE_NAME, getSession } from "@/lib/auth"
import { createService } from "@/services/content.service"

export async function POST(req: NextRequest) {
  const token = cookies().get(COOKIE_NAME)?.value
  const session = await getSession(token)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const id = await createService({
      slug: body.slug,
      title: body.title,
      summary: body.summary,
      content: body.content,
      category: body.category,
      is_published: !!body.is_published,
    })
    return NextResponse.json({ id })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}



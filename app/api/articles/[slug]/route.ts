import { NextRequest, NextResponse } from "next/server"
import { getArticleBySlug } from "@/services/content.service"

export const runtime = 'nodejs'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const article = await getArticleBySlug(slug)
    
    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(article)
  } catch (error: any) {
    console.error("Error fetching article:", error)
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    )
  }
}

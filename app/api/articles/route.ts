import { NextRequest, NextResponse } from "next/server"
import { 
  getPublishedArticles, 
  getPublishedArticlesCount, 
  getArticleCategoriesCount 
} from "@/services/content.service"

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category") || undefined
    const search = searchParams.get("search") || undefined
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    // Get articles and count in parallel
    const [articles, totalCount, categoriesCount] = await Promise.all([
      getPublishedArticles(category, search, limit, offset),
      getPublishedArticlesCount(category, search),
      getArticleCategoriesCount()
    ])

    // Format categories count for easy access
    const categoriesMap = categoriesCount.reduce((acc, item) => {
      acc[item.category] = item.count
      return acc
    }, {} as Record<string, number>)

    // Add total count for "all" category
    const totalArticles = await getPublishedArticlesCount()
    categoriesMap.all = totalArticles

    return NextResponse.json({
      articles,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      },
      categories: categoriesMap
    })
  } catch (error: any) {
    console.error("Error fetching articles:", error)
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    )
  }
}

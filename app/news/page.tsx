"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, User, Search, ArrowRight, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface Article {
  id: number
  slug: string
  title: string
  summary: string
  category: string
  published_at: string
  created_at: string
}

interface CategoryCount {
  [key: string]: number
}

export default function NewsPage() {
  const { language } = useLanguage()
  const t = (translations as any)[language]
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [articles, setArticles] = useState<Article[]>([])
  const [categoriesCount, setCategoriesCount] = useState<CategoryCount>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  const categories = [
    { id: "all", name: t.news?.allArticles || "All Articles", count: categoriesCount.all || 0 },
    { id: "news", name: t.news?.news || "News", count: categoriesCount.news || 0 },
    { id: "knowledge", name: t.news?.knowledge || "Knowledge", count: categoriesCount.knowledge || 0 },
    { id: "tips", name: t.news?.tips || "Tips", count: categoriesCount.tips || 0 },
    { id: "csr", name: t.news?.csr || "CSR", count: categoriesCount.csr || 0 },
  ]

  // Fetch articles from API
  const fetchArticles = async (category: string, search: string, page: number = 1, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (category && category !== "all") params.append("category", category)
      if (search) params.append("search", search)
      params.append("page", page.toString())
      params.append("limit", "20")
      
      const response = await fetch(`/api/articles?${params}`)
      if (!response.ok) throw new Error("Failed to fetch articles")
      
      const data = await response.json()
      
      if (append) {
        setArticles(prev => [...prev, ...data.articles])
      } else {
        setArticles(data.articles)
      }
      
      setCategoriesCount(data.categories)
      setCurrentPage(data.pagination.page)
      setTotalPages(data.pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch articles")
      console.error("Error fetching articles:", err)
    } finally {
      setLoading(false)
    }
  }

  // Load articles when component mounts or filters change
  useEffect(() => {
    fetchArticles(selectedCategory, searchQuery, 1)
  }, [selectedCategory, searchQuery])

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchArticles(selectedCategory, searchQuery, 1)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Separate featured and regular articles (first 2 are featured)
  const featuredArticles = articles.slice(0, 2)
  const regularArticles = articles.slice(2)

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "news":
        return "default"
      case "knowledge":
        return "secondary"
      case "tips":
        return "outline"
      case "csr":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getCategoryName = (category: string) => {
    const cat = categories.find((c) => c.id === category)
    return cat ? cat.name : category
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">{t.news?.title || "News & Knowledge"}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.news?.subtitle || "Stay updated with the latest in solar energy, EV charging, and sustainable technology"}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder={t.news?.searchPlaceholder || "Search articles..."}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.news?.categories || "Categories"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={category.id === selectedCategory ? "default" : "ghost"}
                    className="w-full justify-between bg-transparent"
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <span>{category.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.news?.stayUpdated || "Stay Updated"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t.news?.newsletterText || "Subscribe to our newsletter for the latest updates on clean energy."}
                </p>
                <div className="space-y-2">
                  <Input placeholder={t.news?.emailPlaceholder || "Your email address"} type="email" />
                  <Button className="w-full bg-primary hover:bg-primary/90">{t.news?.subscribe || "Subscribe"}</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">{t.common.loading}</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={() => fetchArticles(selectedCategory, searchQuery, currentPage)}>
                  {language === "th" ? "ลองใหม่" : "Try Again"}
                </Button>
              </div>
            )}

            {/* Featured Articles */}
            {!loading && !error && featuredArticles.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.news?.featuredArticles || "Featured Articles"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src="/placeholder.svg"
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant={getCategoryBadgeColor(article.category)}>
                          {getCategoryName(article.category)}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {article.summary}
                      </p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                        asChild
                      >
                        <Link href={`/news/${article.slug}`}>
                          {t.common.readMore}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                </div>
              </section>
            )}

            {/* Recent Articles */}
            {!loading && !error && regularArticles.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.news?.recentArticles || "Recent Articles"}</h2>
                <div className="space-y-6">
                  {regularArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative">
                          <img
                            src="/placeholder.svg"
                            alt={article.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge variant={getCategoryBadgeColor(article.category)}>
                              {getCategoryName(article.category)}
                            </Badge>
                          </div>
                        </div>
                        <div className="md:col-span-2 p-6 space-y-4">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                              <Link href={`/news/${article.slug}`}>
                                {article.title}
                              </Link>
                            </h3>
                          </div>

                          <p className="text-muted-foreground line-clamp-2">
                            {article.summary}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/news/${article.slug}`}>
                                {t.common.readMore}
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* No Results */}
            {!loading && !error && articles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {language === "th" ? "ไม่พบบทความที่ค้นหา" : "No articles found"}
                </p>
              </div>
            )}

            {/* Load More */}
            {!loading && !error && articles.length > 0 && currentPage < totalPages && (
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => fetchArticles(selectedCategory, searchQuery, currentPage + 1, true)}
                >
                  {t.news?.loadMore || "Load More Articles"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

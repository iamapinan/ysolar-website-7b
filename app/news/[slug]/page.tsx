import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getArticleBySlug, getPublishedArticles } from "@/services/content.service"
import ShareButtons from "@/components/share-buttons"

// Fetch article from database
async function getArticle(slug: string) {
  try {
    const article = await getArticleBySlug(slug)
    if (!article) {
      return null
    }
    
    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      content: article.content || "",
      category: article.category,
      publishedAt: article.published_at || article.created_at,
      authorName: "Y Solar Team",
      readTime: "5 min read",
      tags: article.category ? [article.category] : [],
      featuredImage: article.featured_image || null,
    }
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  // Handle case where article is not found
  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/news">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
        </Button>
      </div>
    )
  }

  // Get related articles from the same category
  const relatedArticlesData = await getPublishedArticles(article.category, "", 3, 0).catch(() => [])
  const relatedArticles = relatedArticlesData
    .filter(a => a.slug !== article.slug)
    .slice(0, 2)
    .map(a => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      category: a.category,
    }))

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

  return (
    <div className="flex flex-col">
      {/* Article Header */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
          </Button>

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Badge variant={getCategoryBadgeColor(article.category)} className="capitalize">
                {article.category}
              </Badge>
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">{article.title}</h1>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{article.authorName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <ShareButtons title={article.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image - Optional */}
      {article.featuredImage && (
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div
                className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Social Share */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Share this article</h3>
                <ShareButtons title={article.title} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Author Info */}
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{article.authorName}</h3>
                    <p className="text-sm text-muted-foreground">Clean Energy Expert</p>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground">
                    Get the latest articles about clean energy delivered to your inbox.
                  </p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 border border-border rounded-md text-sm"
                    />
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.length > 0 ? (
              relatedArticles.map((related) => (
                <Card key={related.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Article Image</p>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <Badge variant={getCategoryBadgeColor(related.category)} className="capitalize">
                      {related.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      <Link href={`/news/${related.slug}`}>{related.title}</Link>
                    </h3>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/news/${related.slug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No related articles found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to Go Solar?</h2>
          <p className="text-xl opacity-90">Contact our experts today for a free consultation and customized quote.</p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 border-2 border-white shadow-lg"
          >
            Get Free Quote
          </Button>
        </div>
      </section>
    </div>
  )
}

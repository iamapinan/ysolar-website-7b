import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, User, Search, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

export default function NewsPage() {
  const categories = [
    { id: "all", name: "All Articles", nameEn: "All Articles", count: 24 },
    { id: "news", name: "ข่าวสาร", nameEn: "News", count: 8 },
    { id: "knowledge", name: "ความรู้", nameEn: "Knowledge", count: 10 },
    { id: "tips", name: "เทคนิค", nameEn: "Tips", count: 4 },
    { id: "csr", name: "CSR", nameEn: "CSR", count: 2 },
  ]

  const featuredArticles = [
    {
      id: 1,
      title: "Benefits of Solar Energy for Your Home",
      titleTh: "ประโยชน์ของพลังงานแสงอาทิตย์สำหรับบ้านคุณ",
      slug: "benefits-solar-energy-home",
      excerpt: "Discover how solar energy can reduce your electricity bills and help the environment",
      excerptTh: "ค้นพบว่าพลังงานแสงอาทิตย์สามารถลดค่าไฟฟ้าและช่วยสิ่งแวดล้อมได้อย่างไร",
      category: "knowledge",
      featuredImage: "/solar-benefits-article.png",
      publishedAt: "2024-01-10T10:00:00Z",
      authorName: "Y Solar Team",
      readTime: "5 min read",
      isFeatured: true,
    },
    {
      id: 2,
      title: "EV Charging at Home: Complete Guide",
      titleTh: "การชาร์จรถยนต์ไฟฟ้าที่บ้าน: คู่มือฉบับสมบูรณ์",
      slug: "ev-charging-home-guide",
      excerpt: "Everything you need to know about installing EV chargers at your home",
      excerptTh: "ทุกสิ่งที่คุณต้องรู้เกี่ยวกับการติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้าที่บ้าน",
      category: "tips",
      featuredImage: "/ev-charging-guide.png",
      publishedAt: "2024-01-15T14:30:00Z",
      authorName: "Y Solar Team",
      readTime: "8 min read",
      isFeatured: true,
    },
  ]

  const articles = [
    {
      id: 3,
      title: "Thailand's Solar Energy Growth in 2024",
      titleTh: "การเติบโตของพลังงานแสงอาทิตย์ในประเทศไทยปี 2024",
      slug: "thailand-solar-growth-2024",
      excerpt: "Latest statistics and trends in Thailand's renewable energy sector",
      excerptTh: "สถิติและแนวโน้มล่าสุดในภาคพลังงานหมุนเวียนของประเทศไทย",
      category: "news",
      featuredImage: "/thailand-solar-news.png",
      publishedAt: "2024-01-20T09:00:00Z",
      authorName: "Y Solar Team",
      readTime: "6 min read",
      isFeatured: false,
    },
    {
      id: 4,
      title: "How to Maintain Your Solar Panels",
      titleTh: "วิธีการดูแลรักษาแผงโซลาร์เซลล์",
      slug: "maintain-solar-panels",
      excerpt: "Essential maintenance tips to keep your solar system running efficiently",
      excerptTh: "เคล็ดลับการบำรุงรักษาที่จำเป็นเพื่อให้ระบบโซลาร์ทำงานอย่างมีประสิทธิภาพ",
      category: "tips",
      featuredImage: "/solar-maintenance-tips.png",
      publishedAt: "2024-01-18T11:30:00Z",
      authorName: "Y Solar Team",
      readTime: "4 min read",
      isFeatured: false,
    },
    {
      id: 5,
      title: "Y Solar Community Solar Project",
      titleTh: "โครงการโซลาร์ชุมชนของ Y Solar",
      slug: "community-solar-project",
      excerpt: "Our commitment to bringing clean energy to rural communities",
      excerptTh: "ความมุ่งมั่นของเราในการนำพลังงานสะอาดสู่ชุมชนชนบท",
      category: "csr",
      featuredImage: "/community-solar-csr.png",
      publishedAt: "2024-01-12T16:00:00Z",
      authorName: "Y Solar Team",
      readTime: "7 min read",
      isFeatured: false,
    },
    {
      id: 6,
      title: "Understanding Solar Panel Efficiency",
      titleTh: "ทำความเข้าใจประสิทธิภาพของแผงโซลาร์เซลล์",
      slug: "solar-panel-efficiency",
      excerpt: "Learn about different types of solar panels and their efficiency ratings",
      excerptTh: "เรียนรู้เกี่ยวกับแผงโซลาร์เซลล์ประเภทต่างๆ และการจัดอันดับประสิทธิภาพ",
      category: "knowledge",
      featuredImage: "/solar-efficiency-knowledge.png",
      publishedAt: "2024-01-08T13:15:00Z",
      authorName: "Y Solar Team",
      readTime: "6 min read",
      isFeatured: false,
    },
  ]

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
    return cat ? cat.nameEn : category
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">News & Knowledge</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest in solar energy, EV charging, and sustainable technology
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
              <Input placeholder="Search articles..." className="pl-10" />
            </div>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={category.id === "all" ? "default" : "ghost"}
                    className="w-full justify-between bg-transparent"
                    asChild
                  >
                    <Link href={`/news?category=${category.id}`}>
                      <span>{category.nameEn}</span>
                      <Badge variant="outline" className="ml-2">
                        {category.count}
                      </Badge>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Subscribe to our newsletter for the latest updates on clean energy.
                </p>
                <div className="space-y-2">
                  <Input placeholder="Your email address" type="email" />
                  <Button className="w-full bg-primary hover:bg-primary/90">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Articles */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={article.featuredImage || "/placeholder.svg"}
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
                        <p className="text-sm text-muted-foreground mt-1">{article.titleTh}</p>
                      </div>

                      <p className="text-muted-foreground text-sm line-clamp-3">{article.excerpt}</p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{article.authorName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                        asChild
                      >
                        <Link href={`/news/${article.slug}`}>
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Articles */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Recent Articles</h2>
              <div className="space-y-6">
                {articles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="relative">
                        <img
                          src={article.featuredImage || "/placeholder.svg"}
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
                            <Link href={`/news/${article.slug}`}>{article.title}</Link>
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{article.titleTh}</p>
                        </div>

                        <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{article.authorName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/news/${article.slug}`}>
                              Read More
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

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

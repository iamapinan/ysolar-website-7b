import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, MessageCircle } from "lucide-react"
import Link from "next/link"

// This would normally come from your database based on the slug
async function getArticle(slug: string) {
  // Mock data - in real app, fetch from database
  return {
    id: 1,
    title: "Benefits of Solar Energy for Your Home",
    titleTh: "ประโยชน์ของพลังงานแสงอาทิตย์สำหรับบ้านคุณ",
    slug: "benefits-solar-energy-home",
    excerpt: "Discover how solar energy can reduce your electricity bills and help the environment",
    excerptTh: "ค้นพบว่าพลังงานแสงอาทิตย์สามารถลดค่าไฟฟ้าและช่วยสิ่งแวดล้อมได้อย่างไร",
    content: `
      <p>Solar energy is becoming increasingly popular as homeowners look for ways to reduce their electricity bills and environmental impact. In this comprehensive guide, we'll explore the numerous benefits of installing solar panels on your home.</p>
      
      <h2>Financial Benefits</h2>
      <p>One of the most compelling reasons to switch to solar energy is the significant cost savings. Here's how solar panels can benefit your wallet:</p>
      
      <ul>
        <li><strong>Reduced Electricity Bills:</strong> Solar panels can reduce your monthly electricity bills by 50-90%, depending on your system size and energy consumption.</li>
        <li><strong>Return on Investment:</strong> Most residential solar systems pay for themselves within 6-10 years through energy savings.</li>
        <li><strong>Increased Property Value:</strong> Homes with solar panels typically sell for 4% more than comparable homes without solar.</li>
        <li><strong>Government Incentives:</strong> Take advantage of tax credits and rebates available for solar installations.</li>
      </ul>
      
      <h2>Environmental Impact</h2>
      <p>Solar energy is one of the cleanest forms of energy available. By switching to solar, you're making a positive impact on the environment:</p>
      
      <ul>
        <li><strong>Reduced Carbon Footprint:</strong> A typical residential solar system eliminates 3-4 tons of carbon emissions annually.</li>
        <li><strong>Clean Energy Source:</strong> Solar panels produce electricity without any harmful emissions or pollutants.</li>
        <li><strong>Renewable Resource:</strong> Unlike fossil fuels, solar energy is abundant and will never run out.</li>
      </ul>
      
      <h2>Energy Independence</h2>
      <p>Solar panels provide you with greater control over your energy supply:</p>
      
      <ul>
        <li><strong>Reduced Grid Dependence:</strong> Generate your own electricity and rely less on the utility grid.</li>
        <li><strong>Protection from Rate Increases:</strong> Lock in your energy costs and protect yourself from rising electricity rates.</li>
        <li><strong>Battery Storage Options:</strong> Combine solar with battery storage for complete energy independence.</li>
      </ul>
      
      <h2>Low Maintenance</h2>
      <p>Solar panels are designed to last and require minimal maintenance:</p>
      
      <ul>
        <li><strong>25-Year Warranty:</strong> Most solar panels come with a 25-year performance warranty.</li>
        <li><strong>Minimal Upkeep:</strong> Occasional cleaning and annual inspections are typically all that's needed.</li>
        <li><strong>Durable Design:</strong> Solar panels are built to withstand harsh weather conditions.</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Ready to make the switch to solar? Here's what you need to know:</p>
      
      <ol>
        <li><strong>Energy Assessment:</strong> Evaluate your current energy usage and roof suitability.</li>
        <li><strong>System Design:</strong> Work with professionals to design a system that meets your needs.</li>
        <li><strong>Installation:</strong> Professional installation typically takes 1-3 days.</li>
        <li><strong>Monitoring:</strong> Track your system's performance and energy savings.</li>
      </ol>
      
      <p>Solar energy offers numerous benefits for homeowners, from significant cost savings to environmental protection. If you're considering making the switch to solar, now is an excellent time to explore your options.</p>
    `,
    contentTh: `
      <p>พลังงานแสงอาทิตย์กำลังได้รับความนิยมมากขึ้นเมื่อเจ้าของบ้านมองหาวิธีลดค่าไฟฟ้าและผลกระทบต่อสิ่งแวดล้อม ในคู่มือฉบับสมบูรณ์นี้ เราจะสำรวจประโยชน์มากมายของการติดตั้งแผงโซลาร์เซลล์ที่บ้านของคุณ</p>
      
      <h2>ประโยชน์ทางการเงิน</h2>
      <p>หนึ่งในเหตุผลที่น่าสนใจที่สุดในการเปลี่ยนมาใช้พลังงานแสงอาทิตย์คือการประหยัดค่าใช้จ่ายอย่างมีนัยสำคัญ นี่คือวิธีที่แผงโซลาร์เซลล์สามารถเป็นประโยชน์ต่อกระเป๋าเงินของคุณ:</p>
      
      <ul>
        <li><strong>ลดค่าไฟฟ้า:</strong> แผงโซลาร์เซลล์สามารถลดค่าไฟฟ้ารายเดือนของคุณได้ 50-90% ขึ้นอยู่กับขนาดระบบและการใช้พลังงาน</li>
        <li><strong>ผลตอบแทนจากการลงทุน:</strong> ระบบโซลาร์เซลล์ในบ้านส่วนใหญ่จะคืนทุนภายใน 6-10 ปีผ่านการประหยัดพลังงาน</li>
        <li><strong>เพิ่มมูลค่าอสังหาริมทรัพย์:</strong> บ้านที่มีแผงโซลาร์เซลล์มักจะขายได้ราคาสูงกว่าบ้านที่ไม่มีโซลาร์เซลล์ 4%</li>
        <li><strong>สิทธิประโยชน์จากรัฐบาล:</strong> ใช้ประโยชน์จากเครดิตภาษีและส่วนลดที่มีให้สำหรับการติดตั้งโซลาร์เซลล์</li>
      </ul>
    `,
    category: "knowledge",
    featuredImage: "/solar-benefits-article.png",
    publishedAt: "2024-01-10T10:00:00Z",
    authorName: "Y Solar Team",
    readTime: "5 min read",
    tags: ["solar energy", "home improvement", "cost savings", "environment"],
    metaTitle: "Benefits of Solar Energy for Your Home - Y Solar",
    metaDescription:
      "Discover how solar energy can reduce your electricity bills and help the environment. Complete guide to solar benefits for homeowners.",
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

  const relatedArticles = [
    {
      id: 2,
      title: "EV Charging at Home: Complete Guide",
      slug: "ev-charging-home-guide",
      featuredImage: "/ev-charging-guide.png",
      category: "tips",
    },
    {
      id: 3,
      title: "How to Maintain Your Solar Panels",
      slug: "maintain-solar-panels",
      featuredImage: "/solar-maintenance-tips.png",
      category: "tips",
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

  return (
    <div className="flex flex-col">
      {/* Article Header */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <p className="text-xl text-muted-foreground">{article.titleTh}</p>
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

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src={article.featuredImage || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    LINE
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
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
            {relatedArticles.map((related) => (
              <Card key={related.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <img
                  src={related.featuredImage || "/placeholder.svg"}
                  alt={related.title}
                  className="w-full h-48 object-cover"
                />
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to Go Solar?</h2>
          <p className="text-xl opacity-90">Contact our experts today for a free consultation and customized quote.</p>
          <Button size="lg" variant="secondary">
            Get Free Quote
          </Button>
        </div>
      </section>
    </div>
  )
}

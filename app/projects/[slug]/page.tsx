import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  MapPin, 
  Zap, 
  TrendingUp, 
  ArrowLeft, 
  ArrowRight,
  Building,
  Clock,
  DollarSign,
  Lightbulb,
  Leaf,
  Users
} from "lucide-react"
import { getProjectBySlug, getPublishedProjects } from "@/services/content.service"
import Link from "next/link"
import Image from "next/image"

interface ProjectDetailPageProps {
  params: { slug: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "ไม่พบโปรเจค | Y Solar",
      description: "ไม่พบโปรเจคที่คุณกำลังมองหา"
    }
  }

  return {
    title: `${project.title} | Y Solar Projects`,
    description: project.description || `โปรเจค ${project.title} ของ Y Solar${project.location ? ` ที่ ${project.location}` : ''}${project.capacity_kw ? ` กำลังการผลิต ${project.capacity_kw}kW` : ''}`,
    keywords: [
      'solar energy',
      'โซลาร์เซลล์',
      'พลังงานแสงอาทิตย์',
      'solar rooftop',
      project.location,
      project.client_name,
      'Y Solar',
      'renewable energy'
    ].filter(Boolean),
    openGraph: {
      title: project.title,
      description: project.description || `โปรเจค ${project.title} ของ Y Solar`,
      images: project.featured_image ? [project.featured_image] : [],
      type: 'article'
    }
  }
}

// Disable static generation for now to avoid build-time database issues
export const dynamic = 'force-dynamic'

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // ดึงโปรเจคอื่นๆ สำหรับแนะนำ
  const relatedProjects = await getPublishedProjects(4)
  const filteredRelatedProjects = relatedProjects.filter(p => p.slug !== slug)

  // คำนวณข้อมูลเพิ่มเติม
  const projectAge = project.created_at 
    ? Math.floor((new Date().getTime() - new Date(project.created_at).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const benefits = [
    {
      icon: Zap,
      title: "กำลังการผลิต",
      titleEn: "Power Generation",
      value: project.capacity_kw ? `${project.capacity_kw} kW` : "N/A",
      description: "ความสามารถในการผลิตไฟฟ้า"
    },
    {
      icon: Leaf,
      title: "ลดการปล่อยคาร์บอน",
      titleEn: "Carbon Reduction",
      value: project.capacity_kw ? `${(project.capacity_kw * 1.2).toFixed(1)} ตัน/ปี` : "N/A",
      description: "ประมาณการลดการปล่อย CO₂ ต่อปี"
    },
    {
      icon: DollarSign,
      title: "ประหยัดค่าไฟ",
      titleEn: "Energy Savings",
      value: project.capacity_kw ? `${(project.capacity_kw * 4.5 * 30 * 4.5).toLocaleString()} บาท/ปี` : "N/A",
      description: "ประมาณการประหยัดค่าไฟฟ้าต่อปี"
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link href="/projects" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                กลับไปหน้าโปรเจค
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="default" className="bg-primary/10 text-primary">
                    โปรเจค #{project.id}
                  </Badge>
                  {project.capacity_kw && (
                    <Badge variant="outline" className="font-semibold">
                      {project.capacity_kw}kW
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    {projectAge < 30 ? "โปรเจคใหม่" : "โปรเจคที่ดำเนินการแล้ว"}
                  </Badge>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {project.title}
                </h1>
                
                {project.client_name && (
                  <p className="text-xl text-muted-foreground font-medium flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    {project.client_name}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-6 text-muted-foreground">
                {project.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium">{project.location}</span>
                  </div>
                )}
                {project.created_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      {new Date(project.created_at).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>

              {project.description && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  ปรึกษาโปรเจคคล้ายกัน
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  ขอใบเสนอราคา
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={project.featured_image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {project.capacity_kw && (
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                    {project.capacity_kw}kW
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">ผลประโยชน์ของโปรเจค</h2>
            <h3 className="text-2xl lg:text-3xl font-bold text-muted-foreground">Project Benefits</h3>
            <p className="text-xl text-muted-foreground">ข้อมูลและผลตอบแทนที่คาดหวังได้จากโปรเจคนี้</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30">
                <CardContent className="p-0 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.titleEn}</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">{benefit.value}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      {project.description && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">รายละเอียดโปรเจค</h2>
              <h3 className="text-2xl lg:text-3xl font-bold text-muted-foreground">Project Details</h3>
            </div>

            <Card className="p-8 lg:p-12 bg-background/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-0 space-y-8">
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  {project.description.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-foreground">ข้อมูลโปรเจค</h4>
                    <div className="space-y-3">
                      {project.client_name && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ลูกค้า:</span>
                          <span className="font-medium">{project.client_name}</span>
                        </div>
                      )}
                      {project.location && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ที่ตั้ง:</span>
                          <span className="font-medium">{project.location}</span>
                        </div>
                      )}
                      {project.capacity_kw && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">กำลังการผลิต:</span>
                          <span className="font-medium">{project.capacity_kw} kW</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-foreground">ผลตอบแทน</h4>
                    <div className="space-y-3">
                      {project.capacity_kw && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ผลิตไฟต่อวัน:</span>
                            <span className="font-medium">{(project.capacity_kw * 4.5).toFixed(1)} kWh</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ประหยัดต่อเดือน:</span>
                            <span className="font-medium text-green-600">
                              {(project.capacity_kw * 4.5 * 30 * 4.5).toLocaleString()} บาท
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Related Projects Section */}
      {filteredRelatedProjects.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">โปรเจคอื่นๆ</h2>
              <h3 className="text-2xl lg:text-3xl font-bold text-muted-foreground">Other Projects</h3>
              <p className="text-xl text-muted-foreground">ดูโปรเจคอื่นๆ ที่น่าสนใจ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRelatedProjects.slice(0, 3).map((relatedProject) => (
                <Link key={relatedProject.id} href={`/projects/${relatedProject.slug}`}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer py-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={relatedProject.featured_image || "/placeholder.svg"}
                        alt={relatedProject.title}
                        width={400}
                        height={280}
                        className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {relatedProject.capacity_kw && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-bold">
                          {relatedProject.capacity_kw}kW
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relatedProject.title}
                        </h3>
                        {relatedProject.client_name && (
                          <p className="text-sm text-muted-foreground font-medium">
                            {relatedProject.client_name}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        {relatedProject.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-medium">{relatedProject.location}</span>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                      >
                        ดูรายละเอียด
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/projects" className="flex items-center gap-2">
                  ดูโปรเจคทั้งหมด
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

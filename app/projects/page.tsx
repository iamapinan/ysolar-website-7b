import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Zap, TrendingUp, ArrowRight, Search } from "lucide-react"
import { getAllProjects } from "@/services/content.service"
import { Suspense } from "react"
import Link from "next/link"
import ProjectsSearchForm from "@/components/projects-search-form"
import ProjectsPagination from "@/components/projects-pagination"

interface SearchParams {
  page?: string
  search?: string
  location?: string
}

interface ProjectsPageProps {
  searchParams: SearchParams
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || "1")
  const search = params.search || ""
  const location = params.location || ""
  
  // ดึงข้อมูลโปรเจคจากฐานข้อมูล
  const projectsDb = await getAllProjects(page, 12, search).catch(() => ({ data: [], total: 0, page: 1, limit: 12 }))
  
  // คำนวณ pagination
  const totalPages = Math.ceil(projectsDb.total / projectsDb.limit)
  
  // กรองตาม location ถ้ามี
  const filteredProjects = location 
    ? projectsDb.data.filter((project: any) => 
        project.location?.toLowerCase().includes(location.toLowerCase())
      )
    : projectsDb.data

  // สร้าง unique locations สำหรับ filter
  const uniqueLocations = Array.from(new Set(
    projectsDb.data
      .filter((project: any) => project.location)
      .map((project: any) => project.location)
  )) as string[]

  // คำนวณสถิติจากข้อมูลจริง
  const totalCapacity = projectsDb.data.reduce((sum: number, project: any) => 
    sum + (project.capacity_kw || 0), 0
  )
  
  const stats = [
    { 
      label: "Projects Completed", 
      labelTh: "โปรเจคที่สำเร็จ",
      value: `${projectsDb.total}+`, 
      icon: TrendingUp 
    },
    { 
      label: "Total Capacity Installed", 
      labelTh: "กำลังติดตั้งรวม",
      value: totalCapacity > 1000 ? `${(totalCapacity/1000).toFixed(1)}MW` : `${totalCapacity}kW`, 
      icon: Zap 
    },
    { 
      label: "Active Locations", 
      labelTh: "พื้นที่ให้บริการ",
      value: `${uniqueLocations.length}+`, 
      icon: MapPin 
    },
    { 
      label: "Customer Satisfaction", 
      labelTh: "ความพึงพอใจลูกค้า",
      value: "98%", 
      icon: TrendingUp 
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Projects
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold text-muted-foreground mb-6">
            โปรเจคของเรา
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our successful clean energy installations and the real impact we've made for our customers
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ค้นพบการติดตั้งพลังงานสะอาดที่ประสบความสำเร็จและผลกระทบที่แท้จริงที่เราสร้างให้กับลูกค้า
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsSearchForm uniqueLocations={uniqueLocations} />
          <div className="mt-4 text-center">
            <div className="text-sm text-muted-foreground">
              พบ {filteredProjects.length} โปรเจค จากทั้งหมด {projectsDb.total} โปรเจค
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mx-auto">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.labelTh}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects from Database */}
      {filteredProjects.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Featured Projects</h2>
              <h3 className="text-2xl lg:text-3xl font-bold text-muted-foreground">โปรเจคเด่น</h3>
              <p className="text-xl text-muted-foreground">Real results from real customers</p>
              <p className="text-lg text-muted-foreground">ผลงานจริงจากลูกค้าจริง</p>
            </div>

            <div className="space-y-12">
              {filteredProjects.slice(0, 3).map((project: any, index: number) => (
                <Card key={project.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                    {/* Content */}
                    <div className={`p-8 lg:p-12 space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                            โปรเจค #{project.id}
                          </Badge>
                          {project.capacity_kw && (
                            <Badge variant="outline" className="font-semibold">
                              {project.capacity_kw}kW
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        {project.client_name && (
                          <p className="text-lg text-muted-foreground font-medium">
                            {project.client_name}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
                                month: 'long'
                              })}
                            </span>
                          </div>
                        )}
                      </div>

                      {project.description && (
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {project.description}
                        </p>
                      )}

                      {project.roi_months && (
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                          <div className="text-3xl font-bold text-primary mb-2">
                            {project.roi_months} เดือน
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ระยะเวลาคืนทุน / Payback Period
                          </div>
                        </div>
                      )}

                      <Button 
                        asChild
                        size="lg" 
                        className="w-full sm:w-auto group/btn"
                        variant="default"
                      >
                        <Link href={`/projects/${project.slug}`}>
                          ดูรายละเอียดเพิ่มเติม
                          <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>

                    {/* Image */}
                    <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""} group/image`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                      <img
                        src={project.featured_image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover min-h-[400px] lg:min-h-[500px] group-hover/image:scale-105 transition-transform duration-500"
                      />
                      {project.capacity_kw && (
                        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full font-bold text-lg z-20">
                          {project.capacity_kw}kW
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">All Projects</h2>
            <h3 className="text-2xl lg:text-3xl font-bold text-muted-foreground">โปรเจคทั้งหมด</h3>
            <p className="text-xl text-muted-foreground">Browse our complete portfolio</p>
            <p className="text-lg text-muted-foreground">เรียกดูผลงานทั้งหมดของเรา</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project: any) => (
                <Card key={project.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm border-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.featured_image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="secondary" className="bg-white/90 text-foreground backdrop-blur-sm">
                        โปรเจค #{project.id}
                      </Badge>
                    </div>
                    
                    {project.capacity_kw && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-bold z-10">
                        {project.capacity_kw}kW
                      </div>
                    )}

                    {project.roi_months && (
                      <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        คืนทุน {project.roi_months} เดือน
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      {project.client_name && (
                        <p className="text-sm text-muted-foreground font-medium">
                          {project.client_name}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      {project.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium">{project.location}</span>
                        </div>
                      )}
                      {project.created_at && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(project.created_at).toLocaleDateString('th-TH')}
                        </span>
                      )}
                    </div>

                    {project.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    )}

                    <div className="pt-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                      >
                        <Link href={`/projects/${project.slug}`}>
                          ดูรายละเอียด
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">ไม่พบโปรเจค</h3>
                  <p className="text-muted-foreground">ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองของคุณ</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {filteredProjects.length > 0 && (
            <ProjectsPagination
              currentPage={page}
              totalPages={totalPages}
              total={projectsDb.total}
              limit={projectsDb.limit}
            />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Start Your Project?</h2>
            <h3 className="text-2xl lg:text-3xl font-bold opacity-90">พร้อมเริ่มโปรเจคของคุณแล้วหรือยัง?</h3>
          </div>
          <div className="space-y-2">
            <p className="text-xl opacity-90">Join our satisfied customers and start your clean energy journey today.</p>
            <p className="text-lg opacity-80">เข้าร่วมกับลูกค้าที่พึงพอใจของเราและเริ่มต้นการเดินทางพลังงานสะอาดของคุณวันนี้</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-all">
              รับใบเสนอราคาฟรี
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent shadow-lg hover:shadow-xl transition-all"
            >
              นัดหมายปรึกษา
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="pt-8 text-sm opacity-70">
            <p>ติดต่อเราได้ตลอด 24 ชั่วโมง | สำรวจหน้างานฟรี | รับประกันคุณภาพ</p>
          </div>
        </div>
      </section>
    </div>
  )
}

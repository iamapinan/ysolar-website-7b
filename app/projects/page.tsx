import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Zap, TrendingUp, ArrowRight } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Residential Solar Installation",
      titleTh: "ติดตั้งโซลาร์บ้านพักอาศัย",
      client: "Private Residence",
      location: "Bangkok",
      locationTh: "กรุงเทพมหานคร",
      type: "Solar Rooftop",
      capacity: "10kW",
      completionDate: "January 2024",
      costSavings: 30,
      description:
        "Complete 10kW solar rooftop system installation for a residential home, resulting in 30% reduction in electricity costs.",
      descriptionTh: "ติดตั้งระบบโซลาร์รูฟท็อป 10kW สำหรับบ้านพักอาศัย ลดค่าไฟฟ้าได้ 30%",
      image: "/residential-solar-project.png",
      beforeImage: "/residential-before.png",
      afterImage: "/residential-after.png",
      featured: true,
      results: [
        "30% reduction in electricity bills",
        "12kWh daily energy production",
        "4.2 tons CO2 saved annually",
        "8-year payback period",
      ],
    },
    {
      id: 2,
      title: "Commercial EV Charging Station",
      titleTh: "สถานีชาร์จรถยนต์ไฟฟ้าเชิงพาณิชย์",
      client: "Office Complex",
      location: "Chonburi",
      locationTh: "ชลบุรี",
      type: "EV Charger",
      capacity: "4 Charging Ports",
      completionDate: "February 2024",
      costSavings: null,
      description: "Installation of 4-port Level 2 EV charging station for office building with smart load management.",
      descriptionTh: "ติดตั้งสถานีชาร์จรถยนต์ไฟฟ้า Level 2 จำนวน 4 จุดสำหรับอาคารสำนักงาน พร้อมระบบจัดการโหลดอัจฉริยะ",
      image: "/commercial-ev-project.png",
      beforeImage: "/commercial-before.png",
      afterImage: "/commercial-after.png",
      featured: true,
      results: [
        "4 simultaneous charging ports",
        "Smart load balancing system",
        "Mobile app integration",
        "Weather-resistant design",
      ],
    },
    {
      id: 3,
      title: "Industrial Solar Farm",
      titleTh: "โซลาร์ฟาร์มอุตสาหกรรม",
      client: "Manufacturing Plant",
      location: "Rayong",
      locationTh: "ระยอง",
      type: "Solar Rooftop",
      capacity: "500kW",
      completionDate: "March 2024",
      costSavings: 45,
      description:
        "Large-scale 500kW solar installation for manufacturing facility, achieving 45% reduction in energy costs.",
      descriptionTh: "ติดตั้งระบบโซลาร์ขนาดใหญ่ 500kW สำหรับโรงงานผลิต ลดต้นทุนพลังงานได้ 45%",
      image: "/industrial-solar-project.png",
      beforeImage: "/industrial-before.png",
      afterImage: "/industrial-after.png",
      featured: true,
      results: [
        "45% reduction in energy costs",
        "2,100kWh daily production",
        "180 tons CO2 saved annually",
        "6-year payback period",
      ],
    },
    {
      id: 4,
      title: "Hybrid Solar + EV System",
      titleTh: "ระบบโซลาร์ + EV แบบผสม",
      client: "Eco Resort",
      location: "Phuket",
      locationTh: "ภูเก็ต",
      type: "Solar + EV",
      capacity: "25kW + 2 Ports",
      completionDate: "April 2024",
      costSavings: 35,
      description: "Integrated solar rooftop and EV charging solution for eco-friendly resort operations.",
      descriptionTh: "โซลูชันโซลาร์รูฟท็อปและการชาร์จรถยนต์ไฟฟ้าแบบบูรณาการสำหรับรีสอร์ทเป็นมิตรกับสิ่งแวดล้อม",
      image: "/hybrid-project.png",
      beforeImage: "/resort-before.png",
      afterImage: "/resort-after.png",
      featured: false,
      results: [
        "35% energy cost reduction",
        "100% renewable EV charging",
        "Enhanced eco-tourism appeal",
        "Grid independence capability",
      ],
    },
  ]

  const stats = [
    { label: "Projects Completed", value: "150+", icon: TrendingUp },
    { label: "Total Capacity Installed", value: "2.5MW", icon: Zap },
    { label: "CO2 Reduction", value: "1,200 tons", icon: TrendingUp },
    { label: "Customer Satisfaction", value: "98%", icon: TrendingUp },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Our Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our successful clean energy installations and the real impact we've made for our customers
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Featured Projects</h2>
            <p className="text-xl text-muted-foreground">Real results from real customers</p>
          </div>

          <div className="space-y-16">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                    {/* Content */}
                    <div className={`p-8 space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary">{project.type}</Badge>
                          <Badge variant="outline">{project.capacity}</Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                        <p className="text-muted-foreground">{project.titleTh}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.completionDate}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                      {/* Results */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">Key Results:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.results.map((result, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {project.costSavings && (
                        <div className="bg-primary/5 rounded-lg p-4">
                          <div className="text-2xl font-bold text-primary">{project.costSavings}%</div>
                          <div className="text-sm text-muted-foreground">Cost Savings Achieved</div>
                        </div>
                      )}
                    </div>

                    {/* Image */}
                    <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover min-h-[400px]"
                      />
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Before & After</h2>
            <p className="text-xl text-muted-foreground">See the transformation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 2).map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <img
                        src={project.beforeImage || "/placeholder.svg"}
                        alt="Before"
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-sm text-center text-muted-foreground">Before</p>
                    </div>
                    <div className="space-y-2">
                      <img
                        src={project.afterImage || "/placeholder.svg"}
                        alt="After"
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-sm text-center text-muted-foreground">After</p>
                    </div>
                  </div>
                  {project.costSavings && (
                    <div className="text-center">
                      <span className="text-2xl font-bold text-primary">{project.costSavings}%</span>
                      <span className="text-sm text-muted-foreground ml-2">cost reduction</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">All Projects</h2>
            <p className="text-xl text-muted-foreground">Browse our complete portfolio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{project.type}</Badge>
                  </div>
                  {project.costSavings && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-semibold">
                      -{project.costSavings}%
                    </div>
                  )}
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <span>{project.capacity}</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                  >
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4" />
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
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to Start Your Project?</h2>
          <p className="text-xl opacity-90">Join our satisfied customers and start your clean energy journey today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get Your Free Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

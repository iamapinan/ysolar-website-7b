import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Users, Award, Zap, Wrench, CheckCircle, Settings, Battery, Car } from "lucide-react"
import { getCompany, getSiteSettings, getPublishedServices } from "@/services/content.service"

export default async function AboutPage() {
  const [company, settings, services] = await Promise.all([
    getCompany().catch(() => null),
    getSiteSettings().catch(() => ({})),
    getPublishedServices().catch(() => [])
  ])
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {company?.name || "About Y Solar"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {company?.description || "บริษัทผู้นำด้านโซลูชั่นพลังงานสะอาด เชี่ยวชาญโซลาร์รูฟท็อป ระบบชาร์จรถยนต์ไฟฟ้า และบริการซ่อมบำรุง ด้วยมาตรฐานระดับสากล ทีมงานผู้เชี่ยวชาญเฉพาะด้าน และบริการครบวงจร เพื่อสร้างพลังงานสะอาดเพื่ออนาคตที่ยั่งยืน"}
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-primary/20">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {(settings as Record<string, string>).company_vision || "มุ่งมั่นสร้างพลังงานสะอาด เพื่ออนาคตที่ยั่งยืน"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {(settings as Record<string, string>).company_mission || "ให้บริการครบวงจร ตั้งแต่ให้คำปรึกษา ออกแบบ ติดตั้ง จนถึงดูแลหลังการขาย ด้วยมาตรฐานระดับสากลและทีมงานผู้เชี่ยวชาญเฉพาะด้าน"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">ทิศทางการดำเนินงาน</h2>
            <p className="text-xl text-muted-foreground">3 บริการหลักของเรา</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Solar Rooftop */}
            <Card className="border-green-200 hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800">โซลาร์รูฟท็อป</h3>
                    <p className="text-sm text-green-600">และระบบจัดการพลังงาน</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• บริการ ออกแบบ–ติดตั้ง ระบบโซลาร์รูฟท็อปครบวงจร</p>
                  <p>• ระบบ ตรวจสอบและควบคุมการทำงาน เพื่อประสิทธิภาพสูงสุด</p>
                  <p>• จำหน่ายอุปกรณ์มาตรฐานสากล: แผงโซลาร์เซลล์, อินเวอร์เตอร์, แบตเตอรี่, เมาท์ติ้ง และอุปกรณ์เสริมครบชุด</p>
                </div>
              </CardContent>
            </Card>

            {/* EV Charger */}
            <Card className="border-blue-200 hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Car className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">EV Charger</h3>
                    <p className="text-sm text-blue-600">ระบบชาร์จรถยนต์ไฟฟ้า</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• ประเมินและปรับปรุงระบบไฟฟ้า เดิมให้เหมาะสมกับการใช้งาน</p>
                  <p>• ติดตั้งและจำหน่าย EV Charger หลากหลายรุ่น รองรับทุกความต้องการ</p>
                  <p>• บริการซ่อมบำรุง ครอบคลุมทั้งเครื่องชาร์จและรถยนต์ไฟฟ้า</p>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance */}
            <Card className="border-orange-200 hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Wrench className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-800">บริการซ่อมบำรุง</h3>
                    <p className="text-sm text-orange-600">หลังการขาย</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• ตรวจสอบสุขภาพระบบ โซลาร์และ EV Charger อย่างสม่ำเสมอ</p>
                  <p>• บริการ ทำความสะอาดแผงโซลาร์เซลล์ เพื่อคงประสิทธิภาพการผลิตไฟฟ้า</p>
                  <p>• ซ่อมบำรุงเชิงป้องกันและแก้ไขปัญหา ด้วยทีมวิศวกรมืออาชีพ</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Why Y Solar?</h2>
            <p className="text-xl text-muted-foreground">เหตุผลที่ควรเลือกเรา</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "มาตรฐานระดับสากล",
                description: "อุปกรณ์และการติดตั้งที่ผ่านมาตรฐานสากล",
                color: "text-green-600",
                bgColor: "bg-green-100"
              },
              {
                icon: Users,
                title: "ทีมงานผู้เชี่ยวชาญ",
                description: "เฉพาะด้าน มีประสบการณ์และความชำนาญสูง",
                color: "text-blue-600", 
                bgColor: "bg-blue-100"
              },
              {
                icon: Settings,
                title: "บริการครบวงจร",
                description: "ตั้งแต่ให้คำปรึกษา ออกแบบ ติดตั้ง จนถึงดูแลหลังการขาย",
                color: "text-purple-600",
                bgColor: "bg-purple-100"
              },
              {
                icon: CheckCircle,
                title: "พลังงานสะอาด",
                description: "มุ่งมั่นสร้างพลังงานสะอาด เพื่ออนาคตที่ยั่งยืน",
                color: "text-orange-600",
                bgColor: "bg-orange-100"
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Core Values</h2>
            <p className="text-xl text-muted-foreground">หลักการที่ขับเคลื่อนการทำงานของเรา</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                titleTh: "ความเป็นเลิศ",
                description: "มาตรฐานสากลในทุกโครงการที่เราส่งมอบ",
                color: "text-amber-600",
                bgColor: "bg-amber-100"
              },
              {
                icon: Users,
                title: "Expertise", 
                titleTh: "ความเชี่ยวชาญ",
                description: "ความรู้เฉพาะทางและประสบการณ์มืออาชีพ",
                color: "text-blue-600",
                bgColor: "bg-blue-100"
              },
              {
                icon: Target,
                title: "Innovation",
                titleTh: "นวัตกรรม",
                description: "เทคโนโลยีล้ำสมัยและโซลูชั่นยั่งยืน",
                color: "text-green-600",
                bgColor: "bg-green-100"
              },
              {
                icon: Eye,
                title: "Integrity",
                titleTh: "ความซื่อสัตย์",
                description: "บริการโปร่งใสและการสื่อสารที่จริงใจ",
                color: "text-purple-600",
                bgColor: "bg-purple-100"
              },
            ].map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                    <value.icon className={`w-8 h-8 ${value.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-sm font-medium text-primary">{value.titleTh}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

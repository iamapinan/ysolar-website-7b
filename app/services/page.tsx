import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteModal } from "@/components/quote-modal"
import { 
  Sun, 
  Zap, 
  Wrench, 
  CheckCircle, 
  TrendingUp,
  Settings,
  Star,
} from "lucide-react"
import { getPublishedServices } from "@/services/content.service"

export default async function ServicesPage() {
  const servicesDb = await getPublishedServices().catch(() => [])
  
  // Fallback service data for when database services are not available
  const fallbackServiceDetails = {
    solar: {
      title: "โซลาร์รูฟท็อปและระบบจัดการพลังงาน",
      description: "บริการออกแบบและติดตั้งระบบโซลาร์รูฟท็อปครบวงจรด้วยอุปกรณ์มาตรฐานสากล พร้อมระบบจัดการพลังงานอัจฉริยะ เพื่อลดค่าไฟฟ้าได้ถึง 70%",
      image: "/modern-solar-panels-on-rooftop-with-blue-sky.png",
      features: [
        "ออกแบบระบบเฉพาะตามความต้องการ",
        "แผงโซลาร์คุณภาพสูงรับประกัน 25 ปี",
        "อินเวอร์เตอร์คุณภาพเยอรมันรับประกัน 10 ปี",
        "ระบบตรวจสอบประสิทธิภาพแบบเรียลไทม์",
        "ติดตั้งโดยทีมช่างมืออาชีพที่ผ่านการรับรอง",
        "คำนวณผลตอบแทนการลงทุน (ROI)",
        "ระบบ Grid-tie และ Hybrid",
        "ดำเนินการขออนุญาตกับ MEA/PEA"
      ],
      process: [
        "ประเมินพื้นที่และตรวจสอบการใช้ไฟฟ้าฟรี",
        "ออกแบบระบบ 3 มิติพร้อมวิเคราะห์เงา",
        "ดำเนินการขออนุญาตกับหน่วยงานที่เกี่ยวข้อง",
        "ติดตั้งระบบโดยมืออาชีพ (1-3 วัน)",
        "ทดสอบระบบและตรวจสอบประสิทธิภาพ",
        "เชื่อมต่อกับระบบไฟฟ้าสาธารณะ",
        "อบรมการใช้งานและส่งมอบระบบ",
        "บริการตรวจสอบและสนับสนุนอย่างต่อเนื่อง"
      ],
      benefits: [
        "ลดค่าไฟฟ้าได้ 30-70%",
        "เพิ่มมูลค่าทรัพย์สิน 4-6%",
        "รับประกันการผลิตไฟฟ้า 25 ปี",
        "ลดการปล่อย CO2 1.5 ตัน/ปี",
        "ความมั่นคงด้านพลังงาน",
        "ได้รับสิทธิประโยชน์จากรัฐบาล",
        "คืนทุนภายใน 4-7 ปี",
        "ใช้งานได้นานโดยไม่ต้องบำรุงรักษา"
      ],
      stats: [
        { value: "500+", label: "โครงการที่พักอาศัย" },
        { value: "50+", label: "โครงการพาณิชย์" },
        { value: "70%", label: "ลดค่าไฟโดยเฉลี่ย" },
        { value: "25", label: "ปีรับประกัน" }
      ]
    },
    maintenance: {
      title: "บริการซ่อมบำรุงหลังการขาย",
      description: "โปรแกรมบำรุงรักษาครบวงจรและบริการสนับสนุนมืออาชีพ เพื่อให้ระบบโซลาร์และเครื่องชาร์จ EV ทำงานได้อย่างเหมาะสมและยาวนาน",
      image: "/placeholder.jpg",
      features: [
        "โปรแกรมบำรุงรักษาเชิงป้องกัน (รายไตรมาส/รายปี)",
        "ระบบตรวจสอบและแจ้งเตือน 24 ชั่วโมง",
        "บริการทำความสะอาดแผงโซลาร์มืออาชีพ",
        "ปรับปรุงประสิทธิภาพและการแก้ไขปัญหา",
        "บริการซ่อมแซมฉุกเฉิน (ตอบสนองภายในวัน)",
        "เปลี่ยนชิ้นส่วนด้วยอะไหล่แท้",
        "รับประกันขยายได้ถึง 10 ปี",
        "รายงานประสิทธิภาพและการวิเคราะห์โดยละเอียด"
      ],
      process: [
        "ประเมินสุขภาพระบบและการวินิจฉัย",
        "นัดตรวจบำรุงรักษาตามกำหนดโดยช่างที่ผ่านการรับรอง",
        "วิเคราะห์ประสิทธิภาพและการปรับปรุง",
        "ทดสอบชิ้นส่วนและเปลี่ยนหากจำเป็น",
        "ทำความสะอาดระบบและการตรวจสอบด้วยสายตา",
        "อัปเดตซอฟต์แวร์และการปรับเทียบ",
        "รายงานโดยละเอียดพร้อมคำแนะนำ",
        "ปรึกษาลูกค้าและการวางแผน"
      ],
      benefits: [
        "รักษาประสิทธิภาพระบบได้ 95%+",
        "ยืดอายุการใช้งานอุปกรณ์ 20-30%",
        "ลดเวลาหยุดทำงานโดยไม่คาดคิด",
        "รักษาการรับประกัน",
        "ตรวจจับปัญหาได้ตั้งแต่เนิ่นๆ",
        "เพิ่มผลตอบแทนจากการลงทุน",
        "ความสบายใจด้วยการสนับสนุนมืออาชีพ",
        "บริการและสนับสนุนเป็นลำดับแรก"
      ],
      stats: [
        { value: "500+", label: "ลูกค้าบำรุงรักษา" },
        { value: "24/7", label: "การตรวจสอบตลอดเวลา" },
        { value: "95%+", label: "ประสิทธิภาพระบบ" },
        { value: "< 4 ชม.", label: "เวลาตอบสนอง" }
      ]
    },
    ev: {
      title: "ระบบชาร์จรถยนต์ไฟฟ้า (EV Charger)",
      description: "ติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้าและปรับปรุงระบบไฟฟ้าแบบมืออาชีพ สำหรับที่พักอาศัย พาณิชย์ และสาธารณะ",
      image: "/professional-team-installing-solar-panels-and-ev-c.png",
      features: [
        "การชาร์จ AC ระดับ 2 (7.4kW - 22kW)",
        "ตัวเลือกการชาร์จ DC เร็ว (50kW - 150kW)",
        "การชาร์จอัจฉริยะด้วยแอปมือถือ",
        "รองรับหัวชาร์จหลายประเภท (Type 2, CCS, CHAdeMO)",
        "การจัดการโหลดและพลังงาน",
        "ทนต่อสภาพอากาศ IP65",
        "ระบบควบคุมการเข้าถึง RFID และการเรียกเก็บเงิน",
        "เชื่อมต่อกับระบบโซลาร์"
      ],
      process: [
        "ประเมินระบบไฟฟ้าของพื้นที่และการคำนวณโหลด",
        "เลือกเครื่องชาร์จและการวางแผนโครงสร้างพื้นฐาน",
        "อัปเกรดแผงไฟฟ้าหากจำเป็น",
        "ยื่นขออนุญาตและการประสานงานกับหน่วยงาน",
        "ติดตั้งและเดินสายโดยมืออาชีพ",
        "ทดสอบความปลอดภัยและการใช้งาน",
        "ตั้งค่าแอปและการอบรมผู้ใช้",
        "บำรุงรักษาและการสนับสนุนอย่างต่อเนื่อง"
      ],
      benefits: [
        "ชาร์จได้สะดวกที่บ้าน/ที่ทำงาน 24/7",
        "ชาร์จได้เร็วขึ้น 3-10 เท่าของเต้าเสียบทั่วไป",
        "ตั้งเวลาชาร์จในช่วงนอกเวลาพีก",
        "พร้อมใช้งานกับรถ EV ทุกรุ่น",
        "เพิ่มมูลค่าและความน่าสนใจของทรัพย์สิน",
        "ลดค่าใช้จ่ายการชาร์จสาธารณะ",
        "ลดการปล่อยคาร์บอน",
        "มีสิทธิ์ได้รับสิทธิประโยชน์ EV จากรัฐบาล"
      ],
      stats: [
        { value: "200+", label: "เครื่องชาร์จที่ติดตั้ง" },
        { value: "4-8", label: "ชั่วโมงชาร์จเต็ม" },
        { value: "24/7", label: "การตรวจสอบอัจฉริยะ" },
        { value: "100%", label: "พร้อมพลังงานสะอาด" }
      ]
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            บริการของเรา
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            โซลูชันพลังงานสะอาดครบวงจรที่ออกแบบมาเพื่อตอบสนองความต้องการเฉพาะของคุณ ด้วยเทคโนโลยีระดับโลกและบริการมืออาชีพ
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {servicesDb.length > 0 ? (
            // แสดงข้อมูลจากฐานข้อมูล
            servicesDb.map((service, index) => {
              const IconComponent = service.category === 'solar' ? Sun : service.category === 'ev' ? Zap : Wrench
              
              return (
                <div key={service.id} className="space-y-16">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                    {/* Content */}
                    <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{service.title}</h2>
                      </div>

                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {service.summary || "บริการพลังงานสะอาดคุณภาพสูง"}
                      </p>

                      {/* Content from database */}
                      {service.content && (
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                          <div dangerouslySetInnerHTML={{ __html: service.content }} />
                        </div>
                      )}

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <QuoteModal />
                      </div>
                    </div>

                    {/* Image */}
                    <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl overflow-hidden">
                        {service.image_url ? (
                          <img
                            src={service.image_url}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <IconComponent className="w-24 h-24 text-primary/30" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            // Fallback if no database services found - เรียงลำดับใหม่: solar, maintenance, ev
            ['solar', 'maintenance', 'ev'].map((key, index) => {
              const serviceDetail = fallbackServiceDetails[key as keyof typeof fallbackServiceDetails]
              return (
              <div key={key} className="space-y-16">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{serviceDetail.title}</h2>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">{serviceDetail.description}</p>

                    <div className="grid grid-cols-2 gap-6">
                      {serviceDetail.stats.map((stat, idx) => (
                        <div key={idx} className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <QuoteModal />
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl overflow-hidden">
                      <img
                        src={serviceDetail.image}
                        alt={serviceDetail.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <Card className="p-6">
                    <CardContent className="p-0 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-semibold">คุณสมบัติเด่น</h3>
                      </div>
                      <div className="space-y-3">
                        {serviceDetail.features.slice(0, 6).map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardContent className="p-0 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Settings className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-semibold">ขั้นตอนการทำงาน</h3>
                      </div>
                      <div className="space-y-3">
                        {serviceDetail.process.slice(0, 6).map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold text-primary">{idx + 1}</span>
                            </div>
                            <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardContent className="p-0 space-y-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-semibold">ประโยชน์ที่ได้รับ</h3>
                      </div>
                      <div className="space-y-3">
                        {serviceDetail.benefits.slice(0, 6).map((benefit, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              )
            })
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              ทำไมต้องเลือกเรา
            </h2>
            <p className="text-xl text-muted-foreground">
              มากกว่า 10 ปีของประสบการณ์ในอุตสาหกรรมพลังงานสะอาด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "ประสบการณ์มากกว่า 10 ปี", 
                titleEn: "10+ Years Experience",
                description: "ผู้เชี่ยวชาญด้านพลังงานสะอาดที่ได้รับการยอมรับ",
                stats: "500+ โครงการสำเร็จ"
              },
              { 
                title: "รับประกันครบวงจร", 
                titleEn: "Comprehensive Warranty",
                description: "รับประกันอุปกรณ์ 25 ปี และการติดตั้ง 10 ปี",
                stats: "25 ปี รับประกัน"
              },
              {
                title: "ทีมงานมืออาชีพ",
                titleEn: "Professional Team",
                description: "วิศวกรและช่างเทคนิคที่ผ่านการรับรองมาตรฐานสากล",
                stats: "50+ ผู้เชี่ยวชาญ"
              },
              { 
                title: "บริการหลังการขาย 24/7", 
                titleEn: "24/7 After-Sales Service",
                description: "ดูแลและซ่อมบำรุงระบบตลอด 24 ชั่วโมง",
                stats: "< 4 ชม. เวลาตอบสนอง"
              },
              { 
                title: "ประหยัดค่าไฟสูงสุด", 
                titleEn: "Maximum Savings",
                description: "ลดค่าไฟฟ้าได้ถึง 70% ด้วยเทคโนโลยีล้ำสมัย",
                stats: "70% ลดค่าไฟ"
              },
              { 
                title: "เป็นมิตรต่อสิ่งแวดล้อม", 
                titleEn: "Eco-Friendly Solutions",
                description: "ลดการปล่อย CO2 และช่วยรักษาสิ่งแวดล้อม",
                stats: "1.5 ตัน CO2/ปี"
              },
            ].map((advantage, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{advantage.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium mb-3">{advantage.titleEn}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{advantage.description}</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-3">
                      <div className="text-lg font-bold text-primary">{advantage.stats}</div>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Infographic */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              ขั้นตอนการทำงาน
            </h2>
            <p className="text-xl text-muted-foreground">
              กระบวนการทำงานที่เป็นระบบเพื่อผลลัพธ์ที่เป็นเลิศ
            </p>
          </div>

          {/* Process Flow */}
          <div className="relative">
            {/* Connection Lines for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {[
                { 
                  title: "ประเมินและสำรวจ", 
                  titleEn: "Assessment & Survey",
                  description: "ตรวจสอบพื้นที่ วิเคราะห์การใช้ไฟฟ้า และประเมินศักยภาพ",
                  duration: "1-2 วัน"
                },
                { 
                  title: "ออกแบบระบบ", 
                  titleEn: "System Design",
                  description: "ออกแบบระบบเฉพาะตามความต้องการและพื้นที่ใช้งาน",
                  duration: "3-5 วัน"
                },
                {
                  title: "ติดตั้งระบบ",
                  titleEn: "Installation",
                  description: "ติดตั้งอุปกรณ์โดยทีมช่างมืออาชีพที่ผ่านการรับรอง",
                  duration: "1-3 วัน"
                },
                { 
                  title: "ทดสอบและส่งมอบ", 
                  titleEn: "Testing & Handover",
                  description: "ทดสอบระบบ อบรมการใช้งาน และส่งมอบระบบพร้อมใช้",
                  duration: "1 วัน"
                },
              ].map((step, index) => (
                  <div key={index} className="relative">
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                      <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                    </div>
                    
                    <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative z-0">
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                          <p className="text-sm text-muted-foreground font-medium mb-3">{step.titleEn}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                        </div>
                        <div className="bg-primary/5 rounded-lg p-2">
                          <div className="text-sm font-semibold text-primary">ระยะเวลา: {step.duration}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+CjwvZz4KPC9nPgo8L3N2Zz4=')]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              พร้อมเริ่มต้นแล้วหรือยัง?
            </h2>
            <p className="text-xl opacity-90">
              ติดต่อผู้เชี่ยวชาญของเราวันนี้เพื่อรับคำปรึกษาฟรีและใบเสนอราคาที่เหมาะสม
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <QuoteModal 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 border-2 border-white shadow-lg"
            />
            <a href="tel:0816526141">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                โทร 081-6526141
              </Button>
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-primary-foreground/20">
            {[
              { value: "500+", label: "โครงการสำเร็จ" },
              { value: "10+", label: "ปีประสบการณ์" },
              { value: "25", label: "ปีรับประกัน" },
              { value: "24/7", label: "บริการหลังการขาย" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-75">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

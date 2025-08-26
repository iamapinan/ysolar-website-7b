import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Zap, Wrench, CheckCircle, ArrowRight, Battery, Shield, Gauge } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      id: "solar",
      icon: Sun,
      title: "Solar Rooftop Solutions",
      titleTh: "ระบบโซลาร์รูฟท็อป",
      description: "Complete solar rooftop design and installation services with international standard equipment",
      descriptionTh: "บริการออกแบบและติดตั้งระบบโซลาร์รูฟท็อปครบวงจรด้วยอุปกรณ์มาตรฐานสากล",
      features: [
        "Custom system design and engineering",
        "Premium solar panels and inverters",
        "Professional installation team",
        "Performance monitoring system",
        "25-year equipment warranty",
        "ROI calculation and analysis",
      ],
      process: [
        "Site assessment and energy audit",
        "Custom system design",
        "Permit and approval handling",
        "Professional installation",
        "System commissioning and testing",
        "Ongoing monitoring and support",
      ],
      benefits: [
        "Reduce electricity bills by 30-70%",
        "Increase property value",
        "Environmental impact reduction",
        "Energy independence",
      ],
    },
    {
      id: "ev-charger",
      icon: Zap,
      title: "EV Charger Systems",
      titleTh: "ระบบชาร์จรถยนต์ไฟฟ้า",
      description: "EV charger installation and electrical system upgrades for all vehicle types",
      descriptionTh: "ติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้าและปรับปรุงระบบไฟฟ้าสำหรับรถทุกประเภท",
      features: [
        "Level 2 and DC fast charging options",
        "Smart charging management",
        "Multiple connector types support",
        "Mobile app integration",
        "Load balancing technology",
        "Weather-resistant design",
      ],
      process: [
        "Electrical system assessment",
        "Charger selection and planning",
        "Electrical upgrades if needed",
        "Professional installation",
        "Testing and commissioning",
        "User training and support",
      ],
      benefits: [
        "Convenient home/office charging",
        "Faster charging speeds",
        "Smart energy management",
        "Future-ready infrastructure",
      ],
    },
    {
      id: "maintenance",
      icon: Wrench,
      title: "Maintenance & After Sales",
      titleTh: "บริการซ่อมบำรุงหลังการขาย",
      description: "Regular maintenance and health checks for solar systems and EV chargers",
      descriptionTh: "บริการซ่อมบำรุงและตรวจสุขภาพระบบโซลาร์และเครื่องชาร์จรถยนต์ไฟฟ้าอย่างสม่ำเสมอ",
      features: [
        "Preventive maintenance programs",
        "24/7 monitoring and alerts",
        "Professional cleaning services",
        "Performance optimization",
        "Emergency repair services",
        "Extended warranty options",
      ],
      process: [
        "System health assessment",
        "Scheduled maintenance visits",
        "Performance analysis",
        "Component replacement if needed",
        "System optimization",
        "Detailed reporting",
      ],
      benefits: ["Maximum system efficiency", "Extended equipment lifespan", "Reduced downtime", "Peace of mind"],
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive clean energy solutions designed to meet your specific needs with world-class technology and
            professional service
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">{service.title}</h2>
                    <p className="text-muted-foreground">{service.titleTh}</p>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90">
                  Get Quote for {service.title}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <img
                  src={`/${service.id}-service-illustration.png`}
                  alt={service.title}
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Process</h2>
            <p className="text-xl text-muted-foreground">How we deliver exceptional results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Gauge, title: "Assessment", description: "Comprehensive site evaluation and energy analysis" },
              { icon: Sun, title: "Design", description: "Custom system design optimized for your needs" },
              {
                icon: Shield,
                title: "Installation",
                description: "Professional installation by certified technicians",
              },
              { icon: Battery, title: "Testing", description: "Thorough system testing and commissioning" },
              { icon: CheckCircle, title: "Support", description: "Ongoing monitoring and maintenance support" },
              { icon: ArrowRight, title: "Optimization", description: "Continuous performance optimization" },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl opacity-90">Contact our experts today for a free consultation and customized quote.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Call +66-2-xxx-xxxx
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Zap, Wrench, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Clean Energy
                <span className="text-primary block">Solutions</span>
                for Tomorrow
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Leading provider of solar rooftop systems and EV charging solutions. Transform your energy consumption
                with our world-class technology and professional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline">
                  View Projects
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src="/modern-solar-panels-on-rooftop-with-blue-sky.png" alt="Solar panels installation" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Core Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive clean energy solutions designed for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Solar Service */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <Sun className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Solar Rooftop Solutions</h3>
                <p className="text-muted-foreground">
                  Complete solar rooftop design and installation services with international standard equipment
                </p>
                <Link href="/services" className="inline-flex items-center text-primary hover:text-primary/80">
                  Learn More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            {/* EV Charger Service */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-secondary/20 transition-colors">
                  <Zap className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">EV Charger Systems</h3>
                <p className="text-muted-foreground">
                  EV charger installation and electrical system upgrades for all vehicle types
                </p>
                <Link href="/services" className="inline-flex items-center text-primary hover:text-primary/80">
                  Learn More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Maintenance Service */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <Wrench className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Maintenance & After Sales</h3>
                <p className="text-muted-foreground">
                  Regular maintenance and health checks for solar systems and EV chargers
                </p>
                <Link href="/services" className="inline-flex items-center text-primary hover:text-primary/80">
                  Learn More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Y Solar Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Why Choose Y Solar?</h2>
              <div className="space-y-6">
                {[
                  "International standard equipment and installation",
                  "Expert team with specialized knowledge",
                  "Complete service from consultation to after-sales",
                  "Committed to clean energy for sustainable future",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Learn About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <img src="/professional-team-installing-solar-panels-and-ev-c.png" alt="Y Solar professional team" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to Switch to Clean Energy?</h2>
          <p className="text-xl opacity-90">
            Get a free consultation and quote for your solar or EV charging project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get Free Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Call Us Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

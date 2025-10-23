import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Zap, Wrench, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import WattCalculator from "@/components/watt-calculator"
import FeaturedProducts from "@/components/featured-products"
import { getPublishedServices } from "@/services/content.service"
import { db } from "@/lib/db"

export default async function HomePage() {
  const servicesDb = await getPublishedServices().catch(() => [])
  
  // Get active hero banner
  const [heroBanners] = await db.execute(
    'SELECT * FROM hero_banners WHERE is_active = 1 ORDER BY sort_order ASC LIMIT 1'
  ).catch(() => [[]])
  const heroBanner = (heroBanners as any[])[0]
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBanner?.background_image || "/modern-solar-panels-on-rooftop-with-blue-sky.png"} 
            alt="Solar panels installation" 
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Realistic Sunlight Effects */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          {/* Atmospheric Haze */}
          <div className="absolute inset-0 atmospheric-haze"></div>
          
          {/* Sun Position (top right corner) */}
          <div className="absolute top-16 right-16 w-32 h-32">
            {/* Sun Core */}
            <div className="absolute inset-0 sun-core sun-glow rounded-full"></div>
            
            {/* God Rays emanating from sun */}
            <div className="absolute top-0 left-1/2 god-rays" style={{transformOrigin: 'center top'}}>
              <div className="sun-ray h-96"></div>
              <div className="sun-ray h-80"></div>
              <div className="sun-ray h-[420px]"></div>
              <div className="sun-ray h-96"></div>
              <div className="sun-ray h-72"></div>
              <div className="sun-ray h-96"></div>
              <div className="sun-ray h-80"></div>
            </div>
          </div>
          
          {/* Lens Flares */}
          <div className="absolute top-24 right-32 w-8 h-8 rounded-full bg-white/40 lens-flare" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-32 right-40 w-6 h-6 rounded-full bg-orange-200/50 lens-flare" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 right-48 w-4 h-4 rounded-full bg-orange-200/60 lens-flare" style={{animationDelay: '2s'}}></div>
          
          {/* Dust Particles in sunbeams */}
          <div className="absolute top-32 right-24 w-1 h-1 bg-white/60 rounded-full dust-particles" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-48 right-32 w-1 h-1 bg-orange-100/70 rounded-full dust-particles" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-56 right-20 w-1 h-1 bg-white/50 rounded-full dust-particles" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-64 right-36 w-1 h-1 bg-orange-200/60 rounded-full dust-particles" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-40 right-16 w-1 h-1 bg-white/40 rounded-full dust-particles" style={{animationDelay: '2.5s'}}></div>
          
          {/* Subtle light rays across the scene */}
          <div className="absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-12 god-rays"></div>
          <div className="absolute top-40 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-100/15 to-transparent transform rotate-6 god-rays" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-60 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/8 to-transparent transform rotate-3 god-rays" style={{animationDelay: '4s'}}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              {heroBanner?.title || "Clean Energy"}
              <span className="block" style={{color: '#fe7c49'}}>{heroBanner?.subtitle || "Solutions for Tomorrow"}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              {heroBanner?.description || "Leading provider of solar rooftop systems and EV charging solutions. Transform your energy consumption with our world-class technology and professional service."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {heroBanner?.button_text && (
                <Link href={heroBanner.button_link || "/quote"}>
                  <Button size="lg" className="text-white font-semibold px-8 py-4 text-lg hover:opacity-90" style={{backgroundColor: '#fe7c49'}}>
                    {heroBanner.button_text}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              {heroBanner?.button_text_2 && (
                <Link href={heroBanner.button_link_2 || "/projects"}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
                    {heroBanner.button_text_2}
                  </Button>
                </Link>
              )}
              {!heroBanner && (
                <>
                  <Button size="lg" className="text-white font-semibold px-8 py-4 text-lg hover:opacity-90" style={{backgroundColor: '#fe7c49'}}>
                    Get Free Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-gray-900 hover:bg-white hover:text-black px-8 py-4 text-lg">
                    View Projects
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              High-quality solar products and equipment for your clean energy needs
            </p>
          </div>

          <FeaturedProducts />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Core Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive clean energy solutions designed for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(servicesDb as any[]).length > 0 ? (
              (servicesDb as any[]).slice(0, 3).map((svc, i) => {
                const IconComponent = [Sun, Zap, Wrench][i % 3]
                return (
                  <Card key={svc.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{svc.title}</h3>
                      {svc.summary && <p className="text-muted-foreground">{svc.summary}</p>}
                      <Link href="/services" className="inline-flex items-center text-primary hover:text-primary/80">
                        Learn More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <>
                <Card className="group hover:shadow-lg transition-shadow"><CardContent className="p-8 text-center space-y-4"><div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors"><Sun className="w-8 h-8 text-primary" /></div><h3 className="text-xl font-semibold">Solar Rooftop Solutions</h3><p className="text-muted-foreground">Complete solar rooftop design and installation services with international standard equipment</p><Link href="/services" className="inline-flex items-center text-primary hover:text-primary/80">Learn More <ArrowRight className="ml-1 w-4 h-4" /></Link></CardContent></Card>
                <Card className="group hover:shadow-lg transition-shadow"><CardContent className="p-8 text-center space-y-4"><div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-secondary/20 transition-colors"><Zap className="w-8 h-8 text-secondary" /></div><h3 className="text-xl font-semibold">EV Charger Systems</h3><p className="text-muted-foreground">EV charger installation and electrical system upgrades for all vehicle types</p><Link href="/services" className="inline-flex items-center text-primary hover:text-primary/80">Learn More <ArrowRight className="ml-1 w-4 h-4" /></Link></CardContent></Card>
                <Card className="group hover:shadow-lg transition-shadow"><CardContent className="p-8 text-center space-y-4"><div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors"><Wrench className="w-8 h-8 text-primary" /></div><h3 className="text-xl font-semibold">Maintenance & After Sales</h3><p className="text-muted-foreground">Regular maintenance and health checks for solar systems and EV chargers</p><Link href="/services" className="inline-flex items-center text-primary hover:text-primary/80">Learn More <ArrowRight className="ml-1 w-4 h-4" /></Link></CardContent></Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Watt Calculator Section */}
      <WattCalculator />

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
            <Button size="lg" variant="secondary" style={{backgroundColor: '#fe7c49'}}>
              Get Free Quote
            </Button>
            <a href="tel:0816526141"
            
              className="px-4 py-2 pointer-events-auto rounded-md border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

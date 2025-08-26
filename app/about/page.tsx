import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">About Y Solar</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are committed to creating a sustainable future through innovative clean energy solutions, providing
            world-class solar and EV charging systems with professional service excellence.
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
                  To create a sustainable future through clean energy solutions, leading Thailand's transition to
                  renewable energy and electric mobility while contributing to global environmental preservation.
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
                  Providing world-class solar and EV charging solutions with professional service, innovative
                  technology, and comprehensive support to help our customers achieve energy independence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                description: "International standards in every project we deliver",
              },
              {
                icon: Users,
                title: "Expertise",
                description: "Specialized knowledge and professional experience",
              },
              {
                icon: Target,
                title: "Innovation",
                description: "Cutting-edge technology and sustainable solutions",
              },
              {
                icon: Eye,
                title: "Integrity",
                description: "Transparent service and honest communication",
              },
            ].map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Expert Team</h2>
            <p className="text-xl text-muted-foreground">Meet the professionals behind Y Solar's success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                position: "CEO & Founder",
                image: "/professional-ceo-portrait.png",
              },
              {
                name: "Sarah Johnson",
                position: "Technical Director",
                image: "/professional-engineer-portrait.png",
              },
              {
                name: "Mike Chen",
                position: "Operations Manager",
                image: "/professional-manager-portrait.png",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-muted-foreground">{member.position}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">Partner with Y Solar Today</h2>
          <p className="text-xl opacity-90">
            Join hundreds of satisfied customers who have made the switch to clean energy.
          </p>
          <Button size="lg" variant="secondary">
            Contact Our Team
          </Button>
        </div>
      </section>
    </div>
  )
}

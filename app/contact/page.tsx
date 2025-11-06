"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceInterest: "",
      message: "",
    })
    setIsSubmitting(false)

    // Show success message (in real app, you'd handle this properly)
    alert("Thank you for your message! We'll get back to you soon.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your clean energy journey? Get in touch with our experts today.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <Card className="py-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <p className="text-muted-foreground">+66-81-6526141</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="py-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">yod@ysolar.co.th</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="py-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Office</h3>
                      <p className="text-muted-foreground">282/4 หมู่ที่ 18 ตำบลพระลับ อำเภอเมืองขอนแก่น จังหวัดขอนแก่น</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="py-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Business Hours</h3>
                      <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Sat: 9:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
          <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about solar energy or EV charging? Our team of experts is here to help you find the
                perfect clean energy solution.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+66-xx-xxx-xxxx"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interest</Label>
                    <Select
                      value={formData.serviceInterest}
                      onValueChange={(value) => handleInputChange("serviceInterest", value)}
                      className="text-gray-900 bg-white"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service you're interested in" />
                      </SelectTrigger>
                      <SelectContent className="text-gray-900 bg-white">
                        <SelectItem value="solar">Solar Rooftop System</SelectItem>
                        <SelectItem value="ev_charger">EV Charger Installation</SelectItem>
                        <SelectItem value="maintenance">Maintenance Service</SelectItem>
                        <SelectItem value="consultation">General Consultation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your project or questions..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white border-1 border-gray-800 hover:border-gray-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-foreground">Visit Our Office</h2>
            <p className="text-muted-foreground">Come see our showroom and meet our team in person</p>
          </div>

          <Card className="overflow-hidden py-0">
            <div className="w-full h-96 bg-muted flex items-center justify-center">
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4908.324736933801!2d102.88985600000001!3d16.424909000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDI1JzI5LjciTiAxMDLCsDUzJzIzLjUiRQ!5e1!3m2!1sen!2sth!4v1762405283713!5m2!1sen!2sth" width="600" height="520" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full"></iframe>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

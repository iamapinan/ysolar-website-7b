"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Loader2, CheckCircle, Phone, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    projectSize: "",
    budget: "",
    timeline: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          serviceType: "",
          projectSize: "",
          budget: "",
          timeline: "",
          message: "",
        })
      } else {
        alert(t("quote.errorMessage"))
      }
    } catch (error) {
      alert(t("quote.errorMessage"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">{t("quote.successMessage")}</h1>
              <p className="text-muted-foreground mb-6">{t("quote.subtitle")}</p>
              <Button onClick={() => setIsSubmitted(false)} className="mr-4">
                {t("nav.getQuote")}
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                {t("nav.home")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t("quote.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("quote.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  {t("quote.title")}
                </CardTitle>
                <CardDescription>{t("quote.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t("quote.name")} *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t("quote.email")} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">{t("quote.phone")} *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">{t("quote.company")}</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="serviceType">{t("quote.serviceType")} *</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => handleInputChange("serviceType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("quote.selectPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solar-rooftop">{t("quote.services.solarRooftop")}</SelectItem>
                        <SelectItem value="ev-charger">{t("quote.services.evCharger")}</SelectItem>
                        <SelectItem value="maintenance">{t("quote.services.maintenance")}</SelectItem>
                        <SelectItem value="consultation">{t("quote.services.consultation")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectSize">{t("quote.projectSize")}</Label>
                      <Select
                        value={formData.projectSize}
                        onValueChange={(value) => handleInputChange("projectSize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("quote.selectPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">{t("quote.projectSizes.small")}</SelectItem>
                          <SelectItem value="medium">{t("quote.projectSizes.medium")}</SelectItem>
                          <SelectItem value="large">{t("quote.projectSizes.large")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">{t("quote.budget")}</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("quote.selectPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-500k">{t("quote.budgets.under500k")}</SelectItem>
                          <SelectItem value="500k-1m">{t("quote.budgets.500k1m")}</SelectItem>
                          <SelectItem value="1m-5m">{t("quote.budgets.1m5m")}</SelectItem>
                          <SelectItem value="over-5m">{t("quote.budgets.over5m")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="timeline">{t("quote.timeline")}</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("quote.selectPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">{t("quote.timelines.urgent")}</SelectItem>
                        <SelectItem value="normal">{t("quote.timelines.normal")}</SelectItem>
                        <SelectItem value="flexible">{t("quote.timelines.flexible")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">{t("quote.message")}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder={t("quote.messagePlaceholder")}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("quote.submitting")}
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        {t("quote.submitButton")}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("nav.contact")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">+66 2 123 4567</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">info@ysolar.co.th</p>
                    <p className="text-sm text-muted-foreground">24/7 Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Bangkok, Thailand</p>
                    <p className="text-sm text-muted-foreground">Nationwide Service</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why Choose Y Solar?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ 10+ Years Experience</li>
                  <li>✓ 24/7 Customer Support</li>
                  <li>✓ Nationwide Installation</li>
                  <li>✓ 25-Year Warranty</li>
                  <li>✓ Free Consultation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

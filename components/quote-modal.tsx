"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calculator, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
        alert(t("quote.successMessage"))
        setIsOpen(false)
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Calculator className="mr-2 h-4 w-4" />
          {t("nav.getQuote")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{t("quote.title")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
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
              <Select value={formData.projectSize} onValueChange={(value) => handleInputChange("projectSize", value)}>
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("quote.submitting")}
              </>
            ) : (
              t("quote.submitButton")
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

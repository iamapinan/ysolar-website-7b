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

export function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
        alert("ขอบคุณสำหรับการส่งคำขอใบเสนอราคา เราจะติดต่อกลับภายใน 24 ชั่วโมง")
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
        alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
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
          ขอใบเสนอราคา
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">ขอใบเสนอราคา</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">อีเมล *</Label>
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
              <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="company">บริษัท/องค์กร</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="serviceType">ประเภทบริการ *</Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกประเภทบริการ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solar-rooftop">ระบบโซลาร์รูฟท็อป</SelectItem>
                <SelectItem value="ev-charger">ระบบชาร์จรถยนต์ไฟฟ้า</SelectItem>
                <SelectItem value="maintenance">บริการบำรุงรักษา</SelectItem>
                <SelectItem value="consultation">ให้คำปรึกษา</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectSize">ขนาดโครงการ</Label>
              <Select value={formData.projectSize} onValueChange={(value) => handleInputChange("projectSize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกขนาดโครงการ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">เล็ก (1-10 kW)</SelectItem>
                  <SelectItem value="medium">กลาง (10-100 kW)</SelectItem>
                  <SelectItem value="large">ใหญ่ (100+ kW)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="budget">งบประมาณ</Label>
              <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกช่วงงบประมาณ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-500k">ต่ำกว่า 500,000 บาท</SelectItem>
                  <SelectItem value="500k-1m">500,000 - 1,000,000 บาท</SelectItem>
                  <SelectItem value="1m-5m">1,000,000 - 5,000,000 บาท</SelectItem>
                  <SelectItem value="over-5m">มากกว่า 5,000,000 บาท</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="timeline">ระยะเวลาที่ต้องการ</Label>
            <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกระยะเวลา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">ด่วน (ภายใน 1 เดือน)</SelectItem>
                <SelectItem value="normal">ปกติ (1-3 เดือน)</SelectItem>
                <SelectItem value="flexible">ยืดหยุ่น (3+ เดือน)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">รายละเอียดเพิ่มเติม</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="กรุณาระบุรายละเอียดโครงการ ความต้องการพิเศษ หรือคำถามอื่นๆ"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังส่ง...
              </>
            ) : (
              "ส่งคำขอใบเสนอราคา"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

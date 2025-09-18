"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"
import { useRouter } from "next/navigation"

export default function NewHeroBannerPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    background_image: "",
    button_text: "",
    button_link: "",
    button_text_2: "",
    button_link_2: "",
    is_active: true,
    sort_order: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/hero-banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "ไม่สามารถบันทึกข้อมูลได้")
      router.replace("/admin/hero-banners")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">เพิ่ม Hero Banner ใหม่</h1>
          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">หัวข้อหลัก</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="เช่น Clean Energy"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">หัวข้อรอง</label>
                <Input
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="เช่น Solutions for Tomorrow"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">คำอธิบาย</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="คำอธิบาย Hero Banner"
                className="min-h-24"
              />
            </div>

            <div>
              <label className="text-sm font-medium">รูปภาพพื้นหลัง</label>
              <FileUpload
                onUpload={(url, key) => setForm({ ...form, background_image: url })}
                folder="hero-banners"
                accept="image/*"
                className="mt-2"
              />
              {form.background_image && (
                <div className="mt-4">
                  <img
                    src={form.background_image}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">ข้อความปุ่มที่ 1</label>
                <Input
                  value={form.button_text}
                  onChange={(e) => setForm({ ...form, button_text: e.target.value })}
                  placeholder="เช่น Get Free Quote"
                />
              </div>
              <div>
                <label className="text-sm font-medium">ลิงก์ปุ่มที่ 1</label>
                <Input
                  value={form.button_link}
                  onChange={(e) => setForm({ ...form, button_link: e.target.value })}
                  placeholder="เช่น /quote"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">ข้อความปุ่มที่ 2</label>
                <Input
                  value={form.button_text_2}
                  onChange={(e) => setForm({ ...form, button_text_2: e.target.value })}
                  placeholder="เช่น View Projects"
                />
              </div>
              <div>
                <label className="text-sm font-medium">ลิงก์ปุ่มที่ 2</label>
                <Input
                  value={form.button_link_2}
                  onChange={(e) => setForm({ ...form, button_link_2: e.target.value })}
                  placeholder="เช่น /projects"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">ลำดับการแสดง</label>
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant={form.is_active ? "default" : "outline"}
                  onClick={() => setForm({ ...form, is_active: !form.is_active })}
                >
                  {form.is_active ? "ใช้งาน" : "ไม่ใช้งาน"}
                </Button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                ยกเลิก
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


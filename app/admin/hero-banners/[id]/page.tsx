"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"

export default function EditHeroBannerPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params?.id)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
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

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`/api/admin/hero-banners/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || "ไม่พบข้อมูล")
        setForm({
          title: data.title || "",
          subtitle: data.subtitle || "",
          description: data.description || "",
          background_image: data.background_image || "",
          button_text: data.button_text || "",
          button_link: data.button_link || "",
          button_text_2: data.button_text_2 || "",
          button_link_2: data.button_link_2 || "",
          is_active: !!data.is_active,
          sort_order: data.sort_order || 0
        })
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [id])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/admin/hero-banners/${id}`, {
        method: "PUT",
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

  const remove = async () => {
    if (!confirm("ต้องการลบ Hero Banner นี้?")) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/hero-banners/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "ลบไม่สำเร็จ")
      router.replace("/admin/hero-banners")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-6">กำลังโหลด...</div>

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">แก้ไข Hero Banner</h1>
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
              <div className="flex items-end gap-2">
                <Button
                  type="button"
                  variant={form.is_active ? "default" : "outline"}
                  onClick={() => setForm({ ...form, is_active: !form.is_active })}
                >
                  {form.is_active ? "ใช้งาน" : "ไม่ใช้งาน"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="text-destructive"
                  onClick={remove}
                >
                  ลบ
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


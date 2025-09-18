"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"

export default function EditServicePage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params?.id)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ slug: "", title: "", summary: "", content: "", category: "solar", is_published: true, image_url: "" })

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`/api/admin/services/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || "ไม่พบข้อมูล")
        setForm({
          slug: data.slug || "",
          title: data.title || "",
          summary: data.summary || "",
          content: data.content || "",
          category: data.category || "solar",
          is_published: !!data.is_published,
          image_url: data.image_url || "",
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
      const res = await fetch(`/api/admin/services/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "ไม่สามารถบันทึกข้อมูลได้")
      router.replace("/admin/services")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const remove = async () => {
    if (!confirm("ต้องการลบรายการนี้?")) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error("ลบไม่สำเร็จ")
      router.replace("/admin/services")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-6">กำลังโหลด...</div>

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">แก้ไขบริการ</h1>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Slug</label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm">ชื่อบริการ</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm">หมวดหมู่</label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="เลือกหมวดหมู่" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solar">solar</SelectItem>
                    <SelectItem value="ev">ev</SelectItem>
                    <SelectItem value="maintenance">maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button type="button" variant={form.is_published ? "default" : "outline"} onClick={() => setForm({ ...form, is_published: !form.is_published })}>
                  {form.is_published ? "เผยแพร่" : "ร่าง"}
                </Button>
                <Button type="button" variant="outline" className="text-destructive" onClick={remove}>ลบ</Button>
              </div>
            </div>

            <div>
              <label className="text-sm">สรุป</label>
              <Textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
            </div>
            <div>
              <label className="text-sm">รูปภาพ</label>
              <FileUpload
                onUpload={(url, key) => setForm({ ...form, image_url: url })}
                folder="services"
                accept="image/*"
                className="mt-2"
              />
              {form.image_url && (
                <div className="mt-2">
                  <img src={form.image_url} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                </div>
              )}
            </div>
            <div>
              <label className="text-sm">เนื้อหา</label>
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="min-h-40" />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>{loading ? "กำลังบันทึก..." : "บันทึก"}</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>ยกเลิก</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}



"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params?.id)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    title: "",
    slug: "",
    client_name: "",
    location: "",
    capacity_kw: "",
    roi_months: "",
    description: "",
    featured_image: "",
    is_published: true,
  })

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`/api/admin/projects/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || "ไม่พบข้อมูล")
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          client_name: data.client_name || "",
          location: data.location || "",
          capacity_kw: data.capacity_kw ?? "",
          roi_months: data.roi_months ?? "",
          description: data.description || "",
          featured_image: data.featured_image || "",
          is_published: !!data.is_published,
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
      const body = {
        ...form,
        capacity_kw: form.capacity_kw ? Number(form.capacity_kw) : null,
        roi_months: form.roi_months ? Number(form.roi_months) : null,
      }
      const res = await fetch(`/api/admin/projects/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "ไม่สามารถบันทึกข้อมูลได้")
      router.replace("/admin/projects")
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
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error("ลบไม่สำเร็จ")
      router.replace("/admin/projects")
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
          <h1 className="text-2xl font-bold">แก้ไขโปรเจกต์</h1>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Slug</label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm">ชื่อโปรเจกต์</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm">ชื่อลูกค้า</label>
                <Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">สถานที่</label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">กำลังไฟ (kW)</label>
                <Input type="number" value={form.capacity_kw} onChange={(e) => setForm({ ...form, capacity_kw: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">คืนทุน (เดือน)</label>
                <Input type="number" value={form.roi_months} onChange={(e) => setForm({ ...form, roi_months: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">รูปภาพหลัก</label>
                <FileUpload
                  onUpload={(url, key) => setForm({ ...form, featured_image: url })}
                  folder="projects"
                  accept="image/*"
                  className="mt-2"
                />
                {form.featured_image && (
                  <div className="mt-2">
                    <img src={form.featured_image} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                  </div>
                )}
              </div>
              <div className="flex items-end gap-2">
                <Button type="button" variant={form.is_published ? "default" : "outline"} onClick={() => setForm({ ...form, is_published: !form.is_published })}>
                  {form.is_published ? "เผยแพร่" : "ร่าง"}
                </Button>
                <Button type="button" variant="outline" className="text-destructive" onClick={remove}>ลบ</Button>
              </div>
            </div>

            <div>
              <label className="text-sm">รายละเอียด</label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-40" />
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



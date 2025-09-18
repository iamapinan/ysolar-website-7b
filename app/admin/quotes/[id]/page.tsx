"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function EditQuotePage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params?.id)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [form, setForm] = useState<any>({ name: "", email: "", phone: "", service_type: null, monthly_bill: "", roof_area: "", details: "", status: "new", note: "", assignee: "" })

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`/api/admin/quotes/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || "ไม่พบข้อมูล")
        let meta = {}
        try { meta = data.meta ? JSON.parse(data.meta) : {} } catch {}
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          service_type: data.service_type || null,
          monthly_bill: data.monthly_bill ?? "",
          roof_area: data.roof_area ?? "",
          details: data.details || "",
          status: (meta as any).status || "new",
          note: (meta as any).note || "",
          assignee: (meta as any).assignee || "",
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
        monthly_bill: form.monthly_bill === "" ? null : Number(form.monthly_bill),
        roof_area: form.roof_area === "" ? null : Number(form.roof_area),
      }
      const res = await fetch(`/api/admin/quotes/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data?.error || "บันทึกไม่สำเร็จ")
      router.replace("/admin/quotes")
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
          <h1 className="text-2xl font-bold">จัดการใบเสนอราคา</h1>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm">ชื่อ</label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><label className="text-sm">อีเมล</label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div><label className="text-sm">โทรศัพท์</label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div>
                <label className="text-sm">ประเภทบริการ</label>
                <Select value={form.service_type ?? ""} onValueChange={(v) => setForm({ ...form, service_type: v || null })}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="เลือกประเภท" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">ไม่ระบุ</SelectItem>
                    <SelectItem value="solar">solar</SelectItem>
                    <SelectItem value="ev">ev</SelectItem>
                    <SelectItem value="maintenance">maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><label className="text-sm">ค่าไฟ/เดือน (บาท)</label><Input type="number" value={form.monthly_bill} onChange={(e) => setForm({ ...form, monthly_bill: e.target.value })} /></div>
              <div><label className="text-sm">พื้นที่หลังคา (ตร.ม.)</label><Input type="number" value={form.roof_area} onChange={(e) => setForm({ ...form, roof_area: e.target.value })} /></div>
              <div className="md:col-span-2">
                <label className="text-sm">รายละเอียด/ความต้องการ</label>
                <Textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="min-h-32" />
              </div>
              <div>
                <label className="text-sm">สถานะ</label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">new</SelectItem>
                    <SelectItem value="contacted">contacted</SelectItem>
                    <SelectItem value="in_progress">in_progress</SelectItem>
                    <SelectItem value="closed">closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><label className="text-sm">ผู้รับผิดชอบ</label><Input value={form.assignee} onChange={(e) => setForm({ ...form, assignee: e.target.value })} /></div>
              <div className="md:col-span-2"><label className="text-sm">บันทึก</label><Textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="min-h-24" /></div>
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



"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"

export default function EditTeamMemberPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params?.id)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ name: "", role: "", bio: "", photo_url: "" })

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`/api/admin/team/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || "ไม่พบข้อมูล")
        setForm({ name: data.name || "", role: data.role || "", bio: data.bio || "", photo_url: data.photo_url || "" })
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
      const res = await fetch(`/api/admin/team/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data?.error || "บันทึกไม่สำเร็จ")
      router.replace("/admin/team")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const remove = async () => {
    if (!confirm("ต้องการลบสมาชิกคนนี้?")) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error("ลบไม่สำเร็จ")
      router.replace("/admin/team")
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
          <h1 className="text-2xl font-bold">แก้ไขสมาชิกทีม</h1>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm">ชื่อ</label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div><label className="text-sm">ตำแหน่ง</label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
              <div className="md:col-span-2">
                <label className="text-sm">รูปภาพ</label>
                <FileUpload
                  onUpload={(url, key) => setForm({ ...form, photo_url: url })}
                  folder="team"
                  accept="image/*"
                  className="mt-2"
                />
                {form.photo_url && (
                  <div className="mt-2">
                    <img src={form.photo_url} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                  </div>
                )}
              </div>
              <div className="md:col-span-2"><label className="text-sm">ประวัติย่อ</label><Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="min-h-32" /></div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>{loading ? "กำลังบันทึก..." : "บันทึก"}</Button>
              <Button type="button" variant="outline" onClick={remove} className="text-destructive">ลบ</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>ยกเลิก</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}



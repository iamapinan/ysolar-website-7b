"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"
import { useRouter } from "next/navigation"

export default function NewTeamMemberPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", role: "", bio: "", photo_url: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "ไม่สามารถบันทึกข้อมูลได้")
      router.replace("/admin/team")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">เพิ่มสมาชิกทีม</h1>
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
              <Button type="button" variant="outline" onClick={() => router.back()}>ยกเลิก</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}



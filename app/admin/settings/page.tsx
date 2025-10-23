import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { getCompany, updateCompany } from "@/services/content.service"

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage() {
  const company = await getCompany()
  async function save(formData: FormData) {
    "use server"
    const payload: any = {}
    ;["name","legal_name","description","address","phone","email","website"].forEach((k) => {
      const v = formData.get(k)
      if (v !== null) payload[k] = String(v)
    })
    if (company?.id) {
      await updateCompany(company.id, payload)
    }
  }
  return (
    <div className="max-w-3xl">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">การตั้งค่าบริษัท</h1>
          <form action={save} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm">ชื่อบริษัท</label><Input name="name" defaultValue={company?.name || ""} /></div>
              <div><label className="text-sm">นิติบุคคล</label><Input name="legal_name" defaultValue={company?.legal_name || ""} /></div>
              <div className="md:col-span-2"><label className="text-sm">คำอธิบาย</label><Textarea name="description" defaultValue={company?.description || ""} /></div>
              <div className="md:col-span-2"><label className="text-sm">ที่อยู่</label><Textarea name="address" defaultValue={company?.address || ""} /></div>
              <div><label className="text-sm">โทรศัพท์</label><Input name="phone" defaultValue={company?.phone || ""} /></div>
              <div><label className="text-sm">อีเมล</label><Input name="email" defaultValue={company?.email || ""} /></div>
              <div className="md:col-span-2"><label className="text-sm">เว็บไซต์</label><Input name="website" defaultValue={company?.website || ""} /></div>
            </div>
            <Button type="submit">บันทึก</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}



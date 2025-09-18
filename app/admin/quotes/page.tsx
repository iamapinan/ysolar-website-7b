import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, MessageSquare } from "lucide-react"
import { getAllQuoteRequests } from "@/services/content.service"

interface QuotesPageProps {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}

async function QuotesList({ page = 1, search = "" }: { page: number; search: string }) {
  const { data: quotes, total, page: currentPage, limit } = await getAllQuoteRequests(page, 10, search)
  const totalPages = Math.ceil(total / limit)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>ใบเสนอราคา ({total} รายการ)</CardTitle>
          <div className="w-72">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="ค้นหาใบเสนอราคา..." defaultValue={search} className="pl-10" name="search" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ชื่อ</th>
                <th className="text-left p-2">อีเมล</th>
                <th className="text-left p-2">โทรศัพท์</th>
                <th className="text-left p-2">ประเภทบริการ</th>
                <th className="text-left p-2">ค่าไฟ/เดือน</th>
                <th className="text-left p-2">วันที่ส่ง</th>
                <th className="text-left p-2">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q: any) => (
                <tr key={q.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">{q.name}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground" />{q.email || '-'}</div>
                  </td>
                  <td className="p-2">
                    {q.phone ? <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground" />{q.phone}</div> : '-'}
                  </td>
                  <td className="p-2">{q.service_type ? <Badge variant="outline">{q.service_type}</Badge> : '-'}</td>
                  <td className="p-2">{q.monthly_bill ? `฿${Number(q.monthly_bill).toLocaleString()}` : '-'}</td>
                  <td className="p-2 text-sm text-muted-foreground">{new Date(q.created_at).toLocaleDateString('th-TH')}</td>
                  <td className="p-2">
                    <Button size="sm" variant="outline"><MessageSquare className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outline" size="sm" disabled={currentPage === 1}>ก่อนหน้า</Button>
            <span className="px-4 py-2 text-sm">หน้า {currentPage} จาก {totalPages}</span>
            <Button variant="outline" size="sm" disabled={currentPage === totalPages}>ถัดไป</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default async function AdminQuotesPage({ searchParams }: QuotesPageProps) {
  const sp = await searchParams
  const page = parseInt(sp.page || "1")
  const search = sp.search || ""
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">จัดการใบเสนอราคา</h1>
        <p className="text-muted-foreground">ดูและติดตามคำขอใบเสนอราคาจากลูกค้า</p>
      </div>
      <Suspense fallback={<div>กำลังโหลด...</div>}>
        <QuotesList page={page} search={search} />
      </Suspense>
    </div>
  )
}



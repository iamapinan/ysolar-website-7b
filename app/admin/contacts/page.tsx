import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, MessageSquare, Trash2 } from "lucide-react"
import { getAllContacts, getAllQuoteRequests } from "@/services/content.service"

interface ContactsPageProps {
  searchParams: Promise<{
    page?: string
    search?: string
    tab?: string
  }>
}

async function ContactsList({ page = 1, search = "" }: { page: number; search: string }) {
  const { data: contacts, total, page: currentPage, limit } = await getAllContacts(page, 10, search)
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="ค้นหาข้อมูลติดต่อ..."
              defaultValue={search}
              className="pl-10"
              name="search"
            />
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการติดต่อ ({total} รายการ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ชื่อ</th>
                  <th className="text-left p-2">อีเมล</th>
                  <th className="text-left p-2">โทรศัพท์</th>
                  <th className="text-left p-2">หัวข้อ</th>
                  <th className="text-left p-2">วันที่ส่ง</th>
                  <th className="text-left p-2">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact: any) => (
                  <tr key={contact.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{contact.name}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {contact.email}
                      </div>
                    </td>
                    <td className="p-2">
                      {contact.phone ? (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          {contact.phone}
                        </div>
                      ) : "-"}
                    </td>
                    <td className="p-2">
                      {contact.subject ? (
                        <Badge variant="outline">{contact.subject}</Badge>
                      ) : "-"}
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {new Date(contact.created_at).toLocaleDateString('th-TH')}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={currentPage === 1}>
                ก่อนหน้า
              </Button>
              <span className="px-4 py-2 text-sm">
                หน้า {currentPage} จาก {totalPages}
              </span>
              <Button variant="outline" size="sm" disabled={currentPage === totalPages}>
                ถัดไป
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

async function QuoteRequestsList({ page = 1, search = "" }: { page: number; search: string }) {
  const { data: quotes, total, page: currentPage, limit } = await getAllQuoteRequests(page, 10, search)
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="ค้นหาข้อมูลใบเสนอราคา..."
              defaultValue={search}
              className="pl-10"
              name="search"
            />
          </div>
        </div>
      </div>

      {/* Quote Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการใบเสนอราคา ({total} รายการ)</CardTitle>
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
                {quotes.map((quote: any) => (
                  <tr key={quote.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{quote.name}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {quote.email || "-"}
                      </div>
                    </td>
                    <td className="p-2">
                      {quote.phone ? (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          {quote.phone}
                        </div>
                      ) : "-"}
                    </td>
                    <td className="p-2">
                      {quote.service_type ? (
                        <Badge variant="outline">{quote.service_type}</Badge>
                      ) : "-"}
                    </td>
                    <td className="p-2">
                      {quote.monthly_bill ? `฿${quote.monthly_bill.toLocaleString()}` : "-"}
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {new Date(quote.created_at).toLocaleDateString('th-TH')}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={currentPage === 1}>
                ก่อนหน้า
              </Button>
              <span className="px-4 py-2 text-sm">
                หน้า {currentPage} จาก {totalPages}
              </span>
              <Button variant="outline" size="sm" disabled={currentPage === totalPages}>
                ถัดไป
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default async function AdminContactsPage({ searchParams }: ContactsPageProps) {
  const sp = await searchParams
  const page = parseInt(sp.page || "1")
  const search = sp.search || ""
  const tab = sp.tab || "contacts"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">จัดการข้อมูลติดต่อ</h1>
        <p className="text-muted-foreground">จัดการข้อมูลติดต่อและใบเสนอราคาจากลูกค้า</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button variant={tab === "contacts" ? "default" : "outline"} asChild>
          <a href="?tab=contacts">ข้อมูลติดต่อ</a>
        </Button>
        <Button variant={tab === "quotes" ? "default" : "outline"} asChild>
          <a href="?tab=quotes">ใบเสนอราคา</a>
        </Button>
      </div>

      <Suspense fallback={<div>กำลังโหลด...</div>}>
        {tab === "contacts" ? (
          <ContactsList page={page} search={search} />
        ) : (
          <QuoteRequestsList page={page} search={search} />
        )}
      </Suspense>
    </div>
  )
}
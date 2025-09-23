import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { getAllServices } from "@/services/content.service"
import { RowActions } from "@/components/admin/row-actions"

interface ServicesPageProps {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}

async function ServicesList({ page = 1, search = "" }: { page: number; search: string }) {
  const { data: services, total, page: currentPage, limit } = await getAllServices(page, 10, search)
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="ค้นหาบริการ..."
              defaultValue={search}
              className="pl-10"
              name="search"
            />
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="w-4 h-4 mr-2" />
            เพิ่มบริการ
          </Link>
        </Button>
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการบริการ ({total} รายการ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ชื่อบริการ</th>
                  <th className="text-left p-2">หมวดหมู่</th>
                  <th className="text-left p-2">สถานะ</th>
                  <th className="text-left p-2">วันที่สร้าง</th>
                  <th className="text-left p-2">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service: any) => (
                  <tr key={service.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{service.title}</div>
                        <div className="text-sm text-muted-foreground">{service.slug}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline">{service.category}</Badge>
                    </td>
                    <td className="p-2">
                      <Badge variant={service.is_published ? "default" : "secondary"}>
                        {service.is_published ? "เผยแพร่" : "ร่าง"}
                      </Badge>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {new Date(service.created_at).toLocaleDateString('th-TH')}
                    </td>
                    <td className="p-2">
                      <RowActions kind="services" id={service.id} isPublished={!!service.is_published} />
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

export default async function AdminServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || "1")
  const search = params.search || ""

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">จัดการบริการ</h1>
        <p className="text-muted-foreground">จัดการข้อมูลบริการของบริษัท</p>
      </div>

      <Suspense fallback={<div>กำลังโหลด...</div>}>
        <ServicesList page={page} search={search} />
      </Suspense>
    </div>
  )
}
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { getAllTeamMembers } from "@/services/content.service"
export const dynamic = 'force-dynamic'
import { RowActions } from "@/components/admin/row-actions"

interface TeamPageProps {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}

async function TeamList({ page = 1, search = "" }: { page: number; search: string }) {
  const { data: members, total, page: currentPage, limit } = await getAllTeamMembers(page, 10, search)
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="ค้นหาทีม..."
              defaultValue={search}
              className="pl-10"
              name="search"
            />
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/team/new">
            <Plus className="w-4 h-4 mr-2" />
            เพิ่มสมาชิกทีม
          </Link>
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>ทีม ({total} คน)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ชื่อ</th>
                  <th className="text-left p-2">ตำแหน่ง</th>
                  <th className="text-left p-2">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m: any) => (
                  <tr key={m.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{m.name}</td>
                    <td className="p-2">
                      <Badge variant="outline">{m.role || '-'}</Badge>
                    </td>
                    <td className="p-2">
                      <RowActions kind="team" id={m.id} />
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
    </div>
  )
}

export default async function AdminTeamPage({ searchParams }: TeamPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || "1")
  const search = params.search || ""
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">จัดการทีม</h1>
        <p className="text-muted-foreground">จัดการข้อมูลสมาชิกทีม</p>
      </div>
      <Suspense fallback={<div>กำลังโหลด...</div>}>
        <TeamList page={page} search={search} />
      </Suspense>
    </div>
  )
}



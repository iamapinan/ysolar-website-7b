"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RowActions } from "@/components/admin/row-actions"
import { Plus, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

interface HeroBanner {
  id: number
  title: string
  subtitle: string
  description: string
  background_image: string
  button_text: string
  button_link: string
  button_text_2: string
  button_link_2: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export default function HeroBannersPage() {
  const [banners, setBanners] = useState<HeroBanner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/admin/hero-banners")
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || "ไม่สามารถโหลดข้อมูลได้")
        setBanners(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBanners()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบ Hero Banner นี้?")) return
    try {
      const res = await fetch(`/api/admin/hero-banners/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "ลบไม่สำเร็จ")
      setBanners(prev => prev.filter(banner => banner.id !== id))
    } catch (e: any) {
      setError(e.message)
    }
  }

  if (loading) return <div className="p-6">กำลังโหลด...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hero Banners</h1>
        <Link href="/admin/hero-banners/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            เพิ่ม Hero Banner
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {banners.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              ยังไม่มี Hero Banner
            </CardContent>
          </Card>
        ) : (
          banners.map((banner) => (
            <Card key={banner.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Image Preview */}
                  <div className="w-48 h-32 bg-muted flex items-center justify-center">
                    {banner.background_image ? (
                      <img 
                        src={banner.background_image} 
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{banner.title}</h3>
                        <p className="text-muted-foreground">{banner.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={banner.is_active ? "default" : "secondary"}>
                          {banner.is_active ? "ใช้งาน" : "ไม่ใช้งาน"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          ลำดับ: {banner.sort_order}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {banner.description}
                    </p>
                    
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      {banner.button_text && (
                        <span>ปุ่ม 1: {banner.button_text}</span>
                      )}
                      {banner.button_text_2 && (
                        <span>ปุ่ม 2: {banner.button_text_2}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="p-6 flex items-center">
                    <RowActions
                      onEdit={`/admin/hero-banners/${banner.id}`}
                      onDelete={() => handleDelete(banner.id)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}


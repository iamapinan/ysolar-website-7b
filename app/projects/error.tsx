"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Projects page error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            เกิดข้อผิดพลาด
          </h1>
          <h2 className="text-2xl lg:text-3xl font-bold text-muted-foreground mb-6">
            Something went wrong
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ขออภัยในความไม่สะดวก เกิดข้อผิดพลาดในการโหลดข้อมูลโปรเจค
          </p>
        </div>
      </section>

      {/* Error Details */}
      <section className="py-16 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  ไม่สามารถโหลดข้อมูลโปรเจคได้
                </h3>
                <p className="text-muted-foreground">
                  อาจเกิดจากปัญหาการเชื่อมต่อหรือข้อผิดพลาดของระบบ กรุณาลองใหม่อีกครั้ง
                </p>
                
                {process.env.NODE_ENV === "development" && (
                  <details className="text-left">
                    <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                      รายละเอียดข้อผิดพลาด (Development only)
                    </summary>
                    <pre className="mt-2 p-4 bg-red-100 rounded text-xs overflow-auto">
                      {error.message}
                      {error.digest && `\nDigest: ${error.digest}`}
                    </pre>
                  </details>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={reset} size="lg" className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  ลองใหม่อีกครั้ง
                </Button>
                <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
                  <Link href="/">
                    <Home className="w-5 h-5" />
                    กลับหน้าหลัก
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Alternative Actions */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            ในขณะนี้คุณสามารถ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold mb-2">ดูบริการของเรา</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  เรียนรู้เกี่ยวกับบริการโซลาร์และ EV ของเรา
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/services">ดูบริการ</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold mb-2">อ่านข่าวสาร</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  ติดตามข่าวสารและความรู้ใหม่ๆ
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/news">อ่านข่าวสาร</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold mb-2">ติดต่อเรา</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  สอบถามข้อมูลเพิ่มเติมหรือขอใบเสนอราคา
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/contact">ติดต่อเรา</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

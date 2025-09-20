import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ArrowLeft, Home, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Search className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            ไม่พบโปรเจค
          </h1>
          <h2 className="text-2xl lg:text-3xl font-bold text-muted-foreground mb-6">
            Project Not Found
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ขออภัย เราไม่พบโปรเจคที่คุณกำลังมองหา อาจเป็นเพราะลิงก์ผิดพลาดหรือโปรเจคถูกลบไปแล้ว
          </p>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-16 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  โปรเจคที่คุณมองหาอาจจะ...
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="p-4 bg-background rounded-lg">
                    <p>• ถูกเปลี่ยนชื่อหรือย้ายไปแล้ว</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p>• ยังไม่ได้เผยแพร่สู่สาธารณะ</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p>• URL ที่คุณพิมพ์อาจผิดพลาด</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="flex items-center gap-2">
                  <Link href="/projects">
                    <ArrowLeft className="w-5 h-5" />
                    ดูโปรเจคทั้งหมด
                  </Link>
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

      {/* Suggestions Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            สิ่งที่คุณสามารถทำได้
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">ค้นหาโปรเจค</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  ใช้ระบบค้นหาเพื่อหาโปรเจคที่คุณสนใจ
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/projects">ค้นหาโปรเจค</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">ดูบริการของเรา</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  เรียนรู้เกี่ยวกับบริการโซลาร์และ EV
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/services">ดูบริการ</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">ติดต่อเรา</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  สอบถามข้อมูลเพิ่มเติมหรือขอคำปรึกษา
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

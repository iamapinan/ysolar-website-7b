import Link from "next/link"
import Image from "next/image"
import { Facebook, MessageCircle, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="Y Solar" width={32} height={32} className="rounded" />
              <span className="text-xl font-bold">Y Solar</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Comprehensive solar cell system design, installation, and distribution services provider in Thailand.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/profile.php?id=61580790103820" className="text-muted-foreground hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-primary">
                  Solar Rooftop
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary">
                  EV Chargers
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary">
                  Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-primary">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="tel:0816526141" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+66-81-6526141</span>
              </a>
              <a href="mailto:yod@ysolar.co.th" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>yod@ysolar.co.th</span>
              </a>
              <a href="https://maps.app.goo.gl/eYNaSW7ohCsPrHs78" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>282/4 หมู่ที่ 18 ตำบลพระลับ อำเภอเมืองขอนแก่น จังหวัดขอนแก่น</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 YSolar CO.,Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

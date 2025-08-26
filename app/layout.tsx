import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Y Solar - Clean Energy Solutions | โซลูชันพลังงานสะอาด",
  description:
    "Leading provider of solar rooftop systems and EV charging solutions in Thailand | ผู้นำด้านระบบโซลาร์รูฟท็อปและโซลูชันการชาร์จรถยนต์ไฟฟ้าในประเทศไทย",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

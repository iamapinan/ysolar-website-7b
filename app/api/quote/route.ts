import { type NextRequest, NextResponse } from "next/server"
import { createQuoteRequest } from "@/services/content.service"

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, serviceType, projectSize, budget, timeline, message } = body

    // Validate required fields
    if (!name || !email || !phone || !serviceType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const normalizeServiceType = (v?: string): 'solar' | 'ev' | 'maintenance' | null => {
      const s = (v || '').toLowerCase()
      if (["solar","solar-rooftop","rooftop","solar_rooftop","solarroof"].includes(s)) return 'solar'
      if (["ev","ev-charger","charger","ev_charger","evcharger"].includes(s)) return 'ev'
      if (["maintenance","maintain","m&a","after-sale","after_sales"].includes(s)) return 'maintenance'
      return null
    }

    await createQuoteRequest({
      name,
      email,
      phone,
      service_type: normalizeServiceType(serviceType) ?? null,
      details: message,
      meta: { company, projectSize, budget, timeline },
    })

    return NextResponse.json({ message: "Quote request submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Quote request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

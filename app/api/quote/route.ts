import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, serviceType, projectSize, budget, timeline, message } = body

    // Validate required fields
    if (!name || !email || !phone || !serviceType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, you would save this to your database
    console.log("Quote request submission:", {
      name,
      email,
      phone,
      company,
      serviceType,
      projectSize,
      budget,
      timeline,
      message,
      submittedAt: new Date().toISOString(),
    })

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification to sales team
    // 3. Create lead in CRM
    // 4. Send confirmation email to customer

    return NextResponse.json({ message: "Quote request submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Quote request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

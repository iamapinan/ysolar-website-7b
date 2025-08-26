import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, type = "contact" } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, you would save this to your database
    // For now, we'll just log it and return success
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      company,
      message,
      type,
      submittedAt: new Date().toISOString(),
    })

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system

    return NextResponse.json({ message: "Contact form submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

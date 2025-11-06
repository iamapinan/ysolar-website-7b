import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { createHash } from "crypto"

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { email, newPassword, secretKey } = await req.json()
    
    // ตรวจสอบ secret key (ควรเก็บใน environment variable)
    const requiredSecretKey = process.env.RESET_PASSWORD_SECRET || 'reset-secret-change-me'
    if (secretKey !== requiredSecretKey) {
      return NextResponse.json({ error: "Invalid secret key" }, { status: 401 })
    }
    
    if (!email || !newPassword) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }
    
    // Hash password ใหม่ด้วยวิธีเดียวกับ auth-server.ts
    const PASSWORD_SALT = process.env.PASSWORD_SALT || 'dev_salt'
    const hashedPassword = createHash('sha256')
      .update(newPassword + PASSWORD_SALT)
      .digest('hex')
    
    // ตรวจสอบว่ามี user นี้อยู่หรือไม่
    const [users]: any = await query(
      'SELECT id, email, name FROM users WHERE email = ? LIMIT 1',
      [email]
    )
    
    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    // อัปเดตรหัสผ่าน
    await query(
      'UPDATE users SET password_hash = ?, updated_at = NOW() WHERE email = ?',
      [hashedPassword, email]
    )
    
    return NextResponse.json({ 
      success: true, 
      message: `Password reset successfully for ${email}` 
    })
    
  } catch (error: any) {
    console.error("Reset password error:", error)
    return NextResponse.json({ 
      error: "Server error", 
      details: error.message 
    }, { status: 500 })
  }
}


// ใช้ lib/db.ts และ lib/auth-server.ts ของ Next.js
// รันด้วย: node --loader ts-node/esm scripts/reset-password-using-lib.js
// หรือใช้ tsx: npx tsx scripts/reset-password-using-lib.js

const { query } = require('../lib/db.ts')
const { createHash } = require('crypto')

const EMAIL = 'admin@ysolar.com'
const NEW_PASSWORD = 'admin123' // เปลี่ยนรหัสผ่านใหม่ที่นี่

async function resetPassword() {
  try {
    const PASSWORD_SALT = process.env.PASSWORD_SALT || 'dev_salt'
    
    console.log('กำลัง hash รหัสผ่าน...')
    const hashedPassword = createHash('sha256')
      .update(NEW_PASSWORD + PASSWORD_SALT)
      .digest('hex')
    
    console.log('กำลังตรวจสอบผู้ใช้...')
    const [users] = await query(
      'SELECT id, email, name FROM users WHERE email = ? LIMIT 1',
      [EMAIL]
    )
    
    if (users.length === 0) {
      console.error(`❌ ไม่พบผู้ใช้ ${EMAIL} ในฐานข้อมูล`)
      process.exit(1)
    }
    
    console.log('กำลังอัปเดตรหัสผ่าน...')
    await query(
      'UPDATE users SET password_hash = ?, updated_at = NOW() WHERE email = ?',
      [hashedPassword, EMAIL]
    )
    
    console.log(`✅ รีเซ็ตรหัสผ่านสำหรับ ${EMAIL} สำเร็จแล้ว!`)
    console.log(`📧 อีเมล: ${EMAIL}`)
    console.log(`🔑 รหัสผ่านใหม่: ${NEW_PASSWORD}`)
    console.log(`⚠️  กรุณาเปลี่ยนรหัสผ่านหลังจากล็อกอินครั้งแรก`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message || error.toString())
    console.error('Stack:', error.stack)
    process.exit(1)
  }
}

resetPassword()


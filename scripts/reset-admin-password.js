const mysql = require('mysql2/promise')
const { createHash } = require('crypto')
const fs = require('fs')
const path = require('path')

// อ่านไฟล์ env
function loadEnvFile(filePath) {
  const env = {}
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8')
    content.split('\n').forEach(line => {
      const trimmed = line.trim()
      // ข้าม comment และบรรทัดว่าง
      if (trimmed && !trimmed.startsWith('#')) {
        const match = trimmed.match(/^([^=]+)=(.*)$/)
        if (match) {
          const key = match[1].trim()
          let value = match[2].trim()
          // ลบ quotes ถ้ามี
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          env[key] = value
        }
      }
    })
  }
  return env
}

function loadEnv() {
  const rootDir = path.join(__dirname, '..')
  // อ่าน .env ก่อน
  const env = loadEnvFile(path.join(rootDir, '.env'))
  // อ่าน env-local แล้ว override
  const envLocal = loadEnvFile(path.join(rootDir, 'env-local'))
  // รวมกัน env-local จะ override .env
  Object.assign(process.env, env, envLocal)
}

loadEnv()

const EMAIL = 'admin@ysolar.com'
const NEW_PASSWORD = 'admin123' // เปลี่ยนรหัสผ่านใหม่ที่นี่

async function resetPassword() {
  let connection
  
  try {
    const {
      DB_HOST,
      DB_PORT,
      DB_USER,
      DB_PASSWORD: DB_PASS,
      DB_NAME,
      DATABASE_URL,
      PASSWORD_SALT = 'dev_salt'
    } = process.env

    console.log('กำลังเชื่อมต่อฐานข้อมูล...')
    console.log('DATABASE_URL:', DATABASE_URL ? 'มี' : 'ไม่มี')
    console.log('DB_HOST:', DB_HOST || 'ไม่ระบุ')

    // สร้าง connection
    if (DATABASE_URL) {
      // แปลง mariadb:// เป็น mysql:// สำหรับ mysql2
      const mysqlUrl = DATABASE_URL.replace(/^mariadb:/, 'mysql:')
      connection = await mysql.createConnection(mysqlUrl)
    } else {
      connection = await mysql.createConnection({
        host: DB_HOST || 'localhost',
        port: DB_PORT ? Number(DB_PORT) : 3306,
        user: DB_USER || 'root',
        password: DB_PASS || '',
        database: DB_NAME || 'ysolar',
        charset: 'utf8mb4'
      })
    }
    
    console.log('เชื่อมต่อฐานข้อมูลสำเร็จ')

    // Hash password ใหม่ด้วยวิธีเดียวกับ auth-server.ts
    const hashedPassword = createHash('sha256')
      .update(NEW_PASSWORD + PASSWORD_SALT)
      .digest('hex')

    // ตรวจสอบว่ามี user นี้อยู่หรือไม่
    const [users] = await connection.execute(
      'SELECT id, email, name FROM users WHERE email = ?',
      [EMAIL]
    )

    if (users.length === 0) {
      console.error(`ไม่พบผู้ใช้ ${EMAIL} ในฐานข้อมูล`)
      process.exit(1)
    }

    // อัปเดตรหัสผ่าน
    await connection.execute(
      'UPDATE users SET password_hash = ?, updated_at = NOW() WHERE email = ?',
      [hashedPassword, EMAIL]
    )

    console.log(`✅ รีเซ็ตรหัสผ่านสำหรับ ${EMAIL} สำเร็จแล้ว!`)
    console.log(`📧 อีเมล: ${EMAIL}`)
    console.log(`🔑 รหัสผ่านใหม่: ${NEW_PASSWORD}`)
    console.log(`⚠️  กรุณาเปลี่ยนรหัสผ่านหลังจากล็อกอินครั้งแรก`)

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message || error.toString())
    console.error('Stack:', error.stack)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

resetPassword()


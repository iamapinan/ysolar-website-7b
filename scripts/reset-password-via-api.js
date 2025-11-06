const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')

// อ่านไฟล์ env
function loadEnvFile(filePath) {
  const env = {}
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8')
    content.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const match = trimmed.match(/^([^=]+)=(.*)$/)
        if (match) {
          const key = match[1].trim()
          let value = match[2].trim()
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
  const env = loadEnvFile(path.join(rootDir, '.env'))
  const envLocal = loadEnvFile(path.join(rootDir, 'env-local'))
  Object.assign(process.env, env, envLocal)
}

loadEnv()

const EMAIL = 'admin@ysolar.com'
const NEW_PASSWORD = 'admin123' // เปลี่ยนรหัสผ่านใหม่ที่นี่
const SECRET_KEY = process.env.RESET_PASSWORD_SECRET || 'reset-secret-change-me'
const API_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

async function resetPassword() {
  try {
    const url = new URL(`${API_URL}/api/admin/reset-password`)
    const isHttps = url.protocol === 'https:'
    const client = isHttps ? https : http
    
    const postData = JSON.stringify({
      email: EMAIL,
      newPassword: NEW_PASSWORD,
      secretKey: SECRET_KEY
    })
    
    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
    
    console.log('กำลังเรียก API เพื่อรีเซ็ตรหัสผ่าน...')
    console.log(`URL: ${url.toString()}`)
    console.log(`Email: ${EMAIL}`)
    
    return new Promise((resolve, reject) => {
      const req = client.request(options, (res) => {
        let data = ''
        
        res.on('data', (chunk) => {
          data += chunk
        })
        
        res.on('end', () => {
          try {
            const result = JSON.parse(data)
            if (res.statusCode === 200) {
              console.log('✅ รีเซ็ตรหัสผ่านสำเร็จ!')
              console.log(`📧 อีเมล: ${EMAIL}`)
              console.log(`🔑 รหัสผ่านใหม่: ${NEW_PASSWORD}`)
              console.log(`⚠️  กรุณาเปลี่ยนรหัสผ่านหลังจากล็อกอินครั้งแรก`)
              resolve(result)
            } else {
              console.error('❌ เกิดข้อผิดพลาด:', result.error || result.message)
              reject(new Error(result.error || result.message))
            }
          } catch (e) {
            console.error('❌ ไม่สามารถ parse response ได้:', data)
            reject(e)
          }
        })
      })
      
      req.on('error', (error) => {
        console.error('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ:', error.message)
        console.error('💡 ตรวจสอบว่า Next.js server กำลังรันอยู่หรือไม่')
        console.error('   รันคำสั่ง: npm run dev')
        reject(error)
      })
      
      req.write(postData)
      req.end()
    })
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message)
    process.exit(1)
  }
}

resetPassword()


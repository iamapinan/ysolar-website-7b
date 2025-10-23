import { query } from "@/lib/db"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev_secret_change_me")
const COOKIE_NAME = "ysolar_admin_token"
const ONE_DAY = 60 * 60 * 24

// Use Web Crypto API instead of Node.js crypto for Edge Runtime compatibility
async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + salt)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyUser(email: string, password: string) {
  const [rows]: any = await query("SELECT id, email, password_hash, name, role FROM users WHERE email = ? LIMIT 1", [email])
  const user = rows?.[0]
  if (!user) return null
  
  // Use Web Crypto API for password verification
  const hashedPassword = await hashPassword(password, process.env.PASSWORD_SALT || 'dev_salt')
  
  if (hashedPassword !== user.password_hash) return null
  return { id: user.id, email: user.email, name: user.name, role: user.role }
}

export async function createSession(user: { id: number; email: string; role: string }) {
  const token = await new SignJWT({ sub: String(user.id), email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${ONE_DAY}s`)
    .setIssuedAt()
    .sign(JWT_SECRET)
  return token
}

export async function getSession(token: string | undefined) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as any
  } catch {
    return null
  }
}

export { COOKIE_NAME }



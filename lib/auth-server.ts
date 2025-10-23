import { query } from "@/lib/db"
import { SignJWT, jwtVerify } from "jose"
import { createHash } from "crypto"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev_secret_change_me")
const COOKIE_NAME = "ysolar_admin_token"
const ONE_DAY = 60 * 60 * 24

export async function verifyUser(email: string, password: string) {
  const [rows]: any = await query("SELECT id, email, password_hash, name, role FROM users WHERE email = ? LIMIT 1", [email])
  const user = rows?.[0]
  if (!user) return null
  
  // Use Node.js crypto for server-side authentication
  const hashedPassword = createHash('sha256').update(password + (process.env.PASSWORD_SALT || 'dev_salt')).digest('hex')
  
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

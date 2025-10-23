import mysql from "mysql2/promise"

let pool: mysql.Pool | null = null

export function getDbPool() {
  if (!pool) {
    const {
      DB_HOST,
      DB_PORT,
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      DATABASE_URL,
    } = process.env as Record<string, string | undefined>

    // console.log("DB Config:", { 
    //   hasUrl: !!DATABASE_URL, 
    //   host: DB_HOST, 
    //   port: DB_PORT, 
    //   user: DB_USER, 
    //   hasPassword: !!DB_PASSWORD, 
    //   database: DB_NAME 
    // })

    if (DATABASE_URL) {
      pool = mysql.createPool({ uri: DATABASE_URL, connectionLimit: 10 })
    } else {
      pool = mysql.createPool({
        host: DB_HOST || "localhost",
        port: DB_PORT ? Number(DB_PORT) : 3306,
        user: DB_USER || "root",
        password: DB_PASSWORD || "",
        database: DB_NAME || "ysolar",
        connectionLimit: 10,
        charset: "utf8mb4_unicode_ci",
      })
    }
  }
  return pool
}

export async function query(sql: string, params?: any[]): Promise<[any, mysql.FieldPacket[]]> {
  const p = getDbPool()
  return p.query(sql, params)
}

// Export db for direct use
export const db = {
  execute: query,
  query: query
}



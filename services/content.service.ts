import { query } from "@/lib/db"

export async function getPublishedServices() {
  const [rows] = await query(
    "SELECT id, slug, title, summary, category FROM services WHERE is_published = 1 ORDER BY id DESC"
  )
  return rows as Array<{ id: number; slug: string; title: string; summary: string; category: string }>
}

export async function getLatestArticles(limit = 6) {
  const [rows] = await query(
    "SELECT id, slug, title, summary, category, published_at FROM articles WHERE is_published = 1 ORDER BY published_at DESC LIMIT ?",
    [limit]
  )
  return rows as Array<{ id: number; slug: string; title: string; summary: string; category: string; published_at: string }>
}

export async function createContact(payload: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  meta?: any
}) {
  const [result] = await query(
    "INSERT INTO contacts (name, email, phone, subject, message, meta) VALUES (?,?,?,?,?,?)",
    [payload.name, payload.email, payload.phone || null, payload.subject || null, payload.message, JSON.stringify(payload.meta || null)]
  )
  // @ts-ignore
  return result.insertId as number
}

export async function createQuoteRequest(payload: {
  name: string
  email?: string
  phone?: string
  service_type?: string
  monthly_bill?: number
  roof_area?: number
  details?: string
  meta?: any
}) {
  const [result] = await query(
    "INSERT INTO quote_requests (name, email, phone, service_type, monthly_bill, roof_area, details, meta) VALUES (?,?,?,?,?,?,?,?)",
    [
      payload.name,
      payload.email || null,
      payload.phone || null,
      payload.service_type || null,
      payload.monthly_bill ?? null,
      payload.roof_area ?? null,
      payload.details || null,
      JSON.stringify(payload.meta || null),
    ]
  )
  // @ts-ignore
  return result.insertId as number
}

// Services CRUD
export async function getAllServices(page = 1, limit = 10, search = "") {
  const offset = (page - 1) * limit
  let whereClause = ""
  let params: any[] = []
  
  if (search) {
    whereClause = "WHERE title LIKE ? OR summary LIKE ?"
    params = [`%${search}%`, `%${search}%`]
  }
  
  const [rows] = await query(
    `SELECT id, slug, title, summary, category, is_published, created_at, updated_at FROM services ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  )
  
  const [[{ count }]]: any = await query(
    `SELECT COUNT(*) as count FROM services ${whereClause}`,
    params
  )
  
  return { data: rows, total: count, page, limit }
}

export async function getServiceById(id: number) {
  const [rows] = await query("SELECT * FROM services WHERE id = ?", [id])
  return rows?.[0] || null
}

export async function createService(payload: {
  slug: string
  title: string
  summary?: string
  content?: string
  category: string
  is_published?: boolean
}) {
  const [result] = await query(
    "INSERT INTO services (slug, title, summary, content, category, is_published) VALUES (?,?,?,?,?,?)",
    [payload.slug, payload.title, payload.summary || null, payload.content || null, payload.category, payload.is_published ? 1 : 0]
  )
  // @ts-ignore
  return result.insertId as number
}

export async function updateService(id: number, payload: {
  slug?: string
  title?: string
  summary?: string
  content?: string
  category?: string
  is_published?: boolean
}) {
  const fields = []
  const values = []
  
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`)
      values.push(key === 'is_published' ? (value ? 1 : 0) : value)
    }
  })
  
  if (fields.length === 0) return false
  
  values.push(id)
  await query(`UPDATE services SET ${fields.join(', ')} WHERE id = ?`, values)
  return true
}

export async function deleteService(id: number) {
  const [result] = await query("DELETE FROM services WHERE id = ?", [id])
  // @ts-ignore
  return result.affectedRows > 0
}

// Projects CRUD
export async function getAllProjects(page = 1, limit = 10, search = "") {
  const offset = (page - 1) * limit
  let whereClause = ""
  let params: any[] = []
  
  if (search) {
    whereClause = "WHERE title LIKE ? OR client_name LIKE ? OR location LIKE ?"
    params = [`%${search}%`, `%${search}%`, `%${search}%`]
  }
  
  const [rows] = await query(
    `SELECT id, title, slug, client_name, location, capacity_kw, roi_months, description, featured_image, is_published, created_at, updated_at FROM projects ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  )
  
  const [[{ count }]]: any = await query(
    `SELECT COUNT(*) as count FROM projects ${whereClause}`,
    params
  )
  
  return { data: rows, total: count, page, limit }
}

export async function getProjectById(id: number) {
  const [rows] = await query("SELECT * FROM projects WHERE id = ?", [id])
  return rows?.[0] || null
}

export async function createProject(payload: {
  title: string
  slug: string
  client_name?: string
  location?: string
  capacity_kw?: number
  roi_months?: number
  description?: string
  featured_image?: string
  is_published?: boolean
}) {
  const [result] = await query(
    "INSERT INTO projects (title, slug, client_name, location, capacity_kw, roi_months, description, featured_image, is_published) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      payload.title, payload.slug, payload.client_name || null, payload.location || null,
      payload.capacity_kw || null, payload.roi_months || null, payload.description || null,
      payload.featured_image || null, payload.is_published ? 1 : 0
    ]
  )
  // @ts-ignore
  return result.insertId as number
}

export async function updateProject(id: number, payload: {
  title?: string
  slug?: string
  client_name?: string
  location?: string
  capacity_kw?: number
  roi_months?: number
  description?: string
  featured_image?: string
  is_published?: boolean
}) {
  const fields = []
  const values = []
  
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`)
      values.push(key === 'is_published' ? (value ? 1 : 0) : value)
    }
  })
  
  if (fields.length === 0) return false
  
  values.push(id)
  await query(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`, values)
  return true
}

export async function deleteProject(id: number) {
  const [result] = await query("DELETE FROM projects WHERE id = ?", [id])
  // @ts-ignore
  return result.affectedRows > 0
}

// Contacts & Quote Requests
export async function getAllContacts(page = 1, limit = 10, search = "") {
  const offset = (page - 1) * limit
  let whereClause = ""
  let params: any[] = []
  
  if (search) {
    whereClause = "WHERE name LIKE ? OR email LIKE ? OR subject LIKE ?"
    params = [`%${search}%`, `%${search}%`, `%${search}%`]
  }
  
  const [rows] = await query(
    `SELECT id, name, email, phone, subject, message, created_at FROM contacts ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  )
  
  const [[{ count }]]: any = await query(
    `SELECT COUNT(*) as count FROM contacts ${whereClause}`,
    params
  )
  
  return { data: rows, total: count, page, limit }
}

export async function getAllQuoteRequests(page = 1, limit = 10, search = "") {
  const offset = (page - 1) * limit
  let whereClause = ""
  let params: any[] = []
  
  if (search) {
    whereClause = "WHERE name LIKE ? OR email LIKE ? OR service_type LIKE ?"
    params = [`%${search}%`, `%${search}%`, `%${search}%`]
  }
  
  const [rows] = await query(
    `SELECT id, name, email, phone, service_type, monthly_bill, roof_area, details, created_at FROM quote_requests ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  )
  
  const [[{ count }]]: any = await query(
    `SELECT COUNT(*) as count FROM quote_requests ${whereClause}`,
    params
  )
  
  return { data: rows, total: count, page, limit }
}



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
  const fields: string[] = []
  const values: any[] = []
  
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
  const fields: string[] = []
  const values: any[] = []
  
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

// Articles CRUD
export async function getAllArticles(page = 1, limit = 10, search = "") {
  const offset = (page - 1) * limit
  let whereClause = ""
  let params: any[] = []

  if (search) {
    whereClause = "WHERE title LIKE ? OR summary LIKE ? OR category LIKE ?"
    params = [`%${search}%`, `%${search}%`, `%${search}%`]
  }

  const [rows] = await query(
    `SELECT id, slug, title, summary, category, is_published, published_at, created_at FROM articles ${whereClause} ORDER BY COALESCE(published_at, created_at) DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  )

  const [[{ count }]]: any = await query(
    `SELECT COUNT(*) as count FROM articles ${whereClause}`,
    params
  )

  return { data: rows, total: count, page, limit }
}

export async function getArticleById(id: number) {
  const [rows] = await query("SELECT * FROM articles WHERE id = ?", [id])
  return rows?.[0] || null
}

export async function createArticle(payload: {
  slug: string
  title: string
  summary?: string
  content?: string
  category: 'news' | 'knowledge' | 'tips' | 'csr'
  is_published?: boolean
}) {
  const [result] = await query(
    "INSERT INTO articles (slug, title, summary, content, category, published_at, is_published) VALUES (?,?,?,?,?,?,?)",
    [
      payload.slug,
      payload.title,
      payload.summary || null,
      payload.content || null,
      payload.category,
      payload.is_published ? new Date() : null,
      payload.is_published ? 1 : 0,
    ]
  )
  // @ts-ignore
  return result.insertId as number
}

export async function updateArticle(id: number, payload: {
  slug?: string
  title?: string
  summary?: string
  content?: string
  category?: 'news' | 'knowledge' | 'tips' | 'csr'
  is_published?: boolean
}) {
  const fields: string[] = []
  const values: any[] = []

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === 'is_published') {
        fields.push(`is_published = ?`)
        values.push(value ? 1 : 0)
        fields.push(`published_at = ?`)
        values.push(value ? new Date() : null)
      } else {
        fields.push(`${key} = ?`)
        values.push(value)
      }
    }
  })

  if (fields.length === 0) return false

  values.push(id)
  await query(`UPDATE articles SET ${fields.join(', ')} WHERE id = ?`, values)
  return true
}

export async function deleteArticle(id: number) {
  const [result] = await query("DELETE FROM articles WHERE id = ?", [id])
  // @ts-ignore
  return result.affectedRows > 0
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

export async function getQuoteRequestById(id: number) {
  const [rows] = await query("SELECT * FROM quote_requests WHERE id = ?", [id])
  return rows?.[0] || null
}

export async function updateQuoteRequest(
  id: number,
  payload: {
    name?: string
    email?: string
    phone?: string
    service_type?: 'solar' | 'ev' | 'maintenance' | null
    monthly_bill?: number | null
    roof_area?: number | null
    details?: string | null
    status?: 'new' | 'contacted' | 'in_progress' | 'closed'
    note?: string
    assignee?: string
  }
) {
  // read existing meta
  const current = await getQuoteRequestById(id)
  if (!current) return false
  let meta: any
  try { meta = current.meta ? JSON.parse(current.meta) : {} } catch { meta = {} }

  if (payload.status !== undefined) meta.status = payload.status
  if (payload.note !== undefined) meta.note = payload.note
  if (payload.assignee !== undefined) meta.assignee = payload.assignee

  const fields: string[] = []
  const values: any[] = []

  const colMap: Record<string, any> = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    service_type: payload.service_type ?? undefined,
    monthly_bill: payload.monthly_bill ?? undefined,
    roof_area: payload.roof_area ?? undefined,
    details: payload.details ?? undefined,
    meta: JSON.stringify(meta),
  }

  Object.entries(colMap).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`)
      values.push(value)
    }
  })

  if (fields.length === 0) return false
  values.push(id)
  await query(`UPDATE quote_requests SET ${fields.join(', ')} WHERE id = ?`, values)
  return true
}

// Team Members CRUD
export async function getAllTeamMembers(page = 1, limit = 10, search = "") {
  const offset = (page - 1) * limit
  let whereClause = ""
  let params: any[] = []

  if (search) {
    whereClause = "WHERE name LIKE ? OR role LIKE ?"
    params = [`%${search}%`, `%${search}%`]
  }

  const [rows] = await query(
    `SELECT id, name, role, photo_url, created_at, updated_at FROM team_members ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  )

  const [[{ count }]]: any = await query(
    `SELECT COUNT(*) as count FROM team_members ${whereClause}`,
    params
  )

  return { data: rows, total: count, page, limit }
}

export async function getTeamMemberById(id: number) {
  const [rows] = await query("SELECT * FROM team_members WHERE id = ?", [id])
  return rows?.[0] || null
}

export async function createTeamMember(payload: { name: string; role?: string; bio?: string; photo_url?: string }) {
  const [result] = await query(
    "INSERT INTO team_members (name, role, bio, photo_url) VALUES (?,?,?,?)",
    [payload.name, payload.role || null, payload.bio || null, payload.photo_url || null]
  )
  // @ts-ignore
  return result.insertId as number
}

export async function updateTeamMember(id: number, payload: { name?: string; role?: string; bio?: string; photo_url?: string }) {
  const fields: string[] = []
  const values: any[] = []

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`)
      values.push(value)
    }
  })

  if (fields.length === 0) return false
  values.push(id)
  await query(`UPDATE team_members SET ${fields.join(', ')} WHERE id = ?`, values)
  return true
}

export async function deleteTeamMember(id: number) {
  const [result] = await query("DELETE FROM team_members WHERE id = ?", [id])
  // @ts-ignore
  return result.affectedRows > 0
}

// Company settings
export async function getCompany() {
  const [rows] = await query("SELECT * FROM companies ORDER BY id ASC LIMIT 1")
  return rows?.[0] || null
}

export async function updateCompany(id: number, payload: { name?: string; legal_name?: string; description?: string; address?: string; phone?: string; email?: string; website?: string }) {
  const fields: string[] = []
  const values: any[] = []
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`)
      values.push(value)
    }
  })
  if (fields.length === 0) return false
  values.push(id)
  await query(`UPDATE companies SET ${fields.join(', ')} WHERE id = ?`, values)
  return true
}



import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.*, pc.name_th as category_name_th, pc.name_en as category_name_en, pc.slug as category_slug
      FROM products p
      LEFT JOIN product_categories pc ON p.category_id = pc.id
      WHERE p.is_active = true
    `;
    
    const params: any[] = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND pc.slug = ?`;
      params.push(category);
    }

    if (search) {
      query += ` AND (p.name_th LIKE ? OR p.name_en LIKE ? OR p.description_th LIKE ? OR p.description_en LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (featured === 'true') {
      query += ` AND p.is_featured = true`;
    }

    query += ` ORDER BY p.is_featured DESC, p.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [products] = await db.query(query, params);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      LEFT JOIN product_categories pc ON p.category_id = pc.id
      WHERE p.is_active = true
    `;
    
    const countParams: any[] = [];

    if (category) {
      countQuery += ` AND pc.slug = ?`;
      countParams.push(category);
    }

    if (search) {
      countQuery += ` AND (p.name_th LIKE ? OR p.name_en LIKE ? OR p.description_th LIKE ? OR p.description_en LIKE ?)`;
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (featured === 'true') {
      countQuery += ` AND p.is_featured = true`;
    }

    const [countResult] = await db.query(countQuery, countParams);
    const total = parseInt(countResult[0].total);

    return NextResponse.json({
      products: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name_th,
      name_en,
      description_th,
      description_en,
      short_description_th,
      short_description_en,
      price,
      original_price,
      sku,
      category_id,
      brand,
      weight,
      dimensions,
      warranty_period,
      specifications,
      features,
      image_urls,
      is_featured,
      stock_quantity,
      min_order_quantity,
      max_order_quantity,
      meta_title_th,
      meta_title_en,
      meta_description_th,
      meta_description_en
    } = body;

    const query = `
      INSERT INTO products (
        name_th, name_en, description_th, description_en, short_description_th, short_description_en,
        price, original_price, sku, category_id, brand, weight, dimensions, warranty_period,
        specifications, features, image_urls, is_featured, stock_quantity, min_order_quantity,
        max_order_quantity, meta_title_th, meta_title_en, meta_description_th, meta_description_en
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `;

    const values = [
      name_th, name_en, description_th, description_en, short_description_th, short_description_en,
      price, original_price, sku, category_id, brand, weight, dimensions, warranty_period,
      JSON.stringify(specifications || {}), JSON.stringify(features || []), JSON.stringify(image_urls || []),
      is_featured || false, stock_quantity || 0, min_order_quantity || 1, max_order_quantity,
      meta_title_th, meta_title_en, meta_description_th, meta_description_en
    ];

    const [result] = await db.query(query, values);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

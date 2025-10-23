import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const query = `
      SELECT * FROM product_categories 
      WHERE is_active = true 
      ORDER BY sort_order ASC, name_th ASC
    `;

    const [result] = await db.query(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
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
      slug,
      image_url,
      sort_order
    } = body;

    const query = `
      INSERT INTO product_categories (
        name_th, name_en, description_th, description_en, slug, image_url, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name_th, name_en, description_th, description_en, slug, image_url, sort_order || 0
    ];

    const [result] = await db.query(query, values);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

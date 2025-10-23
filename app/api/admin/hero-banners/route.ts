import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
export const runtime = 'nodejs'

export async function GET() {
  try {
    const [banners] = await db.execute(
      'SELECT * FROM hero_banners WHERE is_active = 1 ORDER BY sort_order ASC'
    );
    
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Error fetching hero banners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero banners' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      subtitle,
      description,
      background_image,
      button_text,
      button_link,
      button_text_2,
      button_link_2,
      is_active = true,
      sort_order = 0
    } = body;

    const [result] = await db.execute(
      `INSERT INTO hero_banners 
       (title, subtitle, description, background_image, button_text, button_link, button_text_2, button_link_2, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, subtitle, description, background_image, button_text, button_link, button_text_2, button_link_2, is_active, sort_order]
    );

    return NextResponse.json({ 
      success: true, 
      id: (result as any).insertId 
    });
  } catch (error) {
    console.error('Error creating hero banner:', error);
    return NextResponse.json(
      { error: 'Failed to create hero banner' },
      { status: 500 }
    );
  }
}


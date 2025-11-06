import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam);
    const [rows] = await db.execute(
      'SELECT * FROM hero_banners WHERE id = ?',
      [id]
    );
    
    const banner = (rows as any[])[0];
    if (!banner) {
      return NextResponse.json(
        { error: 'Hero banner not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(banner);
  } catch (error) {
    console.error('Error fetching hero banner:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero banner' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam);
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
      is_active,
      sort_order
    } = body;

    await db.execute(
      `UPDATE hero_banners SET 
       title = ?, subtitle = ?, description = ?, background_image = ?, 
       button_text = ?, button_link = ?, button_text_2 = ?, button_link_2 = ?, 
       is_active = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [title, subtitle, description, background_image, button_text, button_link, 
       button_text_2, button_link_2, is_active, sort_order, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating hero banner:', error);
    return NextResponse.json(
      { error: 'Failed to update hero banner' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam);
    
    await db.execute(
      'DELETE FROM hero_banners WHERE id = ?',
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting hero banner:', error);
    return NextResponse.json(
      { error: 'Failed to delete hero banner' },
      { status: 500 }
    );
  }
}


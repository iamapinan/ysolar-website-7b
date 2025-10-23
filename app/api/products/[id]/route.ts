import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const query = `
      SELECT p.*, pc.name_th as category_name_th, pc.name_en as category_name_en, pc.slug as category_slug
      FROM products p
      LEFT JOIN product_categories pc ON p.category_id = pc.id
      WHERE p.id = ? AND p.is_active = true
    `;

    const [result] = await db.query(query, [id]);

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const product = result[0];

    // Parse JSON fields
    product.specifications = typeof product.specifications === 'string' 
      ? JSON.parse(product.specifications) 
      : product.specifications;
    product.features = typeof product.features === 'string' 
      ? JSON.parse(product.features) 
      : product.features;
    product.image_urls = typeof product.image_urls === 'string' 
      ? JSON.parse(product.image_urls) 
      : product.image_urls;

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      is_active,
      stock_quantity,
      min_order_quantity,
      max_order_quantity,
      meta_title_th,
      meta_title_en,
      meta_description_th,
      meta_description_en
    } = body;

    const query = `
      UPDATE products SET
        name_th = ?, name_en = ?, description_th = ?, description_en = ?,
        short_description_th = ?, short_description_en = ?, price = ?, original_price = ?,
        sku = ?, category_id = ?, brand = ?, weight = ?, dimensions = ?,
        warranty_period = ?, specifications = ?, features = ?, image_urls = ?,
        is_featured = ?, is_active = ?, stock_quantity = ?, min_order_quantity = ?,
        max_order_quantity = ?, meta_title_th = ?, meta_title_en = ?,
        meta_description_th = ?, meta_description_en = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const values = [
      name_th, name_en, description_th, description_en, short_description_th, short_description_en,
      price, original_price, sku, category_id, brand, weight, dimensions, warranty_period,
      JSON.stringify(specifications || {}), JSON.stringify(features || []), JSON.stringify(image_urls || []),
      is_featured || false, is_active !== false, stock_quantity || 0, min_order_quantity || 1,
      max_order_quantity, meta_title_th, meta_title_en, meta_description_th, meta_description_en,
      id
    ];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Fetch the updated product
    const [updatedProduct] = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const query = 'DELETE FROM products WHERE id = ?';
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

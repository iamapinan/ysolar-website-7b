import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Get order details
    const orderQuery = 'SELECT * FROM orders WHERE id = ?';
    const [orderResult] = await db.query(orderQuery, [id]);

    if (orderResult.length === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const order = orderResult[0];

    // Get order items
    const itemsQuery = `
      SELECT oi.*, p.image_urls
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `;
    const [itemsResult] = await db.query(itemsQuery, [id]);

    const items = itemsResult.map(item => ({
      ...item,
      image_urls: typeof item.image_urls === 'string' 
        ? JSON.parse(item.image_urls) 
        : item.image_urls
    }));

    return NextResponse.json({
      ...order,
      items
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
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
      status,
      payment_status,
      payment_method,
      admin_notes,
      tracking_number,
      estimated_delivery_date,
      delivered_at
    } = body;

    const query = `
      UPDATE orders SET
        status = COALESCE(?, status),
        payment_status = COALESCE(?, payment_status),
        payment_method = COALESCE(?, payment_method),
        admin_notes = COALESCE(?, admin_notes),
        tracking_number = COALESCE(?, tracking_number),
        estimated_delivery_date = COALESCE(?, estimated_delivery_date),
        delivered_at = COALESCE(?, delivered_at),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const values = [
      status, payment_status, payment_method, admin_notes,
      tracking_number, estimated_delivery_date, delivered_at, id
    ];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Fetch the updated order
    const [updatedOrder] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);

    return NextResponse.json(updatedOrder[0]);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

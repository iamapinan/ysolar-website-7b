import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const order_type = searchParams.get('order_type');
    const offset = (page - 1) * limit;

    let query = `
      SELECT o.*, 
        COUNT(oi.id) as item_count,
        SUM(oi.quantity) as total_quantity
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND o.status = ?`;
      params.push(status);
    }

    if (order_type) {
      query += ` AND o.order_type = ?`;
      params.push(order_type);
    }

    query += ` GROUP BY o.id ORDER BY o.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [orders] = await db.query(query, params);

    // Get total count
    let countQuery = `SELECT COUNT(*) as total FROM orders WHERE 1=1`;
    const countParams: any[] = [];
    let countParamIndex = 1;

    if (status) {
      countQuery += ` AND status = ?`;
      countParams.push(status);
    }

    if (order_type) {
      countQuery += ` AND order_type = ?`;
      countParams.push(order_type);
    }

    const [countResult] = await db.query(countQuery, countParams);
    const total = parseInt(countResult[0].total);

    return NextResponse.json({
      orders: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      customer_province,
      customer_district,
      customer_postal_code,
      order_type,
      items,
      notes,
      shipping_address
    } = body;

    // Calculate totals
    let subtotal = 0;
    const orderItems = items.map((item: any) => {
      const totalPrice = item.quantity * item.unit_price;
      subtotal += totalPrice;
      return {
        product_id: item.product_id,
        product_name_th: item.product_name_th,
        product_name_en: item.product_name_en,
        product_sku: item.product_sku,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: totalPrice
      };
    });

    const totalAmount = subtotal; // Add tax, shipping, discount if needed

    // Start transaction
    await db.query('START TRANSACTION');

    try {
      // Create order
      const orderQuery = `
        INSERT INTO orders (
          customer_name, customer_email, customer_phone, customer_address,
          customer_province, customer_district, customer_postal_code,
          order_type, subtotal, total_amount, notes, shipping_address
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const orderValues = [
        customer_name, customer_email, customer_phone, customer_address,
        customer_province, customer_district, customer_postal_code,
        order_type || 'quote', subtotal, totalAmount, notes, shipping_address
      ];

      const [orderResult] = await db.query(orderQuery, orderValues);
      const orderId = orderResult.insertId;

      // Create order items
      for (const item of orderItems) {
        const itemQuery = `
          INSERT INTO order_items (
            order_id, product_id, product_name_th, product_name_en, product_sku,
            quantity, unit_price, total_price
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const itemValues = [
          orderId, item.product_id, item.product_name_th, item.product_name_en,
          item.product_sku, item.quantity, item.unit_price, item.total_price
        ];

        await db.query(itemQuery, itemValues);
      }

      await db.query('COMMIT');

      // Fetch the created order
      const [createdOrder] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);

      return NextResponse.json(createdOrder[0], { status: 201 });
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

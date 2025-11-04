'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

interface OrderItem {
  id: number;
  product_id: number;
  product_name_th: string;
  product_name_en: string;
  product_sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  image_urls: string[];
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_province: string;
  customer_district: string;
  customer_postal_code: string;
  order_type: 'quote' | 'purchase';
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  notes: string;
  admin_notes: string;
  shipping_address: string;
  tracking_number: string;
  estimated_delivery_date: string;
  delivered_at: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { language } = useLanguage();
  const router = useRouter();
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updates, setUpdates] = useState({
    status: '',
    payment_status: '',
    payment_method: '',
    admin_notes: '',
    tracking_number: '',
    estimated_delivery_date: '',
    delivered_at: ''
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/orders/${id}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
          setUpdates({
            status: data.status,
            payment_status: data.payment_status,
            payment_method: data.payment_method || '',
            admin_notes: data.admin_notes || '',
            tracking_number: data.tracking_number || '',
            estimated_delivery_date: data.estimated_delivery_date || '',
            delivered_at: data.delivered_at || ''
          });
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleUpdate = async () => {
    if (!order) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrder(updatedOrder);
        alert('อัปเดตออร์เดอร์เรียบร้อยแล้ว');
      } else {
        const error = await response.json();
        alert(error.error || 'เกิดข้อผิดพลาดในการอัปเดต');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดต');
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getProductName = (item: OrderItem) => {
    return language === 'th' ? item.product_name_th : item.product_name_en;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const t = {
    th: {
      title: 'รายละเอียดออร์เดอร์',
      subtitle: 'ดูและจัดการรายละเอียดออร์เดอร์',
      orderInfo: 'ข้อมูลออร์เดอร์',
      customerInfo: 'ข้อมูลลูกค้า',
      orderItems: 'รายการสินค้า',
      orderSummary: 'สรุปออร์เดอร์',
      orderNumber: 'หมายเลขออร์เดอร์',
      orderType: 'ประเภทออร์เดอร์',
      status: 'สถานะ',
      paymentStatus: 'สถานะการชำระเงิน',
      paymentMethod: 'วิธีการชำระเงิน',
      trackingNumber: 'หมายเลขติดตาม',
      estimatedDelivery: 'วันที่ส่งมอบโดยประมาณ',
      deliveredAt: 'วันที่ส่งมอบจริง',
      adminNotes: 'หมายเหตุผู้ดูแลระบบ',
      customerName: 'ชื่อลูกค้า',
      customerEmail: 'อีเมลลูกค้า',
      customerPhone: 'เบอร์โทรศัพท์',
      customerAddress: 'ที่อยู่ลูกค้า',
      shippingAddress: 'ที่อยู่จัดส่ง',
      notes: 'หมายเหตุ',
      product: 'สินค้า',
      sku: 'รหัสสินค้า',
      quantity: 'จำนวน',
      unitPrice: 'ราคาต่อหน่วย',
      totalPrice: 'ราคารวม',
      subtotal: 'ยอดรวมย่อย',
      tax: 'ภาษี',
      shipping: 'ค่าจัดส่ง',
      discount: 'ส่วนลด',
      total: 'ยอดรวมทั้งหมด',
      update: 'อัปเดต',
      back: 'กลับ',
      quote: 'ใบเสนอราคา',
      purchase: 'สั่งซื้อ',
      pending: 'รอดำเนินการ',
      confirmed: 'ยืนยันแล้ว',
      processing: 'กำลังดำเนินการ',
      shipped: 'จัดส่งแล้ว',
      delivered: 'ส่งมอบแล้ว',
      cancelled: 'ยกเลิก',
      paid: 'ชำระแล้ว',
      failed: 'ชำระไม่สำเร็จ',
      refunded: 'คืนเงินแล้ว',
      loading: 'กำลังโหลด...',
      noOrder: 'ไม่พบออร์เดอร์'
    },
    en: {
      title: 'Order Details',
      subtitle: 'View and manage order details',
      orderInfo: 'Order Information',
      customerInfo: 'Customer Information',
      orderItems: 'Order Items',
      orderSummary: 'Order Summary',
      orderNumber: 'Order Number',
      orderType: 'Order Type',
      status: 'Status',
      paymentStatus: 'Payment Status',
      paymentMethod: 'Payment Method',
      trackingNumber: 'Tracking Number',
      estimatedDelivery: 'Estimated Delivery',
      deliveredAt: 'Delivered At',
      adminNotes: 'Admin Notes',
      customerName: 'Customer Name',
      customerEmail: 'Customer Email',
      customerPhone: 'Customer Phone',
      customerAddress: 'Customer Address',
      shippingAddress: 'Shipping Address',
      notes: 'Notes',
      product: 'Product',
      sku: 'SKU',
      quantity: 'Quantity',
      unitPrice: 'Unit Price',
      totalPrice: 'Total Price',
      subtotal: 'Subtotal',
      tax: 'Tax',
      shipping: 'Shipping',
      discount: 'Discount',
      total: 'Total',
      update: 'Update',
      back: 'Back',
      quote: 'Quote',
      purchase: 'Purchase',
      pending: 'Pending',
      confirmed: 'Confirmed',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      paid: 'Paid',
      failed: 'Failed',
      refunded: 'Refunded',
      loading: 'Loading...',
      noOrder: 'Order not found'
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">{t[language].loading}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">{t[language].noOrder}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t[language].title}</h1>
          <p className="text-gray-600">{t[language].subtitle}</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          {t[language].back}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t[language].orderInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t[language].orderNumber}</Label>
                  <div className="font-medium">{order.order_number}</div>
                </div>
                <div>
                  <Label>{t[language].orderType}</Label>
                  <Badge variant={order.order_type === 'quote' ? 'secondary' : 'default'}>
                    {order.order_type === 'quote' ? t[language].quote : t[language].purchase}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t[language].status}</Label>
                  <Select
                    value={updates.status}
                    onValueChange={(value) => setUpdates(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">{t[language].pending}</SelectItem>
                      <SelectItem value="confirmed">{t[language].confirmed}</SelectItem>
                      <SelectItem value="processing">{t[language].processing}</SelectItem>
                      <SelectItem value="shipped">{t[language].shipped}</SelectItem>
                      <SelectItem value="delivered">{t[language].delivered}</SelectItem>
                      <SelectItem value="cancelled">{t[language].cancelled}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t[language].paymentStatus}</Label>
                  <Select
                    value={updates.payment_status}
                    onValueChange={(value) => setUpdates(prev => ({ ...prev, payment_status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">{t[language].pending}</SelectItem>
                      <SelectItem value="paid">{t[language].paid}</SelectItem>
                      <SelectItem value="failed">{t[language].failed}</SelectItem>
                      <SelectItem value="refunded">{t[language].refunded}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t[language].paymentMethod}</Label>
                  <Input
                    value={updates.payment_method}
                    onChange={(e) => setUpdates(prev => ({ ...prev, payment_method: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t[language].trackingNumber}</Label>
                  <Input
                    value={updates.tracking_number}
                    onChange={(e) => setUpdates(prev => ({ ...prev, tracking_number: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t[language].estimatedDelivery}</Label>
                  <Input
                    type="date"
                    value={updates.estimated_delivery_date}
                    onChange={(e) => setUpdates(prev => ({ ...prev, estimated_delivery_date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t[language].deliveredAt}</Label>
                  <Input
                    type="datetime-local"
                    value={updates.delivered_at}
                    onChange={(e) => setUpdates(prev => ({ ...prev, delivered_at: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label>{t[language].adminNotes}</Label>
                <Textarea
                  value={updates.admin_notes}
                  onChange={(e) => setUpdates(prev => ({ ...prev, admin_notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button onClick={handleUpdate} disabled={saving}>
                {saving ? 'Updating...' : t[language].update}
              </Button>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t[language].customerInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t[language].customerName}</Label>
                  <div className="font-medium">{order.customer_name}</div>
                </div>
                <div>
                  <Label>{t[language].customerEmail}</Label>
                  <div className="font-medium">{order.customer_email}</div>
                </div>
              </div>

              {order.customer_phone && (
                <div>
                  <Label>{t[language].customerPhone}</Label>
                  <div className="font-medium">{order.customer_phone}</div>
                </div>
              )}

              <div>
                <Label>{t[language].customerAddress}</Label>
                <div className="font-medium">
                  {order.customer_address}
                  {order.customer_province && `, ${order.customer_province}`}
                  {order.customer_district && `, ${order.customer_district}`}
                  {order.customer_postal_code && ` ${order.customer_postal_code}`}
                </div>
              </div>

              {order.shipping_address && (
                <div>
                  <Label>{t[language].shippingAddress}</Label>
                  <div className="font-medium">{order.shipping_address}</div>
                </div>
              )}

              {order.notes && (
                <div>
                  <Label>{t[language].notes}</Label>
                  <div className="font-medium">{order.notes}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>{t[language].orderItems}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    {item.image_urls && item.image_urls.length > 0 ? (
                      <Image
                        src={item.image_urls[0]}
                        alt={getProductName(item)}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="w-15 h-15 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-medium">{getProductName(item)}</h4>
                      <p className="text-sm text-gray-600">{item.product_sku}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">{item.quantity}</div>
                      <div className="text-sm text-gray-600">{t[language].quantity}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">{formatPrice(item.unit_price)}</div>
                      <div className="text-sm text-gray-600">{t[language].unitPrice}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">{formatPrice(item.total_price)}</div>
                      <div className="text-sm text-gray-600">{t[language].totalPrice}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t[language].orderSummary}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{t[language].subtotal}:</span>
                <span className="font-medium">{formatPrice(order.subtotal)}</span>
              </div>
              
              {order.tax_amount > 0 && (
                <div className="flex justify-between">
                  <span>{t[language].tax}:</span>
                  <span className="font-medium">{formatPrice(order.tax_amount)}</span>
                </div>
              )}
              
              {order.shipping_amount > 0 && (
                <div className="flex justify-between">
                  <span>{t[language].shipping}:</span>
                  <span className="font-medium">{formatPrice(order.shipping_amount)}</span>
                </div>
              )}
              
              {order.discount_amount > 0 && (
                <div className="flex justify-between">
                  <span>{t[language].discount}:</span>
                  <span className="font-medium text-green-600">-{formatPrice(order.discount_amount)}</span>
                </div>
              )}
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>{t[language].total}:</span>
                  <span>{formatPrice(order.total_amount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <div className="font-medium">Created</div>
                <div className="text-gray-600">
                  {new Date(order.created_at).toLocaleString()}
                </div>
              </div>
              {order.updated_at !== order.created_at && (
                <div className="text-sm">
                  <div className="font-medium">Last Updated</div>
                  <div className="text-gray-600">
                    {new Date(order.updated_at).toLocaleString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

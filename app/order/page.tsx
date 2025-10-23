'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface OrderItem {
  product_id: number;
  product_name_th: string;
  product_name_en: string;
  product_sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface OrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_province: string;
  customer_district: string;
  customer_postal_code: string;
  order_type: 'quote' | 'purchase';
  items: OrderItem[];
  notes: string;
  shipping_address?: string;
}

export default function OrderPage() {
  const { language } = useLanguage();
  const [orderData, setOrderData] = useState<OrderData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
    customer_province: '',
    customer_district: '',
    customer_postal_code: '',
    order_type: 'quote',
    items: [],
    notes: '',
    shipping_address: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Load pending order from localStorage
    const pendingOrder = localStorage.getItem('pendingOrder');
    if (pendingOrder) {
      const parsedOrder = JSON.parse(pendingOrder);
      setOrderData(parsedOrder);
      localStorage.removeItem('pendingOrder');
    }
  }, []);

  const handleInputChange = (field: keyof OrderData, value: string) => {
    setOrderData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemQuantityChange = (index: number, quantity: number) => {
    if (quantity < 1) return;
    
    setOrderData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index 
          ? { ...item, quantity, total_price: item.unit_price * quantity }
          : item
      )
    }));
  };

  const removeItem = (index: number) => {
    setOrderData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateSubtotal = () => {
    return orderData.items.reduce((sum, item) => sum + item.total_price, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (orderData.items.length === 0) {
      alert('กรุณาเพิ่มสินค้าในตะกร้า');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setSubmitted(true);
        setOrderData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          customer_address: '',
          customer_province: '',
          customer_district: '',
          customer_postal_code: '',
          order_type: 'quote',
          items: [],
          notes: '',
          shipping_address: ''
        });
      } else {
        const error = await response.json();
        alert(error.error || 'เกิดข้อผิดพลาดในการส่งคำสั่งซื้อ');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('เกิดข้อผิดพลาดในการส่งคำสั่งซื้อ');
    } finally {
      setLoading(false);
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

  const t = {
    th: {
      title: 'สั่งซื้อสินค้า',
      subtitle: 'กรุณากรอกข้อมูลเพื่อดำเนินการสั่งซื้อ',
      customerInfo: 'ข้อมูลลูกค้า',
      orderItems: 'รายการสินค้า',
      orderSummary: 'สรุปคำสั่งซื้อ',
      name: 'ชื่อ-นามสกุล',
      email: 'อีเมล',
      phone: 'เบอร์โทรศัพท์',
      address: 'ที่อยู่',
      province: 'จังหวัด',
      district: 'อำเภอ/เขต',
      postalCode: 'รหัสไปรษณีย์',
      notes: 'หมายเหตุ',
      shippingAddress: 'ที่อยู่จัดส่ง (หากแตกต่างจากที่อยู่ข้างต้น)',
      orderType: 'ประเภทคำสั่งซื้อ',
      quote: 'ขอใบเสนอราคา',
      purchase: 'สั่งซื้อสินค้า',
      product: 'สินค้า',
      quantity: 'จำนวน',
      price: 'ราคา',
      total: 'รวม',
      subtotal: 'ยอดรวม',
      remove: 'ลบ',
      submitOrder: 'ส่งคำสั่งซื้อ',
      orderSubmitted: 'ส่งคำสั่งซื้อเรียบร้อยแล้ว',
      orderSubmittedMessage: 'ขอบคุณสำหรับการสั่งซื้อ เราจะติดต่อกลับภายใน 24 ชั่วโมง',
      backToProducts: 'กลับไปยังสินค้า',
      noItems: 'ไม่มีสินค้าในตะกร้า',
      addProducts: 'เพิ่มสินค้า'
    },
    en: {
      title: 'Place Order',
      subtitle: 'Please fill in your information to proceed with the order',
      customerInfo: 'Customer Information',
      orderItems: 'Order Items',
      orderSummary: 'Order Summary',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      address: 'Address',
      province: 'Province',
      district: 'District',
      postalCode: 'Postal Code',
      notes: 'Notes',
      shippingAddress: 'Shipping Address (if different from above)',
      orderType: 'Order Type',
      quote: 'Request Quote',
      purchase: 'Purchase',
      product: 'Product',
      quantity: 'Quantity',
      price: 'Price',
      total: 'Total',
      subtotal: 'Subtotal',
      remove: 'Remove',
      submitOrder: 'Submit Order',
      orderSubmitted: 'Order Submitted Successfully',
      orderSubmittedMessage: 'Thank you for your order. We will contact you within 24 hours.',
      backToProducts: 'Back to Products',
      noItems: 'No items in cart',
      addProducts: 'Add Products'
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t[language].orderSubmitted}
            </h1>
            <p className="text-gray-600 mb-6">
              {t[language].orderSubmittedMessage}
            </p>
            <Link href="/products">
              <Button className="w-full">
                {t[language].backToProducts}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t[language].title}
            </h1>
            <p className="text-gray-600">
              {t[language].subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t[language].customerInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t[language].name}</Label>
                    <Input
                      id="name"
                      value={orderData.customer_name}
                      onChange={(e) => handleInputChange('customer_name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t[language].email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderData.customer_email}
                      onChange={(e) => handleInputChange('customer_email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">{t[language].phone}</Label>
                  <Input
                    id="phone"
                    value={orderData.customer_phone}
                    onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">{t[language].address}</Label>
                  <Textarea
                    id="address"
                    value={orderData.customer_address}
                    onChange={(e) => handleInputChange('customer_address', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="province">{t[language].province}</Label>
                    <Input
                      id="province"
                      value={orderData.customer_province}
                      onChange={(e) => handleInputChange('customer_province', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">{t[language].district}</Label>
                    <Input
                      id="district"
                      value={orderData.customer_district}
                      onChange={(e) => handleInputChange('customer_district', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">{t[language].postalCode}</Label>
                    <Input
                      id="postalCode"
                      value={orderData.customer_postal_code}
                      onChange={(e) => handleInputChange('customer_postal_code', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shippingAddress">{t[language].shippingAddress}</Label>
                  <Textarea
                    id="shippingAddress"
                    value={orderData.shipping_address || ''}
                    onChange={(e) => handleInputChange('shipping_address', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="orderType">{t[language].orderType}</Label>
                  <Select
                    value={orderData.order_type}
                    onValueChange={(value: 'quote' | 'purchase') => handleInputChange('order_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quote">{t[language].quote}</SelectItem>
                      <SelectItem value="purchase">{t[language].purchase}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">{t[language].notes}</Label>
                  <Textarea
                    id="notes"
                    value={orderData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t[language].orderItems}</CardTitle>
              </CardHeader>
              <CardContent>
                {orderData.items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">{t[language].noItems}</p>
                    <Link href="/products">
                      <Button variant="outline">{t[language].addProducts}</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{getProductName(item)}</h4>
                          <p className="text-xs text-gray-500">{item.product_sku}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleItemQuantityChange(index, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleItemQuantityChange(index, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(item.total_price)}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            {t[language].remove}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t[language].orderSummary}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t[language].subtotal}:</span>
                    <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t[language].total}:</span>
                      <span>{formatPrice(calculateSubtotal())}</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={loading || orderData.items.length === 0}
                >
                  {loading ? 'Processing...' : t[language].submitOrder}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}

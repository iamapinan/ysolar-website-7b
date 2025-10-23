'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  order_type: 'quote' | 'purchase';
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  total_amount: number;
  created_at: string;
  item_count: number;
  total_quantity: number;
}

export default function AdminOrdersPage() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [orderTypeFilter, setOrderTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });

      if (statusFilter && statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      if (orderTypeFilter && orderTypeFilter !== 'all') {
        params.append('order_type', orderTypeFilter);
      }

      const response = await fetch(`/api/orders?${params}`);
      const data = await response.json();
      
      setOrders(data.orders || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter, orderTypeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchOrders();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0
    }).format(price);
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
      title: 'จัดการออร์เดอร์',
      subtitle: 'จัดการคำสั่งซื้อและใบเสนอราคา',
      orderNumber: 'หมายเลขออร์เดอร์',
      customer: 'ลูกค้า',
      type: 'ประเภท',
      status: 'สถานะ',
      paymentStatus: 'สถานะการชำระเงิน',
      total: 'ยอดรวม',
      items: 'รายการ',
      created: 'วันที่สร้าง',
      actions: 'การดำเนินการ',
      view: 'ดู',
      edit: 'แก้ไข',
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
      noOrders: 'ไม่พบออร์เดอร์',
      loading: 'กำลังโหลด...',
      searchPlaceholder: 'ค้นหาออร์เดอร์...',
      allStatuses: 'สถานะทั้งหมด',
      allTypes: 'ประเภททั้งหมด'
    },
    en: {
      title: 'Manage Orders',
      subtitle: 'Manage orders and quotes',
      orderNumber: 'Order Number',
      customer: 'Customer',
      type: 'Type',
      status: 'Status',
      paymentStatus: 'Payment Status',
      total: 'Total',
      items: 'Items',
      created: 'Created',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
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
      noOrders: 'No orders found',
      loading: 'Loading...',
      searchPlaceholder: 'Search orders...',
      allStatuses: 'All Statuses',
      allTypes: 'All Types'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t[language].title}</h1>
        <p className="text-gray-600">{t[language].subtitle}</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <form onSubmit={handleSearch} className="md:col-span-2">
              <Input
                placeholder={t[language].searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t[language].allStatuses} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t[language].allStatuses}</SelectItem>
                <SelectItem value="pending">{t[language].pending}</SelectItem>
                <SelectItem value="confirmed">{t[language].confirmed}</SelectItem>
                <SelectItem value="processing">{t[language].processing}</SelectItem>
                <SelectItem value="shipped">{t[language].shipped}</SelectItem>
                <SelectItem value="delivered">{t[language].delivered}</SelectItem>
                <SelectItem value="cancelled">{t[language].cancelled}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={orderTypeFilter} onValueChange={setOrderTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t[language].allTypes} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t[language].allTypes}</SelectItem>
                <SelectItem value="quote">{t[language].quote}</SelectItem>
                <SelectItem value="purchase">{t[language].purchase}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t[language].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-600">{t[language].loading}</div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-600">{t[language].noOrders}</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">{t[language].orderNumber}</th>
                    <th className="text-left py-3 px-4">{t[language].customer}</th>
                    <th className="text-left py-3 px-4">{t[language].type}</th>
                    <th className="text-left py-3 px-4">{t[language].status}</th>
                    <th className="text-left py-3 px-4">{t[language].paymentStatus}</th>
                    <th className="text-left py-3 px-4">{t[language].total}</th>
                    <th className="text-left py-3 px-4">{t[language].items}</th>
                    <th className="text-left py-3 px-4">{t[language].created}</th>
                    <th className="text-left py-3 px-4">{t[language].actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{order.order_number}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{order.customer_name}</div>
                          <div className="text-sm text-gray-600">{order.customer_email}</div>
                          {order.customer_phone && (
                            <div className="text-sm text-gray-600">{order.customer_phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={order.order_type === 'quote' ? 'secondary' : 'default'}>
                          {order.order_type === 'quote' ? t[language].quote : t[language].purchase}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          {t[language][order.status as keyof typeof t[language]]}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getPaymentStatusColor(order.payment_status)}>
                          {t[language][order.payment_status as keyof typeof t[language]]}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{formatPrice(order.total_amount)}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div>{order.item_count} {t[language].items}</div>
                          <div className="text-gray-600">Qty: {order.total_quantity}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Link href={`/admin/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              {t[language].view}
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name_th: string;
  name_en: string;
  price: number;
  original_price?: number;
  sku: string;
  category_name_th: string;
  category_name_en: string;
  is_featured: boolean;
  is_active: boolean;
  stock_quantity: number;
  image_urls: string[];
  created_at: string;
}

export default function AdminProductsPage() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      
      // Parse image_urls from JSON string to array
      const productsWithParsedImages = (data.products || []).map((product: any) => ({
        ...product,
        image_urls: typeof product.image_urls === 'string' 
          ? JSON.parse(product.image_urls) 
          : product.image_urls || []
      }));
      
      setProducts(productsWithParsedImages);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getProductName = (product: Product) => {
    return language === 'th' ? product.name_th : product.name_en;
  };

  const getCategoryName = (product: Product) => {
    return language === 'th' ? product.category_name_th : product.category_name_en;
  };

  const t: Record<string, any> = {
    th: {
      title: 'จัดการสินค้า',
      subtitle: 'จัดการสินค้าและข้อมูลผลิตภัณฑ์',
      addProduct: 'เพิ่มสินค้าใหม่',
      searchPlaceholder: 'ค้นหาสินค้า...',
      product: 'สินค้า',
      category: 'หมวดหมู่',
      price: 'ราคา',
      stock: 'สต็อก',
      status: 'สถานะ',
      featured: 'แนะนำ',
      active: 'ใช้งาน',
      inactive: 'ไม่ใช้งาน',
      edit: 'แก้ไข',
      delete: 'ลบ',
      noProducts: 'ไม่พบสินค้า',
      loading: 'กำลังโหลด...',
      sku: 'รหัสสินค้า',
      created: 'วันที่สร้าง'
    },
    en: {
      title: 'Manage Products',
      subtitle: 'Manage products and product information',
      addProduct: 'Add New Product',
      searchPlaceholder: 'Search products...',
      product: 'Product',
      category: 'Category',
      price: 'Price',
      stock: 'Stock',
      status: 'Status',
      featured: 'Featured',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      noProducts: 'No products found',
      loading: 'Loading...',
      sku: 'SKU',
      created: 'Created'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t[language].title}</h1>
          <p className="text-gray-600">{t[language].subtitle}</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="default" className="whitespace-nowrap">
            {t[language].addProduct}
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <Input
              placeholder={t[language].searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t[language].product}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-600">{t[language].loading}</div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-600">{t[language].noProducts}</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Image</th>
                    <th className="text-left py-3 px-4">{t[language].product}</th>
                    <th className="text-left py-3 px-4">{t[language].sku}</th>
                    <th className="text-left py-3 px-4">{t[language].category}</th>
                    <th className="text-left py-3 px-4">{t[language].price}</th>
                    <th className="text-left py-3 px-4">{t[language].stock}</th>
                    <th className="text-left py-3 px-4">{t[language].status}</th>
                    <th className="text-left py-3 px-4">{t[language].created}</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {product.image_urls && product.image_urls.length > 0 ? (
                          <Image
                            src={product.image_urls[0]}
                            alt={getProductName(product)}
                            width={50}
                            height={50}
                            className="rounded object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{getProductName(product)}</div>
                          {product.is_featured && (
                            <Badge variant="secondary" className="text-xs">
                              {t[language].featured}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {product.sku}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {getCategoryName(product)}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{formatPrice(product.price)}</div>
                          {product.original_price && product.original_price > product.price && (
                            <div className="text-sm text-gray-500 line-through">
                              {formatPrice(product.original_price)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={product.stock_quantity > 0 ? 'default' : 'destructive'}>
                          {product.stock_quantity}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={product.is_active ? 'default' : 'secondary'}>
                          {product.is_active ? t[language].active : t[language].inactive}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(product.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Link href={`/admin/products/${product.id}`}>
                            <Button variant="outline" size="sm">
                              {t[language].edit}
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

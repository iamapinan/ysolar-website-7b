'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name_th: string;
  name_en: string;
  short_description_th: string;
  short_description_en: string;
  price: number;
  original_price?: number;
  image_urls: string[];
  is_featured: boolean;
  category_name_th: string;
  category_name_en: string;
  category_slug: string;
}

interface Category {
  id: number;
  name_th: string;
  name_en: string;
  slug: string;
}

export default function ProductsPage() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12'
      });

      if (selectedCategory) {
        params.append('category', selectedCategory);
      }

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

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, searchTerm]);

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

  const getProductDescription = (product: Product) => {
    return language === 'th' ? product.short_description_th : product.short_description_en;
  };

  const getCategoryName = (category: Category) => {
    return language === 'th' ? category.name_th : category.name_en;
  };

  const t: Record<string, any> = {
    th: {
      title: 'สินค้าของเรา',
      subtitle: 'ผลิตภัณฑ์โซลาร์คุณภาพสูงสำหรับทุกความต้องการ',
      searchPlaceholder: 'ค้นหาสินค้า...',
      allCategories: 'หมวดหมู่ทั้งหมด',
      featured: 'สินค้าแนะนำ',
      price: 'ราคา',
      originalPrice: 'ราคาเดิม',
      viewDetails: 'ดูรายละเอียด',
      noProducts: 'ไม่พบสินค้า',
      loading: 'กำลังโหลด...'
    },
    en: {
      title: 'Our Products',
      subtitle: 'High-quality solar products for all your needs',
      searchPlaceholder: 'Search products...',
      allCategories: 'All Categories',
      featured: 'Featured',
      price: 'Price',
      originalPrice: 'Original Price',
      viewDetails: 'View Details',
      noProducts: 'No products found',
      loading: 'Loading...'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t[language].title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t[language].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t[language].searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  size="sm"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === '' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('')}
                size="sm"
              >
                {t[language].allCategories}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.slug)}
                  size="sm"
                >
                  {getCategoryName(category)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">{t[language].loading}</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">{t[language].noProducts}</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    {product.image_urls && product.image_urls.length > 0 ? (
                      <Image
                        src={product.image_urls[0]}
                        alt={getProductName(product)}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    {product.is_featured && (
                      <Badge className="absolute top-2 left-2 bg-green-600">
                        {t[language].featured}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {getProductName(product)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {getProductDescription(product)}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-green-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.original_price)}
                        </span>
                      )}
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <Button className="w-full">
                        {t[language].viewDetails}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
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
          </>
        )}
      </div>
    </div>
  );
}

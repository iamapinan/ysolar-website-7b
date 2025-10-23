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

export default function FeaturedProducts() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products?featured=true&limit=4');
        const data = await response.json();
        // Parse image_urls from JSON string to array
        const productsWithParsedImages = (data.products || []).map((product: any) => ({
          ...product,
          image_urls: typeof product.image_urls === 'string' 
            ? JSON.parse(product.image_urls) 
            : product.image_urls || []
        }));
        setProducts(productsWithParsedImages);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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

  const getCategoryName = (product: Product) => {
    return language === 'th' ? product.category_name_th : product.category_name_en;
  };

  const t = {
    th: {
      featured: 'สินค้าแนะนำ',
      price: 'ราคา',
      originalPrice: 'ราคาเดิม',
      viewDetails: 'ดูรายละเอียด',
      viewAllProducts: 'ดูสินค้าทั้งหมด',
      noProducts: 'ไม่พบสินค้าแนะนำ',
      loading: 'กำลังโหลด...'
    },
    en: {
      featured: 'Featured',
      price: 'Price',
      originalPrice: 'Original Price',
      viewDetails: 'View Details',
      viewAllProducts: 'View All Products',
      noProducts: 'No featured products found',
      loading: 'Loading...'
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-lg text-gray-600">{t[language].loading}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-lg text-gray-600">{t[language].noProducts}</div>
        <Link href="/products" className="mt-4 inline-block">
          <Button variant="outline">{t[language].viewAllProducts}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              {product.image_urls && product.image_urls.length > 0 ? (
                <Image
                  src={product.image_urls[0]}
                  alt={getProductName(product)}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <Badge className="absolute top-2 left-2 bg-green-600">
                {t[language].featured}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="mb-2">
                <Badge variant="secondary" className="text-xs">
                  {getCategoryName(product)}
                </Badge>
              </div>
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

      <div className="text-center">
        <Link href="/products">
          <Button variant="outline" size="lg">
            {t[language].viewAllProducts}
          </Button>
        </Link>
      </div>
    </div>
  );
}

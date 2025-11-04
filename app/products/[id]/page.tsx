'use client';

import { useState, useEffect, use } from 'react';
import { useLanguage } from '@/lib/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  short_description_th: string;
  short_description_en: string;
  price: number;
  original_price?: number;
  sku: string;
  brand: string;
  weight?: number;
  dimensions?: string;
  warranty_period?: number;
  specifications: any;
  features: string[];
  image_urls: string[];
  is_featured: boolean;
  stock_quantity: number;
  min_order_quantity: number;
  max_order_quantity?: number;
  category_name_th: string;
  category_name_en: string;
  category_slug: string;
}

interface OrderItem {
  product_id: number;
  product_name_th: string;
  product_name_en: string;
  product_sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { language } = useLanguage();
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<'quote' | 'purchase'>('quote');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          // Parse image_urls from JSON string to array
          const productWithParsedImages = {
            ...data,
            image_urls: typeof data.image_urls === 'string' 
              ? JSON.parse(data.image_urls) 
              : data.image_urls || []
          };
          setProduct(productWithParsedImages);
          setQuantity(data.min_order_quantity || 1);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleOrder = async () => {
    if (!product) return;

    const orderData = {
      customer_name: '', // Will be filled in the order form
      customer_email: '',
      customer_phone: '',
      customer_address: '',
      customer_province: '',
      customer_district: '',
      customer_postal_code: '',
      order_type: orderType,
      items: [{
        product_id: product.id,
        product_name_th: product.name_th,
        product_name_en: product.name_en,
        product_sku: product.sku,
        quantity: quantity,
        unit_price: product.price
      }],
      notes: ''
    };

    // Store order data in localStorage for the order form
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    
    // Redirect to order form
    window.location.href = '/order';
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
    return language === 'th' ? product.description_th : product.description_en;
  };

  const getCategoryName = (product: Product) => {
    return language === 'th' ? product.category_name_th : product.category_name_en;
  };

  const t = {
    th: {
      backToProducts: 'กลับไปยังสินค้า',
      category: 'หมวดหมู่',
      sku: 'รหัสสินค้า',
      brand: 'แบรนด์',
      weight: 'น้ำหนัก',
      dimensions: 'ขนาด',
      warranty: 'การรับประกัน',
      specifications: 'ข้อมูลจำเพาะ',
      features: 'คุณสมบัติเด่น',
      stock: 'สินค้าคงเหลือ',
      minOrder: 'จำนวนสั่งซื้อขั้นต่ำ',
      maxOrder: 'จำนวนสั่งซื้อสูงสุด',
      quantity: 'จำนวน',
      price: 'ราคา',
      originalPrice: 'ราคาเดิม',
      addToQuote: 'ขอใบเสนอราคา',
      addToCart: 'เพิ่มในตะกร้า',
      orderNow: 'สั่งซื้อเลย',
      inStock: 'มีสินค้า',
      outOfStock: 'สินค้าหมด',
      months: 'เดือน',
      kg: 'กิโลกรัม',
      noImage: 'ไม่มีรูปภาพ'
    },
    en: {
      backToProducts: 'Back to Products',
      category: 'Category',
      sku: 'SKU',
      brand: 'Brand',
      weight: 'Weight',
      dimensions: 'Dimensions',
      warranty: 'Warranty',
      specifications: 'Specifications',
      features: 'Features',
      stock: 'Stock',
      minOrder: 'Min Order',
      maxOrder: 'Max Order',
      quantity: 'Quantity',
      price: 'Price',
      originalPrice: 'Original Price',
      addToQuote: 'Request Quote',
      addToCart: 'Add to Cart',
      orderNow: 'Order Now',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      months: 'months',
      kg: 'kg',
      noImage: 'No Image'
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>{t[language].backToProducts}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isInStock = product.stock_quantity > 0;
  const maxQuantity = product.max_order_quantity || product.stock_quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/products" className="hover:text-green-600">
              {t[language].backToProducts}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{getProductName(product)}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {product.image_urls && product.image_urls.length > 0 ? (
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={product.image_urls[0]}
                  alt={getProductName(product)}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">{t[language].noImage}</span>
              </div>
            )}
            
            {product.image_urls && product.image_urls.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.image_urls.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${getProductName(product)} ${index + 2}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getProductName(product)}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {getProductDescription(product)}
              </p>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-green-600">
                  {formatPrice(product.price)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant={isInStock ? 'default' : 'destructive'}>
                  {isInStock ? t[language].inStock : t[language].outOfStock}
                </Badge>
                {product.is_featured && (
                  <Badge className="bg-green-600">Featured</Badge>
                )}
              </div>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Product Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">{t[language].category}:</span>
                    <span className="ml-2">{getCategoryName(product)}</span>
                  </div>
                  <div>
                    <span className="font-medium">{t[language].sku}:</span>
                    <span className="ml-2">{product.sku}</span>
                  </div>
                  <div>
                    <span className="font-medium">{t[language].brand}:</span>
                    <span className="ml-2">{product.brand}</span>
                  </div>
                  {product.weight && (
                    <div>
                      <span className="font-medium">{t[language].weight}:</span>
                      <span className="ml-2">{product.weight} {t[language].kg}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div>
                      <span className="font-medium">{t[language].dimensions}:</span>
                      <span className="ml-2">{product.dimensions}</span>
                    </div>
                  )}
                  {product.warranty_period && (
                    <div>
                      <span className="font-medium">{t[language].warranty}:</span>
                      <span className="ml-2">{product.warranty_period} {t[language].months}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">{t[language].stock}:</span>
                    <span className="ml-2">{product.stock_quantity}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Order Options</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t[language].quantity}
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(product.min_order_quantity, quantity - 1))}
                        disabled={quantity <= product.min_order_quantity}
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(product.min_order_quantity, parseInt(e.target.value) || product.min_order_quantity))}
                        min={product.min_order_quantity}
                        max={maxQuantity}
                        className="w-20 text-center border border-gray-300 rounded px-2 py-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                        disabled={quantity >= maxQuantity}
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {t[language].minOrder}: {product.min_order_quantity}
                      {product.max_order_quantity && `, ${t[language].maxOrder}: ${product.max_order_quantity}`}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Order Type</label>
                    <div className="flex gap-2">
                      <Button
                        variant={orderType === 'quote' ? 'default' : 'outline'}
                        onClick={() => setOrderType('quote')}
                        size="sm"
                      >
                        {t[language].addToQuote}
                      </Button>
                      <Button
                        variant={orderType === 'purchase' ? 'default' : 'outline'}
                        onClick={() => setOrderType('purchase')}
                        size="sm"
                      >
                        {t[language].orderNow}
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleOrder}
                    disabled={!isInStock}
                    className="w-full"
                    size="lg"
                  >
                    {orderType === 'quote' ? t[language].addToQuote : t[language].orderNow}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">{t[language].specifications}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                      <span>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">{t[language].features}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

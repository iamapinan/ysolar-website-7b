'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { FileUpload } from '@/components/ui/file-upload';
import Image from 'next/image';
import { X } from 'lucide-react';

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
  category_id?: number;
  brand: string;
  weight?: number;
  dimensions?: string;
  warranty_period?: number;
  specifications: any;
  features: string[];
  image_urls: string[];
  is_featured: boolean;
  is_active: boolean;
  stock_quantity: number;
  min_order_quantity: number;
  max_order_quantity?: number;
  meta_title_th?: string;
  meta_title_en?: string;
  meta_description_th?: string;
  meta_description_en?: string;
}

interface Category {
  id: number;
  name_th: string;
  name_en: string;
  slug: string;
}

export default function AdminProductFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { language } = useLanguage();
  const router = useRouter();
  const { id } = use(params);
  const isEdit = id !== 'new';
  
  const [product, setProduct] = useState<Product>({
    id: 0,
    name_th: '',
    name_en: '',
    description_th: '',
    description_en: '',
    short_description_th: '',
    short_description_en: '',
    price: 0,
    original_price: 0,
    sku: '',
    category_id: undefined,
    brand: '',
    weight: 0,
    dimensions: '',
    warranty_period: 0,
    specifications: {},
    features: [],
    image_urls: [],
    is_featured: false,
    is_active: true,
    stock_quantity: 0,
    min_order_quantity: 1,
    max_order_quantity: undefined,
    meta_title_th: '',
    meta_title_en: '',
    meta_description_th: '',
    meta_description_en: ''
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

    if (isEdit) {
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
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, isEdit]);

  const handleInputChange = (field: keyof Product, value: any) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field: 'features' | 'image_urls', value: string[]) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setProduct(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }));
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...product.specifications };
    delete newSpecs[key];
    setProduct(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      handleArrayInputChange('features', [...product.features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = product.features.filter((_, i) => i !== index);
    handleArrayInputChange('features', newFeatures);
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      handleSpecificationChange(newSpecKey.trim(), newSpecValue.trim());
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const handleImageUpload = (url: string, key: string) => {
    handleArrayInputChange('image_urls', [...product.image_urls, url]);
  };

  const handleImageDelete = (key: string) => {
    // Find the URL to remove based on the key
    const urlToRemove = product.image_urls.find(url => url.includes(key));
    if (urlToRemove) {
      const newImageUrls = product.image_urls.filter(url => url !== urlToRemove);
      handleArrayInputChange('image_urls', newImageUrls);
    }
  };

  const removeImageByUrl = (url: string) => {
    const newImageUrls = product.image_urls.filter(imageUrl => imageUrl !== url);
    handleArrayInputChange('image_urls', newImageUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/products/${id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        const error = await response.json();
        alert(error.error || 'เกิดข้อผิดพลาดในการบันทึก');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setSaving(false);
    }
  };

  const getCategoryName = (category: Category) => {
    return language === 'th' ? category.name_th : category.name_en;
  };

  const t = {
    th: {
      title: isEdit ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่',
      subtitle: isEdit ? 'แก้ไขข้อมูลสินค้า' : 'เพิ่มสินค้าใหม่เข้าสู่ระบบ',
      basicInfo: 'ข้อมูลพื้นฐาน',
      pricing: 'ราคา',
      inventory: 'สต็อก',
      seo: 'SEO',
      specifications: 'ข้อมูลจำเพาะ',
      features: 'คุณสมบัติเด่น',
      images: 'รูปภาพ',
      nameTh: 'ชื่อสินค้า (ไทย)',
      nameEn: 'ชื่อสินค้า (อังกฤษ)',
      descriptionTh: 'รายละเอียด (ไทย)',
      descriptionEn: 'รายละเอียด (อังกฤษ)',
      shortDescriptionTh: 'คำอธิบายสั้น (ไทย)',
      shortDescriptionEn: 'คำอธิบายสั้น (อังกฤษ)',
      sku: 'รหัสสินค้า',
      category: 'หมวดหมู่',
      brand: 'แบรนด์',
      weight: 'น้ำหนัก (กก.)',
      dimensions: 'ขนาด',
      warranty: 'การรับประกัน (เดือน)',
      price: 'ราคา',
      originalPrice: 'ราคาเดิม',
      stock: 'จำนวนสต็อก',
      minOrder: 'จำนวนสั่งซื้อขั้นต่ำ',
      maxOrder: 'จำนวนสั่งซื้อสูงสุด',
      featured: 'สินค้าแนะนำ',
      active: 'ใช้งาน',
      metaTitleTh: 'Meta Title (ไทย)',
      metaTitleEn: 'Meta Title (อังกฤษ)',
      metaDescriptionTh: 'Meta Description (ไทย)',
      metaDescriptionEn: 'Meta Description (อังกฤษ)',
      addFeature: 'เพิ่มคุณสมบัติ',
      addSpec: 'เพิ่มข้อมูลจำเพาะ',
      uploadImage: 'อัปโหลดรูปภาพ',
      currentImages: 'รูปภาพปัจจุบัน',
      removeImage: 'ลบรูปภาพ',
      save: 'บันทึก',
      cancel: 'ยกเลิก',
      loading: 'กำลังโหลด...'
    },
    en: {
      title: isEdit ? 'Edit Product' : 'Add New Product',
      subtitle: isEdit ? 'Edit product information' : 'Add new product to the system',
      basicInfo: 'Basic Information',
      pricing: 'Pricing',
      inventory: 'Inventory',
      seo: 'SEO',
      specifications: 'Specifications',
      features: 'Features',
      images: 'Images',
      nameTh: 'Product Name (Thai)',
      nameEn: 'Product Name (English)',
      descriptionTh: 'Description (Thai)',
      descriptionEn: 'Description (English)',
      shortDescriptionTh: 'Short Description (Thai)',
      shortDescriptionEn: 'Short Description (English)',
      sku: 'SKU',
      category: 'Category',
      brand: 'Brand',
      weight: 'Weight (kg)',
      dimensions: 'Dimensions',
      warranty: 'Warranty (months)',
      price: 'Price',
      originalPrice: 'Original Price',
      stock: 'Stock Quantity',
      minOrder: 'Minimum Order',
      maxOrder: 'Maximum Order',
      featured: 'Featured Product',
      active: 'Active',
      metaTitleTh: 'Meta Title (Thai)',
      metaTitleEn: 'Meta Title (English)',
      metaDescriptionTh: 'Meta Description (Thai)',
      metaDescriptionEn: 'Meta Description (English)',
      addFeature: 'Add Feature',
      addSpec: 'Add Specification',
      uploadImage: 'Upload Image',
      currentImages: 'Current Images',
      removeImage: 'Remove Image',
      save: 'Save',
      cancel: 'Cancel',
      loading: 'Loading...'
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">{t[language].loading}</div>
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
          {t[language].cancel}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t[language].basicInfo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name_th">{t[language].nameTh}</Label>
                <Input
                  id="name_th"
                  value={product.name_th}
                  onChange={(e) => handleInputChange('name_th', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="name_en">{t[language].nameEn}</Label>
                <Input
                  id="name_en"
                  value={product.name_en}
                  onChange={(e) => handleInputChange('name_en', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="short_description_th">{t[language].shortDescriptionTh}</Label>
                <Textarea
                  id="short_description_th"
                  value={product.short_description_th}
                  onChange={(e) => handleInputChange('short_description_th', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="short_description_en">{t[language].shortDescriptionEn}</Label>
                <Textarea
                  id="short_description_en"
                  value={product.short_description_en}
                  onChange={(e) => handleInputChange('short_description_en', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description_th">{t[language].descriptionTh}</Label>
              <Textarea
                id="description_th"
                value={product.description_th}
                onChange={(e) => handleInputChange('description_th', e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="description_en">{t[language].descriptionEn}</Label>
              <Textarea
                id="description_en"
                value={product.description_en}
                onChange={(e) => handleInputChange('description_en', e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sku">{t[language].sku}</Label>
                <Input
                  id="sku"
                  value={product.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">{t[language].category}</Label>
                <Select
                  value={product.category_id?.toString() || ''}
                  onValueChange={(value) => handleInputChange('category_id', parseInt(value) || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {getCategoryName(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="brand">{t[language].brand}</Label>
                <Input
                  id="brand"
                  value={product.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="weight">{t[language].weight}</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={product.weight || ''}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || undefined)}
                />
              </div>
              <div>
                <Label htmlFor="dimensions">{t[language].dimensions}</Label>
                <Input
                  id="dimensions"
                  value={product.dimensions || ''}
                  onChange={(e) => handleInputChange('dimensions', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="warranty">{t[language].warranty}</Label>
                <Input
                  id="warranty"
                  type="number"
                  value={product.warranty_period || ''}
                  onChange={(e) => handleInputChange('warranty_period', parseInt(e.target.value) || undefined)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>{t[language].pricing}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">{t[language].price}</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="original_price">{t[language].originalPrice}</Label>
                <Input
                  id="original_price"
                  type="number"
                  step="0.01"
                  value={product.original_price || ''}
                  onChange={(e) => handleInputChange('original_price', parseFloat(e.target.value) || undefined)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>{t[language].inventory}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="stock">{t[language].stock}</Label>
                <Input
                  id="stock"
                  type="number"
                  value={product.stock_quantity}
                  onChange={(e) => handleInputChange('stock_quantity', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="min_order">{t[language].minOrder}</Label>
                <Input
                  id="min_order"
                  type="number"
                  value={product.min_order_quantity}
                  onChange={(e) => handleInputChange('min_order_quantity', parseInt(e.target.value) || 1)}
                />
              </div>
              <div>
                <Label htmlFor="max_order">{t[language].maxOrder}</Label>
                <Input
                  id="max_order"
                  type="number"
                  value={product.max_order_quantity || ''}
                  onChange={(e) => handleInputChange('max_order_quantity', parseInt(e.target.value) || undefined)}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={product.is_featured}
                  onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
                />
                <Label htmlFor="featured">{t[language].featured}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={product.is_active}
                  onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                />
                <Label htmlFor="active">{t[language].active}</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>{t[language].features}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add new feature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
              />
              <Button type="button" onClick={addFeature}>
                {t[language].addFeature}
              </Button>
            </div>
            <div className="space-y-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{feature}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>{t[language].specifications}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                placeholder="Specification key"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
              />
              <Input
                placeholder="Specification value"
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
              />
              <Button type="button" onClick={addSpecification}>
                {t[language].addSpec}
              </Button>
            </div>
            <div className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex gap-4">
                    <span className="font-medium">{key}:</span>
                    <span>{String(value)}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecification(key)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>{t[language].images}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload
              onUpload={handleImageUpload}
              onDelete={handleImageDelete}
              folder="products"
              accept="image/*"
              maxSize={5 * 1024 * 1024} // 5MB
            />
            
            {product.image_urls.length > 0 && (
              <div className="space-y-2">
                <Label>{t[language].currentImages}</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.image_urls.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={imageUrl}
                        alt={`Product image ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover rounded-md border"
                        unoptimized
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImageByUrl(imageUrl)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader>
            <CardTitle>{t[language].seo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="meta_title_th">{t[language].metaTitleTh}</Label>
                <Input
                  id="meta_title_th"
                  value={product.meta_title_th || ''}
                  onChange={(e) => handleInputChange('meta_title_th', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="meta_title_en">{t[language].metaTitleEn}</Label>
                <Input
                  id="meta_title_en"
                  value={product.meta_title_en || ''}
                  onChange={(e) => handleInputChange('meta_title_en', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="meta_description_th">{t[language].metaDescriptionTh}</Label>
                <Textarea
                  id="meta_description_th"
                  value={product.meta_description_th || ''}
                  onChange={(e) => handleInputChange('meta_description_th', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="meta_description_en">{t[language].metaDescriptionEn}</Label>
                <Textarea
                  id="meta_description_en"
                  value={product.meta_description_en || ''}
                  onChange={(e) => handleInputChange('meta_description_en', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            {t[language].cancel}
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : t[language].save}
          </Button>
        </div>
      </form>
    </div>
  );
}

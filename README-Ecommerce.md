# การติดตั้งระบบ Ecommerce สำหรับ Y Solar Website

## ข้อกำหนดระบบ
- MySQL 5.7+ หรือ MariaDB 10.2+
- Node.js 18+
- Next.js 14+

## ขั้นตอนการติดตั้ง

### 1. ติดตั้งฐานข้อมูล
รัน SQL scripts ตามลำดับ:

```bash
# สร้างตารางและโครงสร้างฐานข้อมูล
mysql -u your_username -p your_database < scripts/05-create-ecommerce-schema.sql

# เพิ่มข้อมูลตัวอย่าง
mysql -u your_username -p your_database < scripts/06-seed-ecommerce-data.sql
```

### 2. ตรวจสอบการติดตั้ง
หลังจากรัน SQL scripts แล้ว ให้ตรวจสอบว่าตารางถูกสร้างขึ้นแล้ว:

```sql
-- ตรวจสอบตารางที่สร้างขึ้น
SHOW TABLES;

-- ตรวจสอบข้อมูลหมวดหมู่สินค้า
SELECT * FROM product_categories;

-- ตรวจสอบข้อมูลสินค้า
SELECT * FROM products LIMIT 5;

-- ตรวจสอบข้อมูลออร์เดอร์
SELECT * FROM orders LIMIT 5;
```

### 3. เริ่มต้นใช้งาน
1. รันเซิร์ฟเวอร์: `npm run dev`
2. เข้าสู่ระบบ admin: `/admin`
3. จัดการสินค้า: `/admin/products`
4. จัดการออร์เดอร์: `/admin/orders`
5. ดูสินค้าสำหรับผู้ใช้: `/products`

## โครงสร้างตารางฐานข้อมูล

### product_categories
- หมวดหมู่สินค้า
- รองรับภาษาไทยและอังกฤษ

### products
- ข้อมูลสินค้า
- รองรับ JSON สำหรับ specifications และ features
- มีระบบสต็อกและการจัดการราคา

### orders
- ข้อมูลออร์เดอร์
- รองรับทั้งการสั่งซื้อและขอใบเสนอราคา
- มีระบบติดตามสถานะ

### order_items
- รายการสินค้าในออร์เดอร์
- เก็บข้อมูลสินค้าแบบ snapshot

## คุณสมบัติหลัก

✅ **ระบบสินค้า**: เพิ่ม/แก้ไข/ลบสินค้า
✅ **ระบบออร์เดอร์**: สั่งซื้อ/ขอใบเสนอราคา
✅ **ระบบหมวดหมู่**: จัดกลุ่มสินค้า
✅ **ระบบค้นหา**: ค้นหาสินค้า
✅ **ระบบ Admin**: จัดการผ่านหลังบ้าน
✅ **Multilingual**: รองรับไทย/อังกฤษ
✅ **Responsive**: รองรับทุกขนาดหน้าจอ

## การแก้ไขปัญหา

### ปัญหา JSON ใน MySQL
หาก MySQL เวอร์ชันเก่าไม่รองรับ JSON type:
```sql
-- เปลี่ยน JSON เป็น TEXT
ALTER TABLE products MODIFY COLUMN specifications TEXT;
ALTER TABLE products MODIFY COLUMN features TEXT;
ALTER TABLE products MODIFY COLUMN image_urls TEXT;
```

### ปัญหา Trigger
หาก trigger ไม่ทำงาน:
```sql
-- ตรวจสอบ trigger
SHOW TRIGGERS;

-- ลบและสร้างใหม่
DROP TRIGGER IF EXISTS trigger_set_order_number;
-- รัน trigger code อีกครั้ง
```

## การบำรุงรักษา

### สำรองข้อมูล
```bash
# สำรองข้อมูลสินค้า
mysqldump -u username -p database_name products product_categories > products_backup.sql

# สำรองข้อมูลออร์เดอร์
mysqldump -u username -p database_name orders order_items > orders_backup.sql
```

### การอัปเดต
1. สำรองข้อมูลก่อนอัปเดต
2. รัน migration scripts ใหม่
3. ตรวจสอบข้อมูลหลังอัปเดต

## การติดต่อ
หากมีปัญหาหรือคำถามเกี่ยวกับระบบ ecommerce กรุณาติดต่อทีมพัฒนา

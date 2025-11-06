-- Script สำหรับรีเซ็ตรหัสผ่าน admin@ysolar.com
-- รหัสผ่านใหม่: admin123
-- ใช้ salt: dev_salt (ค่า default)
-- 
-- Hash ที่คำนวณแล้วสำหรับ password "admin123" + salt "dev_salt":
-- SHA256("admin123dev_salt") = c4bdc3f64012fa76a762c8e4358ecf43378b10566ce0547162e861246d82d2fa

-- วิธีใช้:
-- 1. เปลี่ยนรหัสผ่านใหม่ที่ต้องการใน script นี้
-- 2. คำนวณ hash ด้วยคำสั่ง: echo -n "รหัสผ่านใหม่dev_salt" | sha256sum
-- 3. รัน SQL script นี้ในฐานข้อมูล

-- อัปเดตรหัสผ่าน
UPDATE users 
SET password_hash = 'c4bdc3f64012fa76a762c8e4358ecf43378b10566ce0547162e861246d82d2fa', 
    updated_at = NOW() 
WHERE email = 'admin@ysolar.com';

-- ตรวจสอบผลลัพธ์
SELECT id, email, name, role, updated_at 
FROM users 
WHERE email = 'admin@ysolar.com';


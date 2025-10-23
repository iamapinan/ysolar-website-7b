-- Sample data for Ecommerce system (MySQL Compatible)
-- Created: 2024

-- Insert product categories
INSERT INTO product_categories (name_th, name_en, description_th, description_en, slug, sort_order) VALUES
('แผงโซลาร์เซลล์', 'Solar Panels', 'แผงโซลาร์เซลล์คุณภาพสูงสำหรับติดตั้งบนหลังคา', 'High-quality solar panels for rooftop installation', 'solar-panels', 1),
('อินเวอร์เตอร์', 'Inverters', 'อินเวอร์เตอร์แปลงไฟฟ้ากระแสตรงเป็นกระแสสลับ', 'Inverters for converting DC to AC power', 'inverters', 2),
('แบตเตอรี่', 'Batteries', 'แบตเตอรี่เก็บพลังงานสำหรับระบบโซลาร์', 'Energy storage batteries for solar systems', 'batteries', 3),
('อุปกรณ์ติดตั้ง', 'Installation Equipment', 'อุปกรณ์และเครื่องมือสำหรับติดตั้งระบบโซลาร์', 'Equipment and tools for solar system installation', 'installation-equipment', 4),
('อุปกรณ์เสริม', 'Accessories', 'อุปกรณ์เสริมและอะไหล่สำหรับระบบโซลาร์', 'Accessories and spare parts for solar systems', 'accessories', 5);

-- Insert sample products
INSERT INTO products (
    name_th, name_en, description_th, description_en, short_description_th, short_description_en,
    price, original_price, sku, category_id, brand, weight, dimensions, warranty_period,
    specifications, features, image_urls, is_featured, stock_quantity, min_order_quantity,
    meta_title_th, meta_title_en, meta_description_th, meta_description_en
) VALUES
(
    'แผงโซลาร์เซลล์ Mono PERC 550W', 
    'Mono PERC Solar Panel 550W',
    'แผงโซลาร์เซลล์แบบ Mono PERC ขนาด 550W เหมาะสำหรับการติดตั้งบนหลังคาบ้านและอาคารพาณิชย์ มีประสิทธิภาพสูงและทนทานต่อสภาพอากาศ',
    'Mono PERC solar panel with 550W capacity, perfect for residential and commercial rooftop installation. High efficiency and weather-resistant.',
    'แผงโซลาร์เซลล์ Mono PERC 550W ประสิทธิภาพสูง',
    'High-efficiency Mono PERC 550W solar panel',
    8500.00,
    9500.00,
    'SOLAR-550W-MONO',
    1,
    'Y Solar',
    25.5,
    '2279 x 1134 x 35 mm',
    25,
    JSON_OBJECT('cell_type', 'Mono PERC', 'power', '550W', 'efficiency', '21.2%', 'voltage', '41.1V', 'current', '13.4A', 'temperature_coefficient', '-0.35%/°C'),
    JSON_ARRAY('ประสิทธิภาพสูง', 'ทนทานต่อสภาพอากาศ', 'รับประกัน 25 ปี', 'ผ่านมาตรฐาน IEC 61215', 'เหมาะสำหรับหลังคา'),
    JSON_ARRAY('/images/products/solar-panel-550w-1.jpg', '/images/products/solar-panel-550w-2.jpg'),
    TRUE,
    50,
    1,
    'แผงโซลาร์เซลล์ Mono PERC 550W - Y Solar',
    'Mono PERC Solar Panel 550W - Y Solar',
    'แผงโซลาร์เซลล์ Mono PERC 550W ประสิทธิภาพสูง รับประกัน 25 ปี เหมาะสำหรับติดตั้งบนหลังคา',
    'High-efficiency Mono PERC 550W solar panel with 25-year warranty, perfect for rooftop installation'
),
(
    'อินเวอร์เตอร์ String 5kW',
    'String Inverter 5kW',
    'อินเวอร์เตอร์แบบ String ขนาด 5kW เหมาะสำหรับระบบโซลาร์ขนาดกลาง มีระบบตรวจสอบและควบคุมผ่านแอปพลิเคชัน',
    '5kW string inverter perfect for medium-sized solar systems. Features monitoring and control via mobile application.',
    'อินเวอร์เตอร์ String 5kW พร้อมระบบตรวจสอบ',
    '5kW String Inverter with monitoring system',
    25000.00,
    28000.00,
    'INV-5KW-STRING',
    2,
    'Y Solar',
    15.2,
    '450 x 350 x 150 mm',
    10,
    JSON_OBJECT('power', '5000W', 'efficiency', '97.5%', 'input_voltage', '150-1000V', 'output_voltage', '220V', 'frequency', '50Hz', 'protection', 'IP65'),
    JSON_ARRAY('ประสิทธิภาพสูง 97.5%', 'ระบบตรวจสอบผ่านแอป', 'ป้องกัน IP65', 'รับประกัน 10 ปี', 'ติดตั้งง่าย'),
    JSON_ARRAY('/images/products/inverter-5kw-1.jpg', '/images/products/inverter-5kw-2.jpg'),
    TRUE,
    25,
    1,
    'อินเวอร์เตอร์ String 5kW - Y Solar',
    'String Inverter 5kW - Y Solar',
    'อินเวอร์เตอร์ String 5kW ประสิทธิภาพสูง พร้อมระบบตรวจสอบผ่านแอปพลิเคชัน',
    'High-efficiency 5kW string inverter with mobile app monitoring system'
),
(
    'แบตเตอรี่ลิเธียม 5kWh',
    'Lithium Battery 5kWh',
    'แบตเตอรี่ลิเธียมขนาด 5kWh สำหรับเก็บพลังงานจากระบบโซลาร์ มีอายุการใช้งานยาวนานและปลอดภัย',
    '5kWh lithium battery for solar energy storage. Long lifespan and safe operation.',
    'แบตเตอรี่ลิเธียม 5kWh อายุการใช้งานยาวนาน',
    '5kWh Lithium Battery with long lifespan',
    45000.00,
    50000.00,
    'BAT-5KWH-LITHIUM',
    3,
    'Y Solar',
    45.0,
    '600 x 400 x 200 mm',
    10,
    JSON_OBJECT('capacity', '5000Wh', 'voltage', '48V', 'chemistry', 'LiFePO4', 'cycles', '6000+', 'efficiency', '95%', 'operating_temp', '-10°C to 60°C'),
    JSON_ARRAY('อายุการใช้งานยาวนาน', 'ปลอดภัย LiFePO4', 'รอบการชาร์จ 6000+', 'ประสิทธิภาพ 95%', 'รับประกัน 10 ปี'),
    JSON_ARRAY('/images/products/battery-5kwh-1.jpg', '/images/products/battery-5kwh-2.jpg'),
    TRUE,
    15,
    1,
    'แบตเตอรี่ลิเธียม 5kWh - Y Solar',
    'Lithium Battery 5kWh - Y Solar',
    'แบตเตอรี่ลิเธียม 5kWh สำหรับเก็บพลังงานโซลาร์ อายุการใช้งานยาวนาน',
    '5kWh lithium battery for solar energy storage with long lifespan'
),
(
    'โครงเหล็กติดตั้งแผงโซลาร์',
    'Solar Panel Mounting Structure',
    'โครงเหล็กสแตนเลสสำหรับติดตั้งแผงโซลาร์บนหลังคา ทนทานต่อสนิมและสภาพอากาศ',
    'Stainless steel mounting structure for rooftop solar panel installation. Rust-resistant and weatherproof.',
    'โครงเหล็กสแตนเลสติดตั้งแผงโซลาร์',
    'Stainless Steel Solar Panel Mounting Structure',
    3500.00,
    4000.00,
    'MOUNT-STRUCTURE-SS',
    4,
    'Y Solar',
    12.0,
    'Custom sizing',
    5,
    JSON_OBJECT('material', 'Stainless Steel 304', 'coating', 'Powder coating', 'load_capacity', '200kg/m²', 'wind_resistance', '60m/s', 'corrosion_resistance', 'Salt spray test 1000h'),
    JSON_ARRAY('สแตนเลส 304', 'ทนทานต่อสนิม', 'รับน้ำหนักได้ 200kg/m²', 'ทนลมแรง 60m/s', 'รับประกัน 5 ปี'),
    JSON_ARRAY('/images/products/mounting-structure-1.jpg', '/images/products/mounting-structure-2.jpg'),
    FALSE,
    100,
    1,
    'โครงเหล็กติดตั้งแผงโซลาร์ - Y Solar',
    'Solar Panel Mounting Structure - Y Solar',
    'โครงเหล็กสแตนเลสสำหรับติดตั้งแผงโซลาร์ ทนทานต่อสนิมและสภาพอากาศ',
    'Stainless steel mounting structure for solar panels, rust-resistant and weatherproof'
),
(
    'สายเคเบิล DC 4mm²',
    'DC Cable 4mm²',
    'สายเคเบิล DC ขนาด 4mm² สำหรับเชื่อมต่อแผงโซลาร์และอินเวอร์เตอร์ ทนทานต่อแสงแดดและความร้อน',
    '4mm² DC cable for connecting solar panels and inverters. UV-resistant and heat-resistant.',
    'สายเคเบิล DC 4mm² ทนแสงแดด',
    '4mm² DC Cable UV-resistant',
    45.00,
    50.00,
    'CABLE-DC-4MM',
    5,
    'Y Solar',
    0.5,
    '100m roll',
    2,
    JSON_OBJECT('conductor', 'Copper', 'insulation', 'XLPE', 'jacket', 'UV-resistant PVC', 'voltage', '1000V DC', 'temperature', '-40°C to 90°C', 'certification', 'IEC 60228'),
    JSON_ARRAY('ทองแดงบริสุทธิ์', 'ฉนวน XLPE', 'ทนแสงแดด', 'ทนความร้อน', 'มาตรฐาน IEC 60228'),
    JSON_ARRAY('/images/products/dc-cable-4mm-1.jpg'),
    FALSE,
    500,
    100,
    'สายเคเบิล DC 4mm² - Y Solar',
    'DC Cable 4mm² - Y Solar',
    'สายเคเบิล DC ขนาด 4mm² ทนแสงแดดและความร้อน เหมาะสำหรับระบบโซลาร์',
    'UV-resistant 4mm² DC cable for solar systems, heat-resistant and durable'
);

-- Insert sample orders
INSERT INTO orders (
    order_number, customer_name, customer_email, customer_phone, customer_address,
    customer_province, customer_district, order_type, status, payment_status,
    subtotal, total_amount, notes
) VALUES
(
    '241201-001',
    'สมชาย ใจดี',
    'somchai@email.com',
    '081-234-5678',
    '123 ถนนสุขุมวิท แขวงคลองตัน',
    'กรุงเทพมหานคร',
    'วัฒนา',
    'quote',
    'pending',
    'pending',
    34000.00,
    34000.00,
    'ต้องการติดตั้งระบบโซลาร์สำหรับบ้าน 2 ชั้น'
),
(
    '241201-002',
    'นางสมพร รักธรรมชาติ',
    'somporn@email.com',
    '082-345-6789',
    '456 ซอยลาดพร้าว 101',
    'กรุงเทพมหานคร',
    'จตุจักร',
    'purchase',
    'confirmed',
    'paid',
    70000.00,
    70000.00,
    'สั่งซื้อแผงโซลาร์และอินเวอร์เตอร์'
);

-- Insert sample order items
INSERT INTO order_items (
    order_id, product_id, product_name_th, product_name_en, product_sku,
    quantity, unit_price, total_price
) VALUES
(1, 1, 'แผงโซลาร์เซลล์ Mono PERC 550W', 'Mono PERC Solar Panel 550W', 'SOLAR-550W-MONO', 4, 8500.00, 34000.00),
(2, 1, 'แผงโซลาร์เซลล์ Mono PERC 550W', 'Mono PERC Solar Panel 550W', 'SOLAR-550W-MONO', 6, 8500.00, 51000.00),
(2, 2, 'อินเวอร์เตอร์ String 5kW', 'String Inverter 5kW', 'INV-5KW-STRING', 1, 25000.00, 25000.00);

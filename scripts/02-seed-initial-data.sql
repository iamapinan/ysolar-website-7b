-- Seed initial data for Y Solar (MariaDB / MySQL)

INSERT INTO companies (name, legal_name, description, address, phone, email, website)
VALUES
('Y Solar', 'Y Solar Co., Ltd.', 'Clean energy solutions provider focusing on solar rooftop, EV chargers, and maintenance.', 'Bangkok, Thailand', '+66-2-xxx-xxxx', 'info@ysolar.co.th', 'https://ysolar.example.com');

INSERT IGNORE INTO services (slug, title, summary, content, category, is_published)
VALUES
('solar-rooftop', 'Solar Rooftop', 'ออกแบบ ติดตั้ง ดูแลระบบโซลาร์รูฟครบวงจร', 'รายละเอียดบริการโซลาร์รูฟ...', 'solar', TRUE),
('ev-charger', 'EV Charger', 'ติดตั้งและอัพเกรดระบบชาร์จรถยนต์ไฟฟ้า', 'รายละเอียดบริการ EV...', 'ev', TRUE),
('maintenance', 'Maintenance', 'ดูแลบำรุงรักษาระบบอย่างมืออาชีพ', 'รายละเอียดบริการบำรุงรักษา...', 'maintenance', TRUE)
;

INSERT IGNORE INTO projects (title, slug, client_name, location, capacity_kw, roi_months, description, featured_image, is_published)
VALUES
('บ้านเดี่ยวกรุงเทพฯ 5kW', 'bangkok-home-5kw', 'คุณสมชาย', 'Bangkok', 5.00, 48, 'ติดตั้งระบบโซลาร์บนหลังคาขนาด 5kW', '/placeholder.jpg', TRUE),
('โรงงานอยุธยา 100kW', 'ayutthaya-factory-100kw', 'Ayutthaya Factory', 'Ayutthaya', 100.00, 36, 'ระบบโซลาร์อุตสาหกรรม 100kW', '/placeholder.jpg', TRUE)
;

INSERT IGNORE INTO articles (slug, title, summary, content, category, published_at, is_published)
VALUES
('news-001', 'เปิดตัวเว็บไซต์ Y Solar', 'ขับเคลื่อนพลังงานสะอาดสู่บ้านและธุรกิจ', 'เนื้อหาบทความ...', 'news', NOW(), TRUE),
('knowledge-solar-benefits', 'ข้อดีของโซลาร์เซลล์', 'ลดค่าไฟ ช่วยสิ่งแวดล้อม เพิ่มมูลค่าทรัพย์สิน', 'เนื้อหาความรู้...', 'knowledge', NOW(), TRUE)
;

INSERT INTO team_members (name, role, bio, photo_url)
VALUES
('Apinan', 'CEO', 'ผู้บริหารที่มุ่งมั่นพลังงานสะอาด', '/professional-ceo-portrait.png'),
('Engineer A', 'Lead Engineer', 'ผู้เชี่ยวชาญด้านระบบไฟฟ้าและโซลาร์', '/professional-engineer-portrait.png')
;

INSERT IGNORE INTO users (email, password_hash, name, role)
VALUES
('admin@ysolar.com', '$2a$10$zvz9BMYhWR5kKhOjizrHGuQR3eJgvB9w8ZcTMkUjLr2zDXdcvWFuC', 'Administrator', 'admin')
;



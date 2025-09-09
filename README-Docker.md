# Y Solar Website - Docker Setup

## Prerequisites

- Docker Desktop หรือ Docker Engine
- Docker Compose (ถ้าใช้ Docker Desktop จะมีมาพร้อมแล้ว)

## การใช้งาน

### 1. Build และรันด้วย Docker Compose (แนะนำ)

```bash
# Build และรัน container
docker-compose up --build

# รันในโหมด background
docker-compose up -d --build

# หยุดการทำงาน
docker-compose down
```

### 2. Build และรันด้วย Docker โดยตรง

```bash
# Build image
docker build -t ysolar-website .

# รัน container
docker run -p 3000:3000 ysolar-website

# รันในโหมด background
docker run -d -p 3000:3000 --name ysolar-website-container ysolar-website
```

## การเข้าถึงเว็บไซต์

หลังจากรัน container แล้ว สามารถเข้าถึงเว็บไซต์ได้ที่:
- http://localhost:3000

## การจัดการ Container

```bash
# ดู container ที่กำลังรัน
docker ps

# ดู logs
docker logs ysolar-website-container

# เข้าไปใน container
docker exec -it ysolar-website-container sh

# หยุด container
docker stop ysolar-website-container

# ลบ container
docker rm ysolar-website-container

# ลบ image
docker rmi ysolar-website
```

## Environment Variables

สามารถตั้งค่า environment variables ได้ใน `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - PORT=3000
  - HOSTNAME=0.0.0.0
  - DATABASE_URL=your_database_url
  - NEXT_PUBLIC_SITE_URL=your_site_url
```

## Health Check

Container มี health check ที่ตรวจสอบทุก 30 วินาที:
- ตรวจสอบว่าเว็บไซต์ตอบสนองที่ http://localhost:3000
- Timeout 10 วินาที
- Retry 3 ครั้ง
- เริ่มตรวจสอบหลังจาก 40 วินาที

## Production Deployment

สำหรับการ deploy ใน production:

1. ตั้งค่า environment variables ที่เหมาะสม
2. ใช้ reverse proxy (เช่น Nginx) หน้าต่อ
3. ตั้งค่า SSL certificate
4. ใช้ container orchestration (เช่น Kubernetes) สำหรับการ scale

## Troubleshooting

### Container ไม่เริ่มต้น
```bash
# ดู logs
docker logs ysolar-website-container

# ตรวจสอบว่า port 3000 ว่าง
netstat -tulpn | grep 3000
```

### Build ล้มเหลว
```bash
# ลบ cache และ build ใหม่
docker-compose build --no-cache

# หรือ
docker build --no-cache -t ysolar-website .
```

### Memory Issues
```bash
# จำกัด memory usage
docker run -m 512m -p 3000:3000 ysolar-website
```


# Assignment Jenosize Co., LTD

Repository นี้ เกิดขึ้นเพื่อนำไปสัมภาษณ์งานบริษัท Jenosize Co., LTD
โดยใช้ Stack Node, typescript, prisma, mongodb ในการพัฒนา โดยโปรเจคจะมี RESTAPI สำหรับการจัดการ products และการ Authentication ด้วย JWT เพื่อเข้าใช้งาน

# Start Project

เมื่อ Clone Repository นี้ลงไปที่เครื่องให้เข้า terminal ไปที่ path 
สร้างไฟล์ .env และกรอกข้อมูลตามด้านล่าง

 ```env
SERVER_PORT=9999
SERVER_SECRET_KEY="21w09wOtlRod3boHjBTNvijQhJZYqOUgQ"
DATABASE_URL="mongodb+srv://admin:cqAABvWjSlAgoCMA@cluster0.tmztz.mongodb.net/assignment-jenosize?retryWrites=true&w=majority&appName=Cluster0"
```

หลักจากนั้นทำการ install package เข้าสู่ project ด้วยคำสั่ง

```bash
npm install
npm run start
```

# Assignment 2 Script

ใน assignment ที่สอง จะเป็นการเขียน function เพื่อ run script ดังนั้นจะไม่มีการเปิดใช้งานผ่าน RESTAPI 

หากต้องการดูโค้ดสามารถดูได้ที่ path /src/adapter/service/assignment.service.ts

หากต้องการดูผลลัพท์ performance สามารถใช้คำสั่งด้านล่างเพื่อดู log ของ performance

```bash
npm run assignment
```

# API Documents

http://127.0.0.1:9999/documents
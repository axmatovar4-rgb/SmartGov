# Implementation Plan: SmartGov — Davlat Xizmatlari Platformasi

## Overview

SmartGov platformasini modulli tarzda amalga oshiramiz: avval loyiha tuzilmasi va ma'lumotlar qatlami, keyin har bir backend moduli (Auth, Users, Services, Applications, Notifications, Admin), so'ngra frontend qismi. Har bir modul uchun unit va property testlar yoziladi. Texnologiyalar: TypeScript, NestJS, Next.js, PostgreSQL, Prisma ORM, JWT, fast-check, Jest.

---

## Tasks

- [ ] 1. Loyiha tuzilmasi va asosiy konfiguratsiya
  - NestJS backend loyihasini yaratish (`nest new backend`)
  - Next.js frontend loyihasini yaratish (`npx create-next-app frontend --typescript --tailwind`)
  - Monorepo yoki ikki alohida papka tuzilmasini sozlash
  - `.env` fayllari va muhit o'zgaruvchilari shablonini (`DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`) yaratish
  - Jest va fast-check kutubxonalarini o'rnatish
  - _Requirements: 11.2, 11.3_

  - [ ] 1.1 Prisma sxemasini va ma'lumotlar bazasini sozlash
    - `prisma/schema.prisma` faylini yaratish: `User`, `Service`, `Application`, `ApplicationHistory`, `Notification` modellari
    - Barcha enum larni (`UserRole`, `ServiceCategory`, `ApplicationStatus`, `NotificationType`) qo'shish
    - `prisma migrate dev` bilan migratsiya ishlatish
    - `PrismaService` ni NestJS modul sifatida ro'yxatdan o'tkazish
    - _Requirements: 10.1, 10.2, 10.3_

  - [ ]* 1.2 PrismaService unit testi yozish
    - Ma'lumotlar bazasiga ulanishni tekshirish
    - _Requirements: 10.1_

- [ ] 2. Auth moduli — backend
  - [ ] 2.1 Auth DTO va validator larni yaratish
    - `LoginDto`, `RegisterDto`, `AuthTokensDto` class larini yaratish
    - `class-validator` dekoratorlari bilan `username` (3–50 belgi, lotin/raqam/`_`) va `password` (min 8, kamida 1 raqam) validatsiyasini qo'shish
    - _Requirements: 1.7, 1.8, 10.1, 10.4, 11.4_

  - [ ]* 2.2 Input validatsiya property testi yozish
    - **Property 11: Input Validatsiya To'liqligi**
    - `username` uchun: < 3 yoki > 50 belgi yoki lotin/raqam/`_` dan boshqa belgi bo'lsa `400` qaytarishini tekshirish
    - `password` uchun: < 8 belgi yoki raqamsiz bo'lsa `400` qaytarishini tekshirish
    - **Validates: Requirements 1.7, 1.8, 10.1, 10.2**

  - [ ] 2.3 AuthService ni yaratish
    - `register()`: parolni `bcrypt` (saltRounds=10) bilan hash qilish, `User` yaratish, `pinfl` yagonaligini tekshirish
    - `login()`: username bo'yicha foydalanuvchini topish, `bcrypt.compare()`, JWT `accessToken` (15 min) va `refreshToken` (7 kun) yaratish
    - `refreshToken()`: refresh tokenni tekshirib, yangi token juftini qaytarish
    - `logout()`: refresh tokenni bekor qilish
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6, 11.2_

  - [ ]* 2.4 Parol xeshlash property testi yozish
    - **Property 9: Parol Xeshlash Xavfsizligi**
    - Har qanday haqiqiy parol uchun: `bcrypt.hash` natijasi asl paroldan farqli; `bcrypt.compare(password, hash) = true`
    - **Validates: Requirements 1.6, 11.1**

  - [ ] 2.5 JWT Guard va Roles Guard yaratish
    - `JwtAuthGuard`: `Authorization: Bearer <token>` ni tekshirish, muddati tugagan/noto'g'ri token uchun `401`
    - `RolesGuard`: `@Roles('ADMIN')` dekoratori bilan `USER` ro'li uchun `/admin/*` endpointlariga `403`
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]* 2.6 RBAC property testi yozish
    - **Property 8: Rol Asosida Kirishni Boshqarish**
    - `USER` ro'li bilan `/admin/*` ga so'rov yuborsa `403`; tokensiz himoyalangan endpoint `401`
    - **Validates: Requirements 8.1, 8.2**

  - [ ] 2.7 AuthController va rate limiting ni sozlash
    - `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout` endpointlarini yaratish
    - `@nestjs/throttler` bilan login endpointida 5 daqiqada 10 ta urinish limitini qo'shish
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 11.1_

  - [ ]* 2.8 AuthController integration testi yozish
    - To'g'ri login ma'lumotlari bilan token qaytarishini; noto'g'ri parolda `401`; rate limit ishlaganini tekshirish
    - _Requirements: 1.1, 1.2, 11.1_

- [ ] 3. Checkpoint — Auth moduli
  - Barcha testlar o'tishini tekshirish. Agar savollar bo'lsa foydalanuvchiga murojaat qilish.

- [ ] 4. Users moduli — backend
  - [ ] 4.1 UsersService ni yaratish
    - `getProfile(userId)`: `passwordHash` dan tashqari barcha profil maydonlarini qaytarish
    - `updateProfile(userId, dto)`: `fullName`, `phoneNumber`, `email` ni yangilash
    - `changePassword(userId, dto)`: joriy parolni tekshirish, yangi parolni hash qilib saqlash
    - _Requirements: 2.1, 2.2, 2.3, 2.5_

  - [ ] 4.2 UsersController yaratish
    - `GET /users/profile`, `PATCH /users/profile`, `PATCH /users/change-password` endpointlari
    - `JwtAuthGuard` bilan himoya qilish; boshqa foydalanuvchi profiliga kirishda `403`
    - _Requirements: 2.1, 2.4_

  - [ ]* 4.3 Ma'lumot izolyatsiyasi property testi yozish
    - **Property 2: Ma'lumot Izolyatsiyasi**
    - Ikki turli `userId` uchun: birinchisining profil/arizalar/bildirishnomalari ikkinchisining yozuvlarini o'z ichiga olmasligi
    - **Validates: Requirements 2.1, 5.1, 5.3, 7.1, 7.5**

- [ ] 5. Services moduli (Xizmatlar Katalogi) — backend
  - [ ] 5.1 ServicesService ni yaratish
    - `findAll()`: faqat `isActive: true` xizmatlarni qaytarish
    - `findById(id)`: `formSchema` va `requiredDocuments` bilan qaytarish; topilmasa `404`
    - `create(dto)`, `update(id, dto)`, `delete(id)`: admin operatsiyalari
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ] 5.2 ServicesController yaratish
    - `GET /services`, `GET /services/:id` — authenticated foydalanuvchilar uchun
    - `POST /admin/services`, `PATCH /admin/services/:id`, `DELETE /admin/services/:id` — faqat `ADMIN`
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ]* 5.3 Aktiv xizmatlar filtri property testi yozish
    - **Property 12: Aktiv Xizmatlar Filtri Invarianti**
    - `findAll()` dan qaytgan barcha xizmatlar `isActive = true`; `isActive = false` xizmat hech qachon ko'rinmasligi
    - **Validates: Requirements 3.1, 3.5**

- [ ] 6. Holat o'tishi va FormData validatsiya funksiyalari
  - [ ] 6.1 `validateStatusTransition` funksiyasini yaratish
    - `SUBMITTED → IN_REVIEW`, `IN_REVIEW → APPROVED`, `IN_REVIEW → REJECTED` uchun `true`; qolgan barcha holatlarda `false`
    - `APPROVED` va `REJECTED` terminal holatlar — istalgan o'tish `false`
    - Bir xil holatga o'tish `false`
    - `translateStatus` funksiyasini yaratish: `ApplicationStatus` → o'zbek tili matni
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ]* 6.2 Holat mashini to'liqligi property testi yozish
    - **Property 1: Holat Mashini To'liqligi**
    - Har qanday `currentStatus` va `newStatus` kombinatsiyasi uchun faqat ruxsat etilgan o'tishlar `true`; terminal holatlar va bir xil holat `false`
    - `translateStatus` round-trip: holat → matn → holat validatsiyasi bir xil natija
    - **Validates: Requirements 6.1, 6.3, 6.4, 12.1, 12.2, 12.3**

  - [ ] 6.3 `validateFormData` funksiyasini yaratish
    - `required: true` va bo'sh/null qiymat → `{ isValid: false, errors: [...] }`
    - `type: 'date'` va noto'g'ri format → xato qo'shish
    - `type: 'select'` va `options` dan tashqari qiymat → xato qo'shish
    - To'g'ri ma'lumotlar → `{ isValid: true, errors: [] }`
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

  - [ ]* 6.4 FormData validatsiya round-trip property testi yozish
    - **Property 5: FormData Validatsiya Round-Trip**
    - To'g'ri `formData` bilan `isValid: true` va `errors: []`; `required: true` maydonga `null`/bo'sh berilsa `isValid: false`
    - **Validates: Requirements 4.4, 13.1, 13.2, 13.3, 13.4**

- [ ] 7. Applications moduli — backend
  - [ ] 7.1 ApplicationsService ni yaratish
    - `submit(userId, dto)`: `serviceId` mavjudligi va `isActive` ni tekshirish, `validateFormData` ni ishlatish, `Application` yaratish (status=`SUBMITTED`), `ApplicationHistory` ga birinchi yozuv qo'shish, `Notifications_Service.create()` ni chaqirish
    - `findAllByUser(userId)`: faqat shu foydalanuvchining arizalarini qaytarish
    - `findById(id, userId)`: `statusHistory` bilan qaytarish; boshqa foydalanuvchining arizasi `403`; topilmasa `404`
    - `trackStatus(applicationId)`: joriy holat va tarixni qaytarish
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2, 5.3, 5.4_

  - [ ]* 7.2 Ariza yaratish invarianti property testi yozish
    - **Property 3: Ariza Yaratish Invarianti**
    - To'g'ri `userId`, `serviceId`, `formData` bilan: `status = SUBMITTED`, `ApplicationHistory` da ≥ 1 yozuv, `APPLICATION_SUBMITTED` bildirishnomasi yaratilgan
    - **Validates: Requirements 4.1, 4.2, 4.3**

  - [ ]* 7.3 FormData o'zgarmasligi property testi yozish
    - **Property 4: FormData Immutability**
    - Yuborilgan `formData` bazaga saqlangandan keyin qayta o'qiganda asl ma'lumotlar bilan bit-for-bit ekvivalent
    - **Validates: Requirements 4.5, 10.4**

  - [ ] 7.4 ApplicationsController yaratish
    - `POST /applications`, `GET /applications`, `GET /applications/:id`, `GET /applications/:id/track` endpointlari
    - Barcha endpointlar `JwtAuthGuard` bilan himoya qilingan
    - _Requirements: 4.1, 5.1, 5.2, 5.3, 5.4_

- [ ] 8. Notifications moduli — backend
  - [ ] 8.1 NotificationsService ni yaratish
    - `create(dto)`: bildirishnoma yaratish va bazaga saqlash
    - `findAllByUser(userId)`: faqat shu foydalanuvchi bildirishnomalarini `createdAt` kamayish tartibida qaytarish
    - `markAsRead(id, userId)`: `isRead = true`; boshqa foydalanuvchinikida `403`
    - `markAllAsRead(userId)`: barcha `isRead: false` yozuvlarni `true` qilish
    - `getUnreadCount(userId)`: `isRead: false` sonini qaytarish
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 8.2 markAllAsRead round-trip property testi yozish
    - **Property 10: Bildirishnomalar markAllAsRead Round-Trip**
    - `markAllAsRead(userId)` dan keyin `getUnreadCount(userId) = 0`; barcha bildirishnomalar `isRead = true`
    - **Validates: Requirements 7.3, 7.4**

  - [ ] 8.3 NotificationsController yaratish
    - `GET /notifications`, `PATCH /notifications/:id/read`, `PATCH /notifications/read-all`, `GET /notifications/unread-count` endpointlari
    - `JwtAuthGuard` bilan himoya qilish
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 9. Admin moduli — backend
  - [ ] 9.1 AdminService ni yaratish
    - `getAllUsers(query)`: `page`, `limit`, `search` bilan paginated foydalanuvchilar ro'yxati
    - `getUserById(id)`: foydalanuvchi profili
    - `updateUserRole(id, role)`: rolni o'zgartirish (faqat `ADMIN` bajara oladi)
    - `getAllApplications(query)`: `status`, `serviceId`, `fromDate`, `toDate` filtrlari va pagination
    - `updateApplicationStatus(id, dto)`: `validateStatusTransition` orqali tekshirish, holat yangilash, `ApplicationHistory` yozuvi, `STATUS_CHANGED` bildirishnomasi
    - `getStatistics()`: jami foydalanuvchilar, arizalar, holat va xizmat bo'yicha statistika
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 8.4, 9.1, 9.2, 9.3_

  - [ ]* 9.2 Holat o'zgarishi bildirishnoma kafolati property testi yozish
    - **Property 6: Holat O'zgarishi Bildirishnoma Kafolati**
    - Har qanday muvaffaqiyatli holat o'zgarishidan so'ng ariza egasiga `STATUS_CHANGED` bildirishnomasi yaratilgan va `findAllByUser` da ko'rinadigan
    - **Validates: Requirements 6.2, 7.1**

  - [ ] 9.3 AdminController yaratish
    - `GET /admin/users`, `GET /admin/users/:id`, `PATCH /admin/users/:id/role`
    - `GET /admin/applications`, `PATCH /admin/applications/:id`
    - `GET /admin/statistics`
    - Barcha endpointlar `@Roles('ADMIN')` va `JwtAuthGuard` bilan himoyalangan
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 8.1, 8.4, 9.1, 9.2_

- [ ] 10. PINFL va Username yagonaligi
  - [ ] 10.1 Database UNIQUE constraint va service qatlami tekshiruvini sozlash
    - Prisma `@@unique` constraint larini `username`, `pinfl`, `email` uchun tasdiqlash
    - `register()` da `username` va `pinfl` duplikatlarini `409 Conflict` bilan qaytarish
    - _Requirements: 1.3, 10.3_

  - [ ]* 10.2 Yagonalik invarianti property testi yozish
    - **Property 7: PINFL va Username Yagonaligi**
    - Ikki turli foydalanuvchi uchun: `pinfl != null` bo'lsa ular bir xil bo'lmasligi; `username` lar bir xil bo'lmasligi
    - **Validates: Requirements 1.3, 10.3**

- [ ] 11. Global Exception Filter va CORS sozlamalari
  - [ ] 11.1 GlobalExceptionFilter ni yaratish va ro'yxatdan o'tkazish
    - `HttpException` ni `statusCode`, `message`, `timestamp` formatida qaytarish
    - Noma'lum xatolar uchun `500` qaytarish
    - `main.ts` da filterni global sifatida ro'yxatdan o'tkazish
    - CORS ni `FRONTEND_URL` muhit o'zgaruvchisiga asosan sozlash
    - _Requirements: 11.3_

  - [ ] 11.2 Xavfsizlik konfiguratsiyasini sozlash
    - JWT secretni faqat `process.env.JWT_SECRET` dan o'qish (hardcode qilmaslik)
    - `@nestjs/config` bilan muhit o'zgaruvchilarini boshqarish
    - _Requirements: 11.2_

- [ ] 12. Checkpoint — Backend to'liq
  - Barcha backend testlar o'tishini tekshirish. Agar savollar bo'lsa foydalanuvchiga murojaat qilish.

- [ ] 13. Frontend — Auth va Layout
  - [ ] 13.1 Next.js loyiha tuzilmasi va autentifikatsiya kontekstini yaratish
    - `AuthContext` va `useAuth` hook yaratish (localStorage yoki httpOnly cookie bilan token saqlash)
    - Login sahifasi (`/login`): `LoginDto` bilan forma, token saqlash, dashboardga yo'naltirish
    - Ro'yxatdan o'tish sahifasi (`/register`): `RegisterDto` bilan forma va validatsiya
    - `ProtectedRoute` komponenti: token bo'lmasa loginга yo'naltirish
    - _Requirements: 1.1, 1.2, 1.7, 1.8_

  - [ ] 13.2 Asosiy layout va navigatsiya komponentlarini yaratish
    - Header, Sidebar, main layout komponentlari (Tailwind CSS)
    - Foydalanuvchi roli asosida (`USER`/`ADMIN`) navigatsiya menyusini ko'rsatish
    - _Requirements: 8.1, 8.2_

- [ ] 14. Frontend — Foydalanuvchi sahifalari
  - [ ] 14.1 Xizmatlar katalogi sahifasini yaratish
    - `GET /services` dan xizmatlarni olish va kartalar sifatida ko'rsatish
    - Xizmat tafsilotlari sahifasi (`/services/:id`): `formSchema` asosida dinamik forma render qilish
    - _Requirements: 3.1, 3.2_

  - [ ] 14.2 Ariza yuborish formasini yaratish
    - `formSchema` dan dinamik forma generatsiya qilish (`text`, `date`, `select`, `file`, `number` turlari)
    - `POST /applications` ga formani yuborish va tasdiqlash xabarini ko'rsatish
    - Xato xabarlarini (`400` validatsiya xatolari) forma maydonlari yonida ko'rsatish
    - _Requirements: 4.1, 4.4_

  - [ ] 14.3 Arizalar tarixi va kuzatish sahifasini yaratish
    - `GET /applications` dan foydalanuvchi arizalari ro'yxatini ko'rsatish
    - `GET /applications/:id` dan ariza tafsiloti va `statusHistory` ni timeline sifatida ko'rsatish
    - _Requirements: 5.1, 5.2_

  - [ ] 14.4 Bildirishnomalar komponentini yaratish
    - Header da bildirishnoma bell ikonasi va o'qilmagan son ko'rsatkichi
    - Bildirishnomalar dropdown yoki sahifasi: ro'yxat, o'qilgan/o'qilmagan holati
    - "Barchasini o'qilgan deb belgilash" tugmasi
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ] 14.5 Profil boshqaruvi sahifasini yaratish
    - Profil ko'rish va tahrirlash (`fullName`, `phoneNumber`, `email`) formasi
    - Parol o'zgartirish formasi
    - _Requirements: 2.1, 2.2, 2.3_

- [ ] 15. Frontend — Admin panel
  - [ ] 15.1 Admin arizalar boshqaruvi sahifasini yaratish
    - `GET /admin/applications` dan filtrlangan va paginated arizalar jadvalini ko'rsatish
    - Holat filtri (`status`), xizmat filtri (`serviceId`), sana filtri (`fromDate`, `toDate`)
    - Ariza tafsiloti sahifasi: holat o'zgartirish dropdown (`validateStatusTransition` ga mos), izoh maydoni
    - `PATCH /admin/applications/:id` bilan holat yangilash
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ] 15.2 Admin foydalanuvchilar boshqaruvi sahifasini yaratish
    - `GET /admin/users` dan paginated foydalanuvchilar jadvalini ko'rsatish (`search` bilan)
    - Foydalanuvchi roli o'zgartirish (`USER` ↔ `ADMIN`)
    - _Requirements: 8.4, 9.2_

  - [ ] 15.3 Admin xizmatlar boshqaruvi sahifasini yaratish
    - Xizmatlar ro'yxati, yangi xizmat yaratish formasi (`formSchema` JSON redaktori bilan)
    - Mavjud xizmatni tahrirlash, `isActive` ni o'zgartirish
    - _Requirements: 3.4, 3.5_

  - [ ] 15.4 Admin statistika dashboard sahifasini yaratish
    - `GET /admin/statistics` dan jami foydalanuvchilar, arizalar, holat bo'yicha statistika ko'rsatish
    - Xizmat bo'yicha arizalar soni jadval yoki grafik sifatida
    - _Requirements: 9.1, 9.3_

- [ ] 16. Final checkpoint — Barcha testlar va integratsiya
  - Barcha backend unit, property va integration testlar o'tishini tekshirish.
  - Frontend va backend integratsiyasini end-to-end sinovdan o'tkazish.
  - Agar savollar bo'lsa foydalanuvchiga murojaat qilish.

---

## Notes

- `*` bilan belgilangan sub-tasklar ixtiyoriy (optional) va tezkor MVP uchun o'tkazib yuborilishi mumkin
- Har bir task tegishli requirements ga havola qiladi (traceability uchun)
- Property testlar `fast-check` kutubxonasi bilan yoziladi
- Unit testlar Jest bilan yoziladi
- Checkpoint lardan so'ng keyingi fazaga o'tiladi
- Backend va frontend mustaqil ishga tushiriladi: NestJS port 3001, Next.js port 3000

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "2.1", "4.1", "5.1", "6.1", "6.3", "8.1", "10.1", "11.1", "11.2"] },
    { "id": 2, "tasks": ["2.2", "2.3", "5.2", "6.2", "6.4", "8.2", "10.2"] },
    { "id": 3, "tasks": ["2.4", "2.5", "4.2", "5.3", "7.1", "9.1"] },
    { "id": 4, "tasks": ["2.6", "2.7", "4.3", "7.2", "7.3", "9.2"] },
    { "id": 5, "tasks": ["2.8", "7.4", "8.3", "9.3"] },
    { "id": 6, "tasks": ["13.1", "13.2"] },
    { "id": 7, "tasks": ["14.1", "14.2", "14.3", "14.4", "14.5", "15.1", "15.2", "15.3", "15.4"] }
  ]
}
```

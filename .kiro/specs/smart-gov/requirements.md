# Requirements Document

## Introduction

SmartGov — fuqarolarga davlat xizmatlarini onlayn tarzda taqdim etuvchi to'liq stekli veb-platforma. Tizim foydalanuvchilarga tug'ilganlik, talabalik va yashash joyi ma'lumotnomalarini so'rash, ariza holatini real vaqtda kuzatish hamda bildirishnomalar olish imkonini beradi. Admin panel orqali davlat xizmatchilari arizalarni boshqaradi, xizmatlarni sozlaydi va statistikani kuzatadi.

Platforma Next.js (frontend), NestJS (backend), PostgreSQL (ma'lumotlar bazasi), Prisma ORM va JWT autentifikatsiyasiga asoslangan.

---

## Glossary

- **Tizim**: SmartGov platformasining backend va frontend qismlarini o'z ichiga olgan to'liq majmua
- **Auth_Service**: Foydalanuvchi autentifikatsiyasi va JWT token boshqaruvini amalga oshiruvchi modul
- **Users_Service**: Foydalanuvchi profil ma'lumotlarini boshqaruvchi modul
- **Services_Service**: Davlat xizmatlari katalogini boshqaruvchi modul
- **Applications_Service**: Ariza yuborish, kuzatish va tarixini boshqaruvchi modul
- **Notifications_Service**: Foydalanuvchilarga bildirishnomalar yuboruvchi modul
- **Admin_Service**: Tizimni boshqarish uchun admin operatsiyalarini bajaruvchi modul
- **JWT_Guard**: Himoyalangan endpointlarga kirishni JWT token orqali tekshiruvchi qo'riqchi
- **Foydalanuvchi**: `USER` rolidagi ro'yxatdan o'tgan shaxs
- **Admin**: `ADMIN` rolidagi davlat xizmatchisi
- **Ariza**: Foydalanuvchi tomonidan yuborilgan xizmat so'rovi
- **FormSchema**: Xizmat uchun dinamik forma tuzilmasini belgilovchi JSON konfiguratsiya
- **JSHSHIR (PINFL)**: O'zbekiston fuqarosining shaxsiy identifikatsion raqami (14 raqam)
- **ApplicationStatus**: Arizaning joriy holati — `SUBMITTED`, `IN_REVIEW`, `APPROVED`, `REJECTED`
- **AccessToken**: 15 daqiqa muddatli JWT autentifikatsiya tokeni
- **RefreshToken**: 7 kun muddatli JWT yangilash tokeni

---

## Requirements

### Talab 1: Foydalanuvchi Ro'yxatdan O'tishi va Autentifikatsiya

**Foydalanuvchi tarixi:** Fuqaro sifatida men tizimga ro'yxatdan o'tmoqchi va kirishim kerak, shunda men davlat xizmatlaridan foydalana olaman.

#### Qabul Qilish Mezonlari

1. WHEN foydalanuvchi to'g'ri `username` va `password` bilan `/auth/login` ga so'rov yuborsa, THE Auth_Service SHALL `accessToken` (15 daqiqa) va `refreshToken` (7 kun) qaytaradi
2. WHEN foydalanuvchi noto'g'ri `username` yoki `password` bilan login qilishga urinsa, THE Auth_Service SHALL `401 Unauthorized` xatosi va "Username yoki parol noto'g'ri" xabarini qaytaradi
3. WHEN yangi foydalanuvchi ro'yxatdan o'tsa va `pinfl` maydoni berilgan bo'lsa, THE Auth_Service SHALL tizimda allaqachon mavjud bo'lgan PINFL bilan ro'yxatdan o'tishni rad etadi
4. WHEN foydalanuvchi haqiqiy `refreshToken` bilan token yangilash so'rovini yuborsa, THE Auth_Service SHALL yangi `accessToken` va `refreshToken` juftligini qaytaradi
5. WHEN `accessToken` ning muddati tugasa, THE Auth_Service SHALL keyingi API so'rovlariga `401 Unauthorized` qaytaradi
6. THE Auth_Service SHALL parollarni `bcrypt` (saltRounds=10) algoritmi bilan hash qiladi va ochiq matnda hech qachon saqlamaydi
7. WHEN foydalanuvchi ro'yxatdan o'tayotganda `username` 3 belgidan kam yoki 50 belgidan ko'p bo'lsa, THE Auth_Service SHALL `400 Bad Request` xatosi qaytaradi
8. WHEN foydalanuvchi ro'yxatdan o'tayotganda `password` 8 belgidan kam yoki kamida 1 ta raqam bo'lmasa, THE Auth_Service SHALL `400 Bad Request` xatosi qaytaradi

---

### Talab 2: Foydalanuvchi Profil Boshqaruvi

**Foydalanuvchi tarixi:** Tizimga kirgan foydalanuvchi sifatida men profilimni ko'rmoqchi va yangilashim kerak, shunda ma'lumotlarim to'g'ri va dolzarb bo'lsin.

#### Qabul Qilish Mezonlari

1. WHEN autentifikatsiyadan o'tgan foydalanuvchi o'z profil sahifasiga kirishni so'rasa, THE Users_Service SHALL faqat shu foydalanuvchiga tegishli profil ma'lumotlarini qaytaradi (`passwordHash` maydoni bundan mustasno)
2. WHEN foydalanuvchi profil ma'lumotlarini (`fullName`, `phoneNumber`, `email`) yangilasa, THE Users_Service SHALL o'zgartirilgan ma'lumotlarni bazaga saqlaydi va yangilangan profilni qaytaradi
3. WHEN foydalanuvchi parolini o'zgartirsa, THE Users_Service SHALL avval joriy parolni tekshiradi, keyin yangi parolni `bcrypt` bilan hash qilib saqlaydi
4. IF foydalanuvchi boshqa foydalanuvchi profiliga kirmoqchi bo'lsa, THEN THE JWT_Guard SHALL `403 Forbidden` xatosi qaytaradi
5. THE Users_Service SHALL response lardan `passwordHash` maydonini hech qachon qaytarmaydi

---

### Talab 3: Davlat Xizmatlari Katalogi

**Foydalanuvchi tarixi:** Fuqaro sifatida men mavjud davlat xizmatlarini ko'rmoqchi va tanlashim kerak, shunda kerakli xizmatni topib ariza bera olaman.

#### Qabul Qilish Mezonlari

1. WHEN autentifikatsiyadan o'tgan foydalanuvchi xizmatlar katalogiga so'rov yuborsa, THE Services_Service SHALL faqat `isActive: true` bo'lgan xizmatlar ro'yxatini qaytaradi
2. WHEN foydalanuvchi ma'lum bir xizmat tafsilotini so'rasa, THE Services_Service SHALL xizmatning `formSchema` (dinamik forma tuzilmasi) va `requiredDocuments` ma'lumotlarini qaytaradi
3. IF so'ralgan xizmat mavjud bo'lmasa, THEN THE Services_Service SHALL `404 Not Found` xatosi qaytaradi
4. WHERE Admin funksiyasi faol bo'lsa, THE Admin_Service SHALL yangi xizmat yaratish, mavjud xizmatni yangilash va o'chirish imkonini beradi
5. WHEN admin xizmatni `isActive: false` qilib belgilasa, THE Services_Service SHALL bu xizmatni katalog ro'yxatidan chiqaradi

---

### Talab 4: Ariza Yuborish

**Foydalanuvchi tarixi:** Fuqaro sifatida men tanlangan xizmat uchun ariza berishim kerak, shunda davlat xizmatini rasmiy ravishda so'ray olaman.

#### Qabul Qilish Mezonlari

1. WHEN autentifikatsiyadan o'tgan foydalanuvchi to'g'ri `serviceId` va tegishli `formData` bilan ariza yuborsa, THE Applications_Service SHALL yangi ariza yaratadi va boshlang'ich holatni `SUBMITTED` deb belgilaydi
2. WHEN yangi ariza muvaffaqiyatli yaratilsa, THE Applications_Service SHALL `ApplicationHistory` jadvaliga birinchi yozuv (`SUBMITTED` holati, timestamp bilan) qo'shadi
3. WHEN ariza muvaffaqiyatli qabul qilinsa, THE Notifications_Service SHALL `APPLICATION_SUBMITTED` turidagi bildirishnoma yaratadi
4. IF yuborilgan `formData` tegishli xizmatning `formSchema` siga muvofiq validatsiyadan o'tmasa, THEN THE Applications_Service SHALL `400 Bad Request` va xato maydonlar ro'yxatini qaytaradi
5. IF yuborilgan `serviceId` mavjud bo'lmasa yoki `isActive: false` bo'lsa, THEN THE Applications_Service SHALL `400 Bad Request` xatosi qaytaradi
6. THE Applications_Service SHALL ariza saqlangandan so'ng asl `formData` maydonlarini o'zgartirmaydi

---

### Talab 5: Ariza Holatini Kuzatish

**Foydalanuvchi tarixi:** Ariza bergan fuqaro sifatida men arizamning joriy holatini va tarixini kuzatmoqchi, shunda jarayon qayerda ekanligini bilaman.

#### Qabul Qilish Mezonlari

1. WHEN autentifikatsiyadan o'tgan foydalanuvchi o'ziga tegishli ariza tafsilotini so'rasa, THE Applications_Service SHALL arizaning joriy holati, `formData` va to'liq `statusHistory` (vaqt tamg'asi bilan) ni qaytaradi
2. WHEN foydalanuvchi o'z arizalari ro'yxatini so'rasa, THE Applications_Service SHALL faqat shu foydalanuvchiga tegishli arizalar ro'yxatini qaytaradi
3. IF foydalanuvchi boshqa foydalanuvchining arizasiga kirishga urinsa, THEN THE Applications_Service SHALL `403 Forbidden` xatosi qaytaradi
4. IF so'ralgan ariza identifikatori mavjud bo'lmasa, THEN THE Applications_Service SHALL `404 Not Found` xatosi qaytaradi

---

### Talab 6: Admin Tomonidan Ariza Boshqaruvi

**Foydalanuvchi tarixi:** Admin sifatida men arizalarni ko'rib chiqishim va holatini yangilashim kerak, shunda fuqarolarga xizmat ko'rsatish jarayonini boshqara olaman.

#### Qabul Qilish Mezonlari

1. WHEN admin mavjud arizaning holatini `SUBMITTED → IN_REVIEW`, `IN_REVIEW → APPROVED` yoki `IN_REVIEW → REJECTED` tartibida yangilasa, THE Admin_Service SHALL holat o'zgarishini bazaga saqlaydi va `ApplicationHistory` ga yangi yozuv qo'shadi
2. WHEN admin ariza holatini yangilasa, THE Notifications_Service SHALL ariza egasiga `STATUS_CHANGED` turidagi bildirishnoma yuboradi
3. IF admin ruxsat etilmagan holat o'tishini (`APPROVED → IN_REVIEW`, `REJECTED → SUBMITTED` va h.k.) bajarishga urinsa, THEN THE Admin_Service SHALL `400 Bad Request` va "Bu holat o'tishi ruxsat etilmagan" xabarini qaytaradi
4. IF admin allaqachon yakunlangan (`APPROVED` yoki `REJECTED`) arizaning holatini o'zgartirishga urinsa, THEN THE Admin_Service SHALL `400 Bad Request` xatosi qaytaradi
5. WHEN admin barcha arizalar ro'yxatini so'rasa, THE Admin_Service SHALL `status`, `serviceId`, `fromDate`, `toDate` filtrlari va pagination (`page`, `limit`) bilan filtrlangan natija qaytaradi

---

### Talab 7: Foydalanuvchi Bildirishnomalari

**Foydalanuvchi tarixi:** Foydalanuvchi sifatida men arizam holati haqida bildirishnomalar olishim kerak, shunda muhim o'zgarishlardan xabardor bo'laman.

#### Qabul Qilish Mezonlari

1. WHEN autentifikatsiyadan o'tgan foydalanuvchi o'z bildirishnomalari ro'yxatini so'rasa, THE Notifications_Service SHALL faqat shu foydalanuvchiga tegishli bildirishnomalarni `createdAt` bo'yicha kamayish tartibida qaytaradi
2. WHEN foydalanuvchi bildirishnomani o'qilgan deb belgilasa, THE Notifications_Service SHALL tegishli bildirishnomaning `isRead` maydonini `true` ga o'zgartiradi
3. WHEN foydalanuvchi barcha bildirishnomalarini o'qilgan deb belgilasa, THE Notifications_Service SHALL shu foydalanuvchining barcha `isRead: false` bildirishnomalarini `true` ga o'zgartiradi
4. WHEN foydalanuvchi o'qilmagan bildirishnomalar sonini so'rasa, THE Notifications_Service SHALL faqat shu foydalanuvchiga tegishli `isRead: false` bildirishnomalar sonini qaytaradi
5. IF foydalanuvchi boshqa foydalanuvchining bildirishnomasini o'qilgan deb belgilashga urinsa, THEN THE Notifications_Service SHALL `403 Forbidden` xatosi qaytaradi

---

### Talab 8: Rol Asosida Kirishni Boshqarish (RBAC)

**Foydalanuvchi tarixi:** Tizim operatori sifatida men admin funksiyalari faqat vakolatli xizmatchilarga ochiq bo'lishini talab qilaman, shunda tizim xavfsizligi ta'minlansin.

#### Qabul Qilish Mezonlari

1. WHEN `USER` rolidagi foydalanuvchi `/admin/*` prefiksli biror endpointga so'rov yuborsa, THE JWT_Guard SHALL `403 Forbidden` xatosi qaytaradi
2. WHEN autentifikatsiyasiz (token yo'q) biror himoyalangan endpointga so'rov yuborsa, THE JWT_Guard SHALL `401 Unauthorized` xatosi qaytaradi
3. WHEN muddati o'tgan yoki noto'g'ri `accessToken` bilan so'rov yuborsa, THE JWT_Guard SHALL `401 Unauthorized` xatosi qaytaradi
4. THE Admin_Service SHALL foydalanuvchi rolini `USER` dan `ADMIN` ga yoki teskari o'zgartirish imkonini faqat `ADMIN` rolidagi foydalanuvchiga beradi

---

### Talab 9: Admin Statistika va Hisobot

**Foydalanuvchi tarixi:** Admin sifatida men tizim statistikasini ko'rmoqchi, shunda platforma faoliyatini tahlil qila olaman.

#### Qabul Qilish Mezonlari

1. WHEN admin statistika endpointiga so'rov yuborsa, THE Admin_Service SHALL jami foydalanuvchilar soni, jami arizalar soni, har bir holat bo'yicha arizalar soni va har bir xizmat bo'yicha arizalar sonini qaytaradi
2. WHEN admin foydalanuvchilar ro'yxatini so'rasa, THE Admin_Service SHALL `page`, `limit` va `search` parametrlari bilan paginated natija qaytaradi
3. THE Admin_Service SHALL statistika ma'lumotlarini haqiqiy vaqtda (real-time) bazadan hisob-kitob qilib qaytaradi

---

### Talab 10: Ma'lumot Yaxlitligi va Validatsiya

**Foydalanuvchi tarixi:** Tizim arxitektori sifatida men barcha ma'lumotlar to'g'ri formatda saqlanishini talab qilaman, shunda ma'lumotlar bazasida buzilgan yozuvlar bo'lmasin.

#### Qabul Qilish Mezonlari

1. THE Tizim SHALL `username` maydoni uchun 3–50 belgi, faqat lotin harflari, raqamlar va `_` belgisi qoidasini qo'llaydi
2. THE Tizim SHALL `pinfl` maydoni uchun aniq 14 ta raqamdan iborat bo'lish talabini qo'llaydi
3. THE Tizim SHALL bir xil `username` yoki `pinfl` bilan ikki xil foydalanuvchi yaratilishini oldini oladi (UNIQUE constraint)
4. WHEN ariza yuborilyapganda, THE Applications_Service SHALL har bir `required: true` maydonni `formSchema` ga muvofiq validatsiya qiladi
5. IF `formData` dagi `date` tipidagi maydon noto'g'ri sana formatida bo'lsa, THEN THE Applications_Service SHALL `400 Bad Request` va tavsiflovchi xato xabarini qaytaradi
6. IF `formData` dagi `select` tipidagi maydon ruxsat etilmagan qiymatda bo'lsa, THEN THE Applications_Service SHALL `400 Bad Request` va tavsiflovchi xato xabarini qaytaradi

---

### Talab 11: Xavfsizlik Talablari

**Foydalanuvchi tarixi:** Tizim xavfsizlik muhandisi sifatida men platformani ruxsatsiz kirishdan himoya qilishni talab qilaman.

#### Qabul Qilish Mezonlari

1. THE Auth_Service SHALL login endpointida 5 daqiqada 10 ta urinishdan ko'p bo'lgan so'rovlarni bloklaydi (`rate limiting`)
2. THE Tizim SHALL JWT secret kalitini faqat muhit o'zgaruvchisi (`JWT_SECRET`) sifatida saqlaydi va kodda hardcode qilmaydi
3. THE Tizim SHALL backend API ni faqat sozlangan `FRONTEND_URL` dan kelgan so'rovlarni qabul qilishga cheklaydi (CORS)
4. THE Tizim SHALL barcha foydalanuvchi kiritgan ma'lumotlarni `class-validator` DTOlar orqali validatsiya qiladi
5. THE Tizim SHALL Prisma ORM parametrlashtirilgan so'rovlari orqali SQL injection hujumlaridan avtomatik himoyalanadi

---

### Talab 12: Holat O'tishi Parser va Validator

**Foydalanuvchi tarixi:** Backend dasturchisi sifatida men ariza holati o'tishlarini to'g'ri validatsiya qiluvchi funksiyaga muhtojman, shunda noto'g'ri holat sekvenslari hech qachon bazaga tushmasin.

#### Qabul Qilish Mezonlari

1. WHEN `validateStatusTransition(currentStatus, newStatus)` funksiyasi chaqirilsa, THE Applications_Service SHALL faqat `SUBMITTED → IN_REVIEW`, `IN_REVIEW → APPROVED` va `IN_REVIEW → REJECTED` o'tishlarini `true` deb qaytaradi
2. WHEN `validateStatusTransition` funksiyasiga bir xil `currentStatus` va `newStatus` berilsa, THE Applications_Service SHALL `false` qaytaradi
3. WHEN `validateStatusTransition` funksiyasiga `APPROVED` yoki `REJECTED` `currentStatus` berilsa, THE Applications_Service SHALL istalgan `newStatus` uchun `false` qaytaradi
4. THE Pretty_Printer SHALL `ApplicationStatus` qiymatlarini foydalanuvchilarga tushunarli o'zbek tilidagi matnlarga (`translateStatus`) aylantiradi
5. FOR ALL haqiqiy `ApplicationStatus` qiymatlari, `translateStatus` funksiyasi chaqirilgandan keyin yana `validateStatusTransition` yordamida tekshirilgan holat o'tishi bir xil natija berishi shart (round-trip moslik)

---

### Talab 13: FormData Validatsiya Parser

**Foydalanuvchi tarixi:** Backend dasturchisi sifatida men dinamik forma ma'lumotlarini tegishli sxemaga ko'ra to'g'ri validatsiya qiluvchi funksiyaga muhtojman.

#### Qabul Qilish Mezonlari

1. WHEN `validateFormData(formData, formSchema)` funksiyasi to'g'ri ma'lumotlar bilan chaqirilsa, THE Applications_Service SHALL `{ isValid: true, errors: [] }` qaytaradi
2. WHEN `validateFormData` funksiyasiga `required: true` bo'lgan maydon uchun bo'sh yoki `null` qiymat berilsa, THE Applications_Service SHALL `{ isValid: false, errors: [tavsiflovchi xabar] }` qaytaradi
3. WHEN `validateFormData` funksiyasiga `type: 'date'` bo'lgan maydon uchun noto'g'ri sana formati berilsa, THE Applications_Service SHALL `errors` ro'yxatiga tegishli maydon nomini kiritadi
4. WHEN `validateFormData` funksiyasiga `type: 'select'` bo'lgan maydon uchun `options` ro'yxatida yo'q qiymat berilsa, THE Applications_Service SHALL `errors` ro'yxatiga tegishli maydon nomini kiritadi
5. THE Pretty_Printer SHALL `FormFieldSchema` massivini foydalanuvchiga ko'rsatiladigan forma maydonlari ro'yxatiga aylantiradi
6. FOR ALL haqiqiy `FormFieldSchema` massivlari, forma maydonlarini formatlash keyin yana parse qilish asl `FormFieldSchema` tuzilmasiga ekvivalent bo'lishi shart (round-trip xususiyati)

# Hướng Dẫn Build & Deploy Frontend

## 📋 Tổng Quan

Document này ghi lại toàn bộ các vấn đề gặp phải trong quá trình build frontend và cách giải quyết. Đọc kỹ trước khi build và deploy.

---

## 🐛 Các Vấn Đề Đã Gặp Phải

### 1. TypeScript Compilation Errors

#### **Vấn đề 1.1: Type không tương thích trong food-selector.tsx**

**Lỗi:**
```
Type 'ConcessionCategory' is not assignable to type 'ConcessionCategory | undefined'
```

**Nguyên nhân:**
- State `category` có type `ConcessionCategory | undefined` nhưng được khởi tạo với `ConcessionCategory.FOOD`
- Import conflicts giữa local types và `@movie-hub/shared-types`
- Enum values không khớp: local có `DRINK/MERCHANDISE`, shared-types có `BEVERAGE/SNACK`

**Giải pháp:**
- Đổi type của category state thành `ConcessionCategory | undefined`
- Sử dụng imports từ `@movie-hub/shared-types/booking/enum`
- Cập nhật enum values từ `DRINK` → `BEVERAGE`, `MERCHANDISE` → `SNACK`
- Thêm null coalescing operator: `food.inventory ?? 0`

**File đã fix:** `apps/web/src/app/(main)/showtimes/[showtimeId]/food-selector.tsx`

---

#### **Vấn đề 1.2: Null safety trong batch-showtimes**

**Lỗi:**
```
Argument of type 'string | undefined' is not assignable to parameter of type 'string | number | Date'
```

**Nguyên nhân:**
- `startDate` và `endDate` có thể undefined

**Giải pháp:**
```typescript
new Date(movieReleases.find(...)?.startDate ?? '')
```

**File đã fix:** `apps/web/src/app/admin/batch-showtimes/page.tsx`

---

#### **Vấn đề 1.3: useSearchParams và usePathname có thể trả về null**

**Lỗi:**
```
'searchParams' is possibly 'null'
'pathname' is possibly 'null'
```

**Nguyên nhân:**
- Next.js 15 cho phép các hooks này return null

**Giải pháp:**
- Thêm optional chaining `?.` cho tất cả sử dụng của `searchParams` và `pathname`

**Files đã fix:**
- `apps/web/src/app/admin/batch-showtimes/page.tsx`
- `apps/web/src/app/admin/layout.tsx`

---

### 2. Html Import Error (Vấn đề nghiêm trọng nhất)

#### **Lỗi:**
```
Error: <Html> should not be imported outside of pages/_document.
Read more: https://nextjs.org/docs/messages/no-document-import-in-page
```

**Nguyên nhân:**
- Lỗi xảy ra khi Next.js generate error pages mặc định (/404, /500)
- Next.js trong **development mode** sử dụng Html component từ `next/document` trong error handling
- Clerk authentication library có thể gây ra conflict với error page rendering

**Các giải pháp đã thử (KHÔNG THÀNH CÔNG):**
1. ❌ Tạo custom error pages trong `pages/_error.tsx` với `next/head` thay vì `next/document`
2. ❌ Tạo pages/404.tsx và pages/500.tsx
3. ❌ Thêm `next/document: false` trong webpack config
4. ❌ Xóa app/error.tsx và app/not-found.tsx
5. ❌ Tạo custom _document.tsx
6. ❌ Thay đổi output mode sang 'export'
7. ❌ Disable static page generation timeout

**Giải pháp cuối cùng (THÀNH CÔNG):**

🎯 **Chạy build ở PRODUCTION MODE thay vì development mode**

```bash
# SAI (sẽ gặp lỗi Html import):
npx nx run web:build

# ĐÚNG (không gặp lỗi):
npx nx run web:build:production
```

**Giải thích:**
- Development mode của Next.js có error handling khác, sử dụng Html component
- Production mode không có vấn đề này
- Xóa hoàn toàn `pages/` directory để tránh conflict với App Router

---

### 3. Prerendering Errors với API Calls

#### **Vấn đề:**
```
Error occurred prerendering page "/movies/showing"
AxiosError: Request failed with status code 500
```

**Nguyên nhân:**
- Next.js mặc định cố gắng prerender (Static Site Generation) tất cả pages
- Khi build, các pages gọi API sẽ fail vì backend không chạy hoặc không có data

**Giải pháp:**
Thêm `export const dynamic = 'force-dynamic'` vào **TẤT CẢ** pages có API calls để disable static generation:

**Danh sách pages đã thêm force-dynamic:**
1. ✅ `apps/web/src/app/(main)/page.tsx` (Homepage)
2. ✅ `apps/web/src/app/(main)/movies/page.tsx`
3. ✅ `apps/web/src/app/(main)/movies/showing/page.tsx`
4. ✅ `apps/web/src/app/(main)/movies/upcoming/page.tsx`
5. ✅ `apps/web/src/app/(main)/cinemas/page.tsx`
6. ✅ `apps/web/src/app/(main)/showtimes/page.tsx`
7. ✅ `apps/web/src/app/(main)/checkout/page.tsx`
8. ✅ `apps/web/src/app/(main)/my-booking/page.tsx`
9. ✅ `apps/web/src/app/(main)/promotions/page.tsx`

**Ví dụ:**
```typescript
import { MovieSection } from '../_components/movie-section';

export const dynamic = 'force-dynamic'; // THÊM DÒNG NÀY

export default async function ShowingPage() {
  // ...
}
```

---

## ✅ Kết Quả Sau Khi Fix

### Build Statistics
```
Route (app)                                 Size  First Load JS
├ ƒ /                                      16 kB         243 kB
├ ○ /_not-found                            983 B         102 kB
├ ○ /admin                               8.57 kB         230 kB
... (37 routes total)
├ ƒ /showtimes/[showtimeId]              14.2 kB         309 kB
└ ƒ /sign-up                               887 B         140 kB

○  (Static)   23 routes - prerendered
ƒ  (Dynamic)  14 routes - server-rendered on demand
```

### Build Output
- ✅ TypeScript compilation: **PASS**
- ✅ Type checking: **PASS**
- ✅ Static pages generation: **PASS** (23/23)
- ✅ Build finalization: **SUCCESS**
- 📦 Build artifacts: `apps/web/.next/standalone`

---

## 🚀 Hướng Dẫn Build Chính Thức

### Yêu Cầu
- Node.js >= 18
- NX CLI installed globally hoặc sử dụng npx

### Các Bước Build

#### 1. Navigate đến thư mục project
```bash
cd C:\Users\My PC\Desktop\Movie\FE\movie-hub-fe
```

#### 2. Install dependencies (nếu chưa cài)
```bash
npm install
```

#### 3. Build Frontend (USER + ADMIN)
```bash
# ⚠️ QUAN TRỌNG: Phải dùng :production
npx nx run web:build:production
```

**LƯU Ý:**
- ❌ **ĐỪNG** dùng `npx nx run web:build` (thiếu :production)
- ✅ **PHẢI** dùng `npx nx run web:build:production`
- ⏱️ Build mất khoảng 45-60 giây

#### 4. Kiểm tra build output
```bash
# Check xem folder .next/standalone đã được tạo
ls apps\web\.next\standalone
```

---

## 📁 Cấu Trúc Build Output

```
apps/web/.next/
├── standalone/          ← Deploy folder này
│   ├── apps/
│   │   └── web/
│   ├── node_modules/
│   ├── package.json
│   └── server.js       ← Entry point để chạy production server
├── static/             ← Static assets (images, fonts, etc.)
└── build-manifest.json
```

---

## 🐳 Deploy với Docker (Khuyến nghị)

### Dockerfile mẫu
```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx nx run web:build:production

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
```

### Build và run Docker
```bash
# Build image
docker build -t movie-hub-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://your-api-gateway.com \
  -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx \
  movie-hub-frontend
```

---

## 🔧 Deploy Standalone (Không dùng Docker)

### 1. Copy build output lên server
```bash
# Copy toàn bộ folder standalone
scp -r apps/web/.next/standalone/ user@server:/path/to/deploy/
scp -r apps/web/.next/static/ user@server:/path/to/deploy/apps/web/.next/
scp -r apps/web/public/ user@server:/path/to/deploy/apps/web/
```

### 2. Trên server, chạy:
```bash
cd /path/to/deploy
node apps/web/server.js
```

### 3. Setup PM2 cho production
```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start apps/web/server.js --name "movie-hub-frontend"

# Auto restart on reboot
pm2 startup
pm2 save
```

---

## 🌐 Environment Variables Cần Thiết

Tạo file `.env.production` hoặc set environment variables:

```bash
# API Gateway URL
NEXT_PUBLIC_API_URL=https://api-gateway.gentlemoss-ee6e319d.southeastasia.azurecontainerapps.io

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Optional: Analytics, monitoring, etc.
```

---

## 🔍 Troubleshooting

### Build bị fail với Html import error
**Giải pháp:** Đảm bảo đang dùng `:production` configuration
```bash
npx nx run web:build:production  # ✅
npx nx run web:build              # ❌
```

### Build fails với prerendering errors
**Giải pháp:** Đảm bảo tất cả pages có API calls đã có `export const dynamic = 'force-dynamic'`

### TypeScript errors khi build
**Giải pháp:** Chạy type check trước:
```bash
npx nx run web:type-check
```

### Các pages không load được
**Nguyên nhân:** Environment variables chưa được set đúng
**Giải pháp:** Kiểm tra lại tất cả biến môi trường, đặc biệt là `NEXT_PUBLIC_API_URL`

---

## 📊 Build Metrics

| Metric | Value |
|--------|-------|
| Total routes | 37 |
| Static routes | 23 |
| Dynamic routes | 14 |
| Build time | ~45-60s |
| Bundle size (First Load JS) | 101 KB (shared) |
| Largest page | /my-booking/[bookingId] (354 KB) |

---

## 📞 Support

Nếu gặp vấn đề khi build hoặc deploy, check lại:

1. ✅ Có dùng `:production` không?
2. ✅ Có xóa folder `.next` trước khi build lại không? (nếu gặp cache issues)
3. ✅ Environment variables đã set đúng chưa?
4. ✅ Node version >= 18 chưa?
5. ✅ Dependencies đã được install đầy đủ chưa?

---

**Last updated:** January 4, 2026  
**Build status:** ✅ STABLE  
**Next.js version:** 15.2.5  
**Node version:** 18+

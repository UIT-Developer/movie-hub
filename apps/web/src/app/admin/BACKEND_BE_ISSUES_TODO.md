# Backend BE Issues & TODO (Admin Movie Releases)

## Summary
Tập hợp các lỗi của backend liên quan đến module Movie Releases mà frontend admin gặp phải khi tạo "New Movie Release". Mục đích: copy phần này cho đội BE để họ sửa contract/validation.

---

## Issue: Concessions Update Returns 500 Error (CRITICAL)

**Status**: 🔴 BLOCKING — Admin cannot edit concession items

**Endpoint**: `PUT /api/v1/concessions/:id`

**Error**: `Internal server error` (500)

**Root Cause**:
Backend's `concession.service.ts` update method (lines 124-140) sets `undefined` values for non-nullable database fields in Prisma update query.

**Affected Fields**:
- `category` — NOT NULL in schema, but DTO makes it optional
- `price` — NOT NULL in schema, but DTO makes it optional

**Schema** (`apps/booking-service/prisma/schema.prisma` lines 172-187):
```prisma
model Concessions {
  category       ConcessionCategory  // NOT NULL
  price          Decimal             // NOT NULL
  name           String              // NOT NULL
  ...
}
```

**Current Problematic Code** (concession.service.ts lines 124-140):
```typescript
const concession = await this.prisma.concessions.update({
  where: { id },
  data: {
    name: dto.name,           // undefined → constraint violation
    category: dto.category,   // undefined → constraint violation
    price: dto.price,         // undefined → constraint violation
    ...
  },
});
```

**Solution**:
Only set fields that are provided in the DTO. Use conditional spread:

```typescript
const concession = await this.prisma.concessions.update({
  where: { id },
  data: {
    ...(dto.name !== undefined && { name: dto.name }),
    ...(dto.category !== undefined && { category: dto.category }),
    ...(dto.price !== undefined && { price: dto.price }),
    ...(dto.nameEn !== undefined && { name_en: dto.nameEn }),
    ...(dto.description !== undefined && { description: dto.description }),
    ...(dto.imageUrl !== undefined && { image_url: dto.imageUrl }),
    ...(dto.available !== undefined && { available: dto.available }),
    ...(dto.inventory !== undefined && { inventory: dto.inventory }),
    ...(dto.cinemaId !== undefined && { cinema_id: dto.cinemaId }),
    ...(dto.nutritionInfo !== undefined && { nutrition_info: dto.nutritionInfo }),
    ...(dto.allergens !== undefined && { allergens: dto.allergens }),
  },
});
```

**FE Impact**: Users cannot edit concession items — all edit requests fail with 500.

**FE Workaround**: None — requires BE fix.

**Test After Fix**: 
- Update only name
- Update only price
- Update all fields together
- Verify response includes all updated fields

---

## Issue: Create New Movie Release — Validation / Response mismatch (urgent)
Status: 🔴 BLOCKING for Admin FE create flow

Problem (ngắn):
- Khi admin FE gửi POST `/api/v1/movie-releases` để tạo release, backend có thể trả 400 (Zod validation failed) hoặc trả về object release nhưng **thiếu `movieId`** trong response. FE cần `movieId` để cập nhật cache và hiển thị tên phim liên quan.

Chi tiết kỹ thuật / files BE cần sửa:
- `libs/shared-types/src/movie/dto/request/movie-release.request.ts` (Zod schema): hiện schema ở một số bản đặt `movieId` là optional — nên **bắt buộc** cho create request (BE có thể giữ optional nếu có lý do, nhưng FE luôn gửi `movieId`).
- `libs/shared-types/src/movie/dto/response/movie-release.response.ts`: thiếu `movieId: string` — cần thêm vào response DTO.
- `apps/movie-service/src/module/movie/movie.service.ts`: trong Prisma `select` của `findMany`, `create`, `update` cho `movieRelease` cần `movieId: true` để trả về `movieId` trong response.
- API Gateway controller/service: đảm bảo không loại bỏ `movieId` khi forward response.

Gợi ý sửa cụ thể (đề xuất cho BE team):
1. Create DTO (Zod):
	- `movieId: z.uuid()` (required)
	- `startDate: z.coerce.date()` (required)
	- `endDate: z.coerce.date().optional()` ( nếu DB cho phép null )
	- `note: z.string().max(500).optional()`
2. Response DTO: thêm `movieId: string;` và để `endDate`/`note` là optional nếu DB có thể trả null.
3. Trong `movie.service.ts`, cập nhật các `select` để include `movieId: true` ở các chỗ: `getMovieRelease`, `createMovieRelease`, `updateMovieRelease`.

Reproduction steps (FE flow):
1. Open Admin → Movie Releases → Add New Release dialog.
2. Fill: Movie (select), Start Date (e.g., 2025-12-31), End Date (e.g., 2026-01-06), Note optional.
3. Click Create Release → nếu BE chưa sửa, sẽ thấy toast lỗi hoặc Network response 400; nếu BE trả release but no `movieId`, FE cannot match it to movie list.

Expected behaviour after BE fix:
- POST `/api/v1/movie-releases` returns 200/201 with body containing created release including `id`, `movieId`, `startDate`, `endDate?`, `note?`.
- Zod validation should accept ISO date strings sent by FE (FE sends `new Date(dateValue).toISOString()`); or BE should accept `YYYY-MM-DD` and coerce to Date.

Notes for BE team:
- FE sends `startDate` and `endDate` as ISO strings (e.g. `2025-12-31T00:00:00.000Z`) — please ensure Zod schema uses `z.coerce.date()` or accept string date formats.
- If BE intentionally does not return `movieId` (e.g., privacy reasons), please provide an alternative field or return the `movie` object so FE can resolve title — otherwise add `movieId`.

---

Add this note to the BE issues list so backend team can fix the contract mismatch; frontend will be able to use the create flow without workaround once BE returns `movieId` and aligns date/validation rules.

---

## Issue: Missing Showtime Detail API Endpoint (urgent)
Status: 🔴 BLOCKING for Admin FE edit showtime flow

Problem (ngắn):
- FE calls `GET /api/v1/showtimes/:id` to fetch showtime details when editing a showtime (for pre-populating form fields like `movieId`, `movieReleaseId`, `startTime`, etc.), but **this endpoint does not exist in BE**.
- BE cinema-service has `getShowtimes()` which fetches list of showtimes, and `getShowtimeSeats()` for fetching seats, but **no detail/single-showtime endpoint**.
- API Gateway showtime controller has:
  - `GET /api/v1/showtimes` (list with filters)
  - `GET /api/v1/showtimes/:id/seats` (get seats for showtime)
  - But **NO `GET /api/v1/showtimes/:id`** for fetching single showtime detail.

Chi tiết kỹ thuật / files BE cần sửa:
1. `apps/cinema-service/src/app/showtime/showtime.service.ts`: thêm method `getShowtimeById(id: string)` để fetch chi tiết một showtime từ DB, kèm theo `movieId` và `movieReleaseId`.
2. `apps/cinema-service/src/app/showtime/showtime.controller.ts`: thêm message pattern `CinemaMessage.SHOWTIME.GET_SHOWTIME` hoặc tương tự để handle request từ gateway.
3. `apps/api-gateway/src/app/module/cinema/service/showtime.service.ts`: thêm `async getShowtime(id: string)` để gọi cinema-service.
4. `apps/api-gateway/src/app/module/cinema/controller/showtime.controller.ts`: thêm `@Get(':id')` route (careful with order: place **AFTER** other specific routes like `:id/seats` to avoid route shadowing) để fetch single showtime.

Response DTO should match:
- Showtime response should include `id`, `movieId`, `movieReleaseId`, `cinemaId`, `hallId`, `startTime`, `format`, `language`, `subtitles`, `pricePerSeat`, `createdAt`, `updatedAt`.
- Make sure `movieId` and `movieReleaseId` are **never null** in the response (should be guaranteed by DB constraints).

Gợi ý sửa cụ thể (đề xuất cho BE team):
```typescript
// In cinema-service/showtime.service.ts
async getShowtimeById(showtimeId: string) {
  const showtime = await this.prisma.showtime.findUnique({
    where: { id: showtimeId },
    select: {
      id: true,
      movieId: true,
      movieReleaseId: true,
      cinemaId: true,
      hallId: true,
      startTime: true,
      format: true,
      language: true,
      subtitles: true,
      pricePerSeat: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!showtime) throw new NotFoundException('Showtime not found');
  return showtime;
}

// In cinema-service/showtime.controller.ts
@MessagePattern(CinemaMessage.SHOWTIME.GET_SHOWTIME)
getShowtime(@Payload() showtimeId: string) {
  return this.showtimeService.getShowtimeById(showtimeId);
}

// In api-gateway/showtime.controller.ts
@Get(':id')
@UseGuards(ClerkAuthGuard)
getShowtime(@Param('id') showtimeId: string) {
  return this.showtimeService.getShowtime(showtimeId);
}
```

Reproduction steps (FE flow):
1. Open Admin → Showtimes → Click "Edit" on any showtime in the list.
2. ShowtimeDialog opens but **movieId and movieReleaseId fields are not pre-filled** because FE failed to fetch detail.
3. (In browser dev tools Network tab, see 404 or 405 error for `GET /api/v1/showtimes/:id`)

Expected behaviour after BE fix:
- `GET /api/v1/showtimes/:id` returns 200 with showtime object including `movieId`, `movieReleaseId`, and all other fields.
- FE can pre-populate all form fields in ShowtimeDialog correctly.
- Edit/save flow completes without having to manually re-select movie and release.

Notes for BE team:
- **Route order matters**: Place `@Get(':id')` **after** `@Get(':id/seats')` in the controller to prevent shadowing.
- This endpoint should be protected by `ClerkAuthGuard` for security (admin-only).
- Make sure `movieId` and `movieReleaseId` are never null (cascade delete or constraint in DB).

---

## Issue: Batch Create Showtimes — 500 Unexpected Error (urgent)
Status: 🔴 BLOCKING for Admin FE batch showtimes flow

Problem (ngắn):
- Khi admin FE gửi POST `/api/v1/showtimes/batch` để tạo multiple showtimes, backend trả 500 error với message "Unexpected error". FE đã gửi đúng format (dates as yyyy-MM-dd strings, timeSlots as HH:mm strings) nhưng BE vẫn fail.

Error response example:
```
{
  success: false,
  message: 'Unexpected error',
  errors: [...],
  status: 500
}
```

Chi tiết kỹ thuật / files BE cần kiểm tra:
- `apps/cinema-service/src/app/showtime/showtime-command.service.ts` → `batchCreateShowtimes()` method
  - Line 115: Check `checkCinemaAndHallStatus()` — có thể cinema hoặc hall không được tìm thấy
  - Line 117: Check `fetchMovieAndRelease()` — có thể movie hoặc release không được lấy từ movie-service
  - Error handling: Method wraps error in `RpcException` which might be causing 500 instead of proper error
- Xem logs BE để biết exact error cause (check cinema-service logs, api-gateway logs)

Reproduction steps (FE flow):
1. Open Admin → Batch Showtimes
2. Fill all required fields:
   - Movie (select)
   - Movie Release (select)
   - Cinema (select)
   - Hall (select)
   - Start Date (e.g., 2025-12-28, format: yyyy-MM-dd)
   - End Date (e.g., 2025-12-31, format: yyyy-MM-dd)
   - Select at least one time slot (e.g., 14:00)
   - Choose repeat pattern (DAILY, WEEKLY, or CUSTOM_WEEKDAYS)
   - Format, Language, Subtitles
3. Click "Create Batch Showtimes" button
4. Get 500 error with "Unexpected error"

FE sends (correct format):
```json
{
  "movieId": "movie-123",
  "movieReleaseId": "release-456",
  "cinemaId": "cinema-789",
  "hallId": "hall-001",
  "startDate": "2025-12-28",      // yyyy-MM-dd string ✓
  "endDate": "2025-12-31",        // yyyy-MM-dd string ✓
  "timeSlots": ["14:00", "18:00"], // HH:mm strings ✓
  "repeatType": "DAILY",
  "weekdays": [],
  "format": "2D",
  "language": "vi",
  "subtitles": []
}
```

Expected behaviour after BE fix:
- POST `/api/v1/showtimes/batch` returns 200 with response:
  ```json
  {
    "success": true,
    "message": "Batch create showtimes completed",
    "data": {
      "createdCount": <number>,
      "skippedCount": <number>,
      "created": [...Showtime[]],
      "skipped": [...]
    }
  }
  ```

Gợi ý sửa cụ thể (đề xuất cho BE team):
1. **Check cinema/hall validation**: Ensure `checkCinemaAndHallStatus()` properly validates and throws appropriate errors instead of generic exceptions
2. **Check movie/release fetch**: Ensure `fetchMovieAndRelease()` handles microservice communication errors gracefully
3. **Improve error handling**: Catch specific errors and return appropriate HTTP status codes (400 for validation, 404 for not found, 500 only for unexpected)
4. **Add logging**: Log exact error in cinema-service before throwing RpcException
5. **Test microservice communication**: Verify movie-service is reachable and returns correct data structure

Notes for BE team:
- The Zod schema `batchCreateShowtimesSchema` is correct on FE — it accepts the formats we're sending
- FE has already validated input before sending (all required fields present, dates match regex, etc.)
- Issue is likely in BE service layer (cinema-service) not in validation
- Check if `movieClient` service communication is failing (microservice networking issue)
- Check if cinema/hall/movie/release exist in database

---

## Issue: Admin Reviews List — Missing Movie Title, Reviewer Name (important)
Status: 🟡 PARTIALLY ADDRESSED with FE workaround

**Current Status**: FE has implemented workaround using movie enrichment. However, several BE issues remain.

### Problem Analysis:

**Missing Fields in API Response:**
- BE endpoint `GET /api/v1/reviews` returns only: `id`, `rating`, `content`, `createdAt`
- FE needs: `movieId`, `userId`, `movieTitle`, `userName`, `userEmail`, `title`
- **BE currently returns**: Only basic fields, no relations included
- **BE doesn't have**: `title` field in Review model (only `content`)

**Files with Issues:**
- `libs/shared-types/src/movie/dto/response/review.response.ts` (ReviewResponse): Missing `movieId`, `userId`, `title`
- `apps/movie-service/src/module/review/review.service.ts` (findAll method): Not including Movie/User relations in query
- `apps/movie-service/prisma/schema.prisma`: Review model doesn't have separate `title` field (only has `content`)

**Code Issues (BE movie-service/review.service.ts line 27-37):**
```typescript
const [data, totalRecords] = await Promise.all([
  this.prisma.review.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    // ❌ MISSING: include: { movie: true, user: true }
  }),
  // ...
]);
```

### Current FE Workaround:

FE implemented enrichment to work around missing BE data:
1. **Movie Title**: Fetch `useMovies()` hook separately and map `movieId` → `movieTitle`
2. **Reviewer**: Set to placeholder "User" (can't enrich without user data endpoint)
3. **Title**: Use first 100 chars of `content` since BE doesn't have `title` field

**Why this is a workaround**: 
- BE should return complete data with relations
- FE shouldn't need to do extra fetches for basic data already in DB

### Recommendations for BE Team:

**Option 1 (Recommended): Update ReviewResponse to include relations**
```typescript
// In review.response.ts
export interface ReviewResponse {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  content: string;
  createdAt: Date;
  // Add relations
  movie?: { id: string; title: string };
  user?: { id: string; name: string; email: string };
}

// In review.service.ts findAll method
const [data, totalRecords] = await Promise.all([
  this.prisma.review.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    include: {
      movie: { select: { id: true, title: true } },
      // If user-service integration exists, include user data
    },
  }),
  // ...
]);
```

**Option 2: Add `title` field to Review model**
```sql
-- In prisma schema
model Review {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  movieId   String   @map("movie_id") @db.Uuid
  userId    String   @map("user_id")
  rating    Int      @map("rating")
  title     String?  @map("title")      // ← NEW: Add optional title field
  content   String   @map("content")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  movie     Movie    @relation(fields: [movieId], references: [id], onDelete: Cascade)
  // ...
}
```

**Option 3: Add user-service integration**
- Currently BE can't fetch user info (name, email) from user-service
- Add similar pattern used for movie-service to include user data in reviews

### FE Impact:

- If BE is updated, FE workaround can be removed and simplified
- Currently FE successfully renders reviews with enriched data
- No blocking issues for users (workaround functional)

### Testing with Current Workaround:

FE Tests:
- ✅ Reviews load with correct count
- ✅ Movie title enriched from movies lookup
- ✅ Reviewer shows "User" placeholder (limitation due to BE not returning user data)
- ✅ Title shows first 100 chars of content
- ✅ Comment displays full content
- ✅ Date formatted correctly
- ✅ Filters work (by movie, rating, date)
- ✅ Statistics calculated correctly

**Next Steps for BE Team:**
1. Include `movie` relation in findAll query (highest priority)
2. Add user integration to include reviewer name/email
3. Consider adding `title` field as separate entity (or clarify it's intentionally just `content`)
4. Ensure ReviewResponse type matches returned data

---

## Issue: Admin Staff Management — Date Parsing & Validation Inconsistency (urgent)
Status: 🟡 FIXED via FE workaround - monitoring for BE alignment

**Problem (tóm tắt):**
- FE sends dates as ISO strings (e.g., `2025-12-30T00:00:00.000Z`) but BE Zod schema may have inconsistent validation
- When creating staff, FE received "Validation failed" with 6 errors despite form validation passing
- When editing staff, date fields in dialog weren't loading correctly because date type handling was inconsistent (string vs Date object)

**Root Cause Analysis:**
- CreateStaffRequest schema expects dates as `z.coerce.date()` but timezone handling between client/server can cause issues
- BE likely validates:
  - `dob: z.coerce.date()` - may fail if date string format doesn't parse correctly in BE's timezone
  - `hireDate: z.coerce.date()` - same issue
  - Other enums (gender, position, status, workType, shiftType) may have case-sensitivity or enum value mismatch
  - Salary may need to be integer vs float

**Files Affected (BE):**
- `libs/shared-types/src/user/create-staff.request.ts` - CreateStaffSchema validation rules
- `libs/shared-types/src/user/update-staff.request.ts` - UpdateStaffSchema (already correct: omits cinemaId & email)
- `apps/user-service/src/app/staff/staff.service.ts` - staff create/update methods
- `apps/api-gateway/src/app/module/user/service/staff.service.ts` - API gateway forwarding

**FE Workaround Implemented:**
✅ **Fixed in:** `FE/movie-hub-fe/apps/web/src/app/admin/staff/page.tsx`

1. **Added `formatDateForInput()` helper** (lines 79-92):
   - Properly handles both string and Date objects
   - Converts to YYYY-MM-DD format required by `input[type="date"]`
   - Handles timezone issues by checking for invalid dates

2. **Fixed `handleEdit()` function** (lines 289-305):
   - Replaced simple `.split('T')[0]` with `formatDateForInput()` helper
   - Now safely loads staff data even if dates come as Date objects from API
   - Dialog now displays dates correctly for editing

3. **Improved `handleSubmit()` validation** (lines 177-237):
   - Added explicit date validation before submission
   - Parses dates with UTC timezone: `new Date(formData.dob + 'T00:00:00Z')`
   - Validates date parsing result before sending to API
   - Converts salary to integer: `Math.floor(formData.salary)`
   - Provides better error messages for invalid dates

**Recommendations for BE Team:**

1. **CreateStaffSchema (Zod) validation:**
   ```typescript
   export const CreateStaffSchema = z.object({
     cinemaId: z.uuid("cinemaId must be valid UUID"),
     fullName: z.string().min(1, "fullName is required"),
     email: z.string().email("email must be valid email"),
     phone: z.string().min(9, "phone must be min 9 chars"),
     gender: z.enum(Object.values(Gender) as [string, ...string[]], 
       "gender must be MALE or FEMALE"),
     dob: z.coerce.date("dob must be valid date"),
     position: z.enum(Object.values(StaffPosition) as [string, ...string[]],
       "position must match enum"),
     status: z.enum(Object.values(StaffStatus) as [string, ...string[]],
       "status must match enum"),
     workType: z.enum(Object.values(WorkType) as [string, ...string[]],
       "workType must match enum"),
     shiftType: z.enum(Object.values(ShiftType) as [string, ...string[]],
       "shiftType must match enum"),
     salary: z.number().int("salary must be integer").min(0),
     hireDate: z.coerce.date("hireDate must be valid date"),
   });
   ```

2. **BE should ensure:**
   - `z.coerce.date()` can parse ISO strings like `2025-12-30T00:00:00.000Z`
   - Enum validation doesn't fail on casing (use case-insensitive or ensure FE uses exact enum values)
   - Return detailed error messages in response so FE can show which field failed
   - Salary field correctly stores as integer in database

3. **Error Response Format:**
   - Instead of generic `"Validation failed"`, return:
   ```typescript
   {
     success: false,
     message: 'Validation failed',
     errors: [
       { field: 'dob', message: 'Invalid date format' },
       { field: 'salary', message: 'Must be integer' }
     ]
   }
   ```
   This helps FE debug and show field-specific errors to users.

**Current Status:**
- ✅ Edit staff dialog now loads data correctly
- ✅ Create staff validates dates properly
- ✅ Salary ensures integer format
- ✅ Error handling improved

**Monitoring:**
- If validation continues to fail after these changes, BE team should check:
  1. Exact enum values in database schema match those sent by FE
  2. Date coercion timezone handling
  3. Field-level validation error details in BE logs
  4. Response from API gateway doesn't strip fields

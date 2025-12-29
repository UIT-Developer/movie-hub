# Backend BE Issues & TODO

## Summary
Tập hợp các lỗi của backend liên quan đến Admin Showtimes và Movie Releases. Mục đích: copy phần này cho đội BE để họ sửa contract/validation.

**Update (2025-12-30):** 
- ✅ Showtimes movieReleaseId loading issue → WORKAROUND APPLIED on FE (auto-select logic)
- Still BLOCKING: BE detail endpoint missing, BE movie-release create contract issue
- See details below

---

## Issue: Create New Movie Release — Validation / Response mismatch (BLOCKING)
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

## Issue: Showtimes movieReleaseId Not Loading (2025-12-30 UPDATE)
Status: 🟡 WORKAROUND APPLIED on FE

**Update:** FE team applied workaround logic to auto-select movieReleaseId when editing showtime. Issue is PARTIALLY RESOLVED but still needs BE improvements.

### FE Workaround Applied:
1. ✅ Auto-select movieReleaseId when releases list loads (after editingShowtime provided)
2. ✅ Removed strict status filter from releases dropdown (show all releases)
3. ✅ Enhanced logging for debugging

### Remaining BE Issues:
1. **Missing Detail Endpoint** (see below) — still needs implementation
2. **Possible NULL movieReleaseId in DB** — if showtimes have null movie_release_id, it won't load

### BE Verification Needed:
- Confirm `getShowtimes()` in showtime.service.ts includes `movieReleaseId: showtime.movie_release_id` in response (it should be at line 97)
- Verify showtimes in DB don't have null `movie_release_id` values
- If NULL values exist, populate them or document expected behavior

---

## Issue: Missing Showtime Detail API Endpoint (BLOCKING)
Status: 🔴 BLOCKING for optimal FE flow (but workaround exists)

Problem (ngắn):
- FE calls `GET /api/v1/showtimes/:id` to fetch showtime details when editing a showtime (for pre-populating form fields like `movieId`, `movieReleaseId`, `startTime`, etc.), but **this endpoint does not exist in BE**.
- BE cinema-service has `getShowtimes()` which fetches list of showtimes, and `getShowtimeSeats()` for fetching seats, but **no detail/single-showtime endpoint**.
- API Gateway showtime controller has:
  - `GET /api/v1/showtimes` (list with filters)
  - `GET /api/v1/showtimes/:id/seats` (get seats for showtime)
  - But **NO `GET /api/v1/showtimes/:id`** for fetching single showtime detail.

**FE Workaround:** FE now uses list data (which includes movieReleaseId) instead of trying to fetch detail. Works for admin flows since you always come from list first.

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
2. ShowtimeDialog opens — with FE workaround, movieReleaseId now auto-selects correctly
3. (Without workaround, would see 404 for GET /api/v1/showtimes/:id)

Expected behaviour after BE fix:
- `GET /api/v1/showtimes/:id` returns 200 with showtime object including `movieId`, `movieReleaseId`, and all other fields.
- FE can optionally use this endpoint for additional verification or if need showtime by ID without list context.

Notes for BE team:
- **Route order matters**: Place `@Get(':id')` **after** `@Get(':id/seats')` in the controller to prevent shadowing.
- This endpoint should be protected by `ClerkAuthGuard` for security (admin-only).
- Make sure `movieId` and `movieReleaseId` are never null (cascade delete or constraint in DB).

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


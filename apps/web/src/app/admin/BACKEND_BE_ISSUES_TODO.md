# Backend BE Issues & TODO (Admin Movie Releases)

## Summary
Tập hợp các lỗi của backend liên quan đến module Movie Releases mà frontend admin gặp phải khi tạo "New Movie Release". Mục đích: copy phần này cho đội BE để họ sửa contract/validation.

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


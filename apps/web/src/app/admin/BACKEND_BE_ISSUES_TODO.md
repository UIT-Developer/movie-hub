# Backend BE - Issues & Fixes Required

**Tài liệu này ghi lại tất cả những vấn đề cần Backend BE xử lý để hỗ trợ Admin FE chính xác.**
**Chỉ ghi các vấn đề từ phía BE - vấn đề FE Admin được sửa trực tiếp không cần note.**
**Cập nhật lần cuối: 24/12/2025**

---

## 📋 Tóm tắt

| Screen | Status | Priority | Issue Count |
|--------|--------|----------|------------|
| Cinema | ❌ Pending | High | 1 |
| Hall | ❌ Pending | High | 2 |

---

## 🎬 1. CINEMA SCREEN

### ❌ Issue 1: Missing Cinema Fields in Detail Response
**Vấn đề Admin:** Khi chỉnh sửa Cinema, các trường sau không được tải vào form dialog:
- `website`
- `latitude`
- `longitude`
- `description`
- `amenities`
- `facilities`

**Root Cause BE:** Endpoint GET `/api/v1/cinemas/:id` (message pattern `CinemaMessage.GET_DETAIL`) không trả về các trường này, hoặc `CinemaMapper.toDetailResponse()` không include chúng trong response.

**Backend BE cần xử lý:**
```typescript
// File: apps/cinema-service/src/app/cinema/cinema.mapper.ts
// Phương thức: toDetailResponse() 
// Hành động: Ensure tất cả fields sau được mapped từ entity sang CinemaDetailResponse:

✓ website (kiểu: string | undefined)
✓ latitude (kiểu: number | undefined)
✓ longitude (kiểu: number | undefined)
✓ description (kiểu: string | undefined)
✓ amenities (kiểu: string[] | undefined)
✓ facilities (kiểu: Record<string, any> | undefined)
✓ images (kiểu: string[] | undefined)
✓ virtualTour360Url (kiểu: string | undefined)
✓ operatingHours (kiểu: Record<string, any> | undefined)
✓ socialMedia (kiểu: Record<string, any> | undefined)
✓ timezone (kiểu: string)

// Kiểm tra file: 
// libs/shared-types/src/cinema/dto/response/cinemaDto/cinema-detail.response.ts
// Verify rằng CinemaDetailResponse interface đã include tất cả các field trên
```

**Cách verify sau khi fix:**
- Edit Cinema dialog sẽ populate tất cả fields từ API response
- Các field website, latitude, longitude, description, amenities, facilities hiển thị đúng giá trị trong form

---

## 🎪 2. HALL SCREEN

### ❌ Issue 1: Hall Detail Response Missing Cinema Object
**Vấn đề Admin:** Grouped halls list hiển thị "Unknown Cinema" khi vừa tạo Hall, edit dialog cũng không load thông tin cinema của hall.

**Root Cause BE:** `HallDetailResponse` không include nested `cinema` object. Khi FE gọi get hall detail, response không có cinema info để hiển thị.

**Backend BE cần xử lý:**
```typescript
// File 1: apps/cinema-service/src/app/hall/hall.service.ts
// Phương thức: getHallById(hallId: string)
// Hành động: Khi query Prisma, thêm include cinema:
//   return this.prisma.halls.findUnique({
//     where: { id: hallId },
//     include: { seats: true, cinema: true }  // ← ADD cinema: true
//   })

// File 2: apps/cinema-service/src/app/hall/hall.mapper.ts
// Phương thức: toDetailResponse(hall)
// Hành động: Map hall.cinema sang response field cinema
// Return object phải include:
//   cinema: {
//     id, name, city, address, ... (full CinemaDetailResponse fields)
//   }

// File 3: libs/shared-types/src/cinema/dto/response/hallDto/hall-detail.response.ts
// Hành động: Add field cinema vào interface:
//   cinema?: CinemaDetailResponse;
```

**Cách verify sau khi fix:**
- Grouped halls header hiển thị đúng cinema name (không còn "Unknown Cinema")
- Edit hall dialog hiển thị cinema thông tin
- Hall detail API response include `cinema` object với full cinema info

### ❌ Issue 2: Hall Delete Internal Server Error
**Vấn đề Admin:** Khi click Delete Hall, gặp lỗi 500 Internal Server Error, hall không bị xóa.

**Root Cause BE:** API Gateway gửi payload `{ hallId }` (object) nhưng microservice message handler expect raw string hallId.

**Backend BE cần xử lý:**
```typescript
// File: apps/api-gateway/src/app/module/cinema/service/hall.service.ts
// Phương thức: deleteHall(hallId: string)
// Hành động: Fix payload được gửi đến microservice:
//   Trước: this.cinemaClient.send(CinemaMessage.HALL.DELETE, { hallId })
//   Sau:   this.cinemaClient.send(CinemaMessage.HALL.DELETE, hallId)
//   
// Gửi raw string hallId thay vì object wrapper

// Verify message handler trong microservice expect:
// File: apps/cinema-service/src/app/hall/hall.controller.ts
// @MessagePattern(CinemaMessage.HALL.DELETE)
// async deleteHall(@Payload() hallId: string)  // ← expect string, không phải object
```

**Cách verify sau khi fix:**
- Click Delete Hall → dialog confirm → click Delete → hall bị xóa thành công
- Không còn lỗi 500
- Grouped halls list refresh, hall bị xóa không còn hiển thị

---

## 📝 Template for Future Screens

Khi test màn hình mới, nếu có issue BE cần fix, thêm section như sau:

```markdown
### ❌ Issue N: [Tên issue]
**Vấn đề Admin:** [Mô tả chi tiết vấn đề từ góc độ user admin]

**Root Cause BE:** [Nguyên nhân từ backend]

**Backend BE cần xử lý:**
[Chi tiết files, methods, hành động cụ thể cần làm]

**Cách verify sau khi fix:**
[Cách kiểm tra xác nhận đã fix]
```

---

## 🎯 Action Items for Backend Team

### ❌ PENDING - High Priority
- [ ] **Cinema Screen:** Fix missing fields in detail response (website, latitude, longitude, description, amenities, facilities, operatingHours, socialMedia, virtualTour360Url, images)
- [ ] **Hall Screen:** Include cinema object in hall detail response
- [ ] **Hall Screen:** Fix delete payload - send raw hallId string not { hallId } object

### Medium Priority
- [ ] Review all other detail response DTOs to ensure completeness


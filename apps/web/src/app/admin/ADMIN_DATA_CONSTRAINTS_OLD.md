# 📋 Admin FE - Data Constraints Audit

**Date**: January 3, 2026  
**Purpose**: Rà soát và quản lý các ràng buộc dữ liệu (business/data constraints) trên Admin FE  
**Status**: 🔴 Cần bổ sung nhiều ràng buộc quan trọng

---

## 📊 Tổng Quan

| Module | Số Ràng Buộc Cần Có | Đã Triển Khai | Chưa Triển Khai |
|--------|---------------------|---------------|-----------------|
| Cinema | 3 | 0 | 3 |
| Hall | 3 | 0 | 3 |
| Movie | 3 | 0 | 3 |
| Movie Release | 2 | 0 | 2 |
| Showtime | 4 | 0 | 4 |
| Concession | 2 | 0 | 2 |
| Genre | 1 | 0 | 1 |
| Staff | 2 | 0 | 2 |
| Booking | 3 | 1 | 2 |
| User | 2 | 0 | 2 |
| **TOTAL** | **25** | **1** | **24** |

---

## ⚡ FAST SOLUTION - Không Cần Thêm API Mới (Backend Biếu Làm)

### Giải Pháp Nhanh Gọn Lẹ

**Vấn Đề**: Backend không muốn code thêm `/dependencies` endpoints → Giải pháp: **Dùng error response từ DELETE endpoint**

#### **Mô Hình**

```
User click Delete → FE call DELETE /cinemas/{id}
                        ↓
                    BE kiểm tra dependency
                        ↓
                    Nếu có dependency:
                      Return 400 + error details
                    Nếu không:
                      Delete + Return 200
                        ↓
                    FE catch error → Show constraint info
```

#### **Backend: Modify DELETE Endpoint (Không cần API mới)**

```typescript
// File: backend/src/cinemas/cinemas.controller.ts

@Delete(':id')
async delete(@Param('id') id: string) {
  // ✅ Chỉ thêm kiểm tra này (5 dòng code)
  const hallCount = await this.cinemasService.countHalls(id);
  const showtimeCount = await this.cinemasService.countShowtimes(id);
  const bookingCount = await this.cinemasService.countBookings(id);
  
  if (hallCount > 0 || showtimeCount > 0 || bookingCount > 0) {
    throw new BadRequestException({
      code: 'CONSTRAINT_VIOLATION',
      message: 'Cannot delete cinema with dependent data',
      halls: hallCount,
      showtimes: showtimeCount,
      bookings: bookingCount,
    });
  }
  
  // Proceed with delete
  return await this.cinemasService.delete(id);
}
```

#### **Frontend: Catch Error + Show Dialog**

```typescript
// File: FE/cinemas/page.tsx

const handleDelete = async (id: string) => {
  try {
    await deleteCinema.mutateAsync(id);
    toast.success('Cinema deleted');
  } catch (error: any) {
    // ✅ Catch error from BE validation
    if (error.response?.data?.code === 'CONSTRAINT_VIOLATION') {
      const { halls, showtimes, bookings } = error.response.data;
      
      toast.error({
        title: '❌ Không thể xóa rạp',
        description: (
          <div>
            <p>Rạp có:</p>
            <ul>
              {halls > 0 && <li>• {halls} phòng chiếu</li>}
              {showtimes > 0 && <li>• {showtimes} suất chiếu</li>}
              {bookings > 0 && <li>• {bookings} vé đặt</li>}
            </ul>
          </div>
        ),
      });
      return;
    }
    
    // Other errors
    toast.error(error.message);
  }
};
```

#### **Ưu Điểm Giải Pháp Này**

| Khía Cạnh | Chi Phí |
|----------|--------|
| **Backend Changes** | 5-10 dòng per endpoint (easy) |
| **API Mới** | ❌ Không cần |
| **Frontend Changes** | 10-15 dòng per page (easy) |
| **Testing** | Simple (just test delete endpoint) |
| **Maintenance** | Low (centralized logic in BE) |

#### **Timeline**

- Backend: **30 phút** (modify DELETE endpoints)
- Frontend: **1-2 giờ** (add error handling + UI)
- Total: **2-3 giờ** (vs 1-2 ngày với `/dependencies` endpoints)

---

## 🏢 Module: CINEMA (Rạp Chiếu Phim)

### Ràng Buộc Xóa (Delete Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| C-D1 | Cinema có Hall | Không cho xóa Cinema nếu đã có Hall thuộc Cinema đó | ❌ Chưa triển khai | `cinemas/page.tsx` | Cần kiểm tra trước khi xóa |
| C-D2 | Cinema có Showtime | Không cho xóa Cinema nếu có Showtime đang hoạt động | ❌ Chưa triển khai | `cinemas/page.tsx` | Cần kiểm tra qua Hall → Showtime |
| C-D3 | Cinema có Booking | Không cho xóa Cinema nếu có Booking chưa hoàn tất | ❌ Chưa triển khai | `cinemas/page.tsx` | Cần kiểm tra qua Showtime → Booking |

### Ràng Buộc Cập Nhật (Update Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| C-U1 | Cập nhật status | Không cho đổi status sang INACTIVE nếu có Showtime tương lai | ❌ Chưa triển khai | `cinemas/page.tsx` | Cần thông báo ảnh hưởng |

### Hiện Trạng Code

```typescript
// File: cinemas/page.tsx - Lines 180-187
const handleDelete = async (id: string) => {
  setDeleteConfirmId(id);
  setDeleteDialogOpen(true);
  // ❌ Không có kiểm tra constraint trước khi hiện dialog
};

// Confirmation dialog chỉ có warning chung chung
// ❌ Không hiển thị thông tin về số Hall, Showtime đang có
```

### Cần Bổ Sung

```typescript
// Trước khi xóa, cần:
// 1. Gọi API kiểm tra số lượng Hall
// 2. Gọi API kiểm tra số lượng Showtime đang hoạt động
// 3. Hiển thị thông báo: "Rạp này có X phòng chiếu và Y suất chiếu. Không thể xóa."
```

---

## 🎬 Module: HALL (Phòng Chiếu)

### Ràng Buộc Xóa (Delete Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| H-D1 | Hall có Showtime | Không cho xóa Hall nếu có Showtime đang hoạt động hoặc tương lai | ❌ Chưa triển khai | `halls/page.tsx` | Critical |
| H-D2 | Hall có Booking | Không cho xóa Hall nếu có Booking chưa hoàn tất | ❌ Chưa triển khai | `halls/page.tsx` | Qua Showtime → Booking |
| H-D3 | Hall có Seat đặc biệt | Cảnh báo nếu xóa Hall có cấu hình ghế đặc biệt | ❌ Chưa triển khai | `halls/page.tsx` | Warning only |

### Ràng Buộc Cập Nhật (Update Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| H-U1 | Thay đổi Layout | Không cho đổi layout nếu đã có Showtime | ❌ Chưa triển khai | `halls/page.tsx` | Layout bị khóa |
| H-U2 | Thay đổi Cinema | Không cho đổi Cinema nếu có Showtime | ❌ Chưa triển khai | `halls/page.tsx` | Ảnh hưởng data |

### Hiện Trạng Code

```typescript
// File: halls/page.tsx - Lines 98-106
const handleDeleteHall = async (hallId: string) => {
  setHallToDelete(hallId);
  setDeleteDialogOpen(true);
  // ❌ Không kiểm tra showtime/booking trước khi xóa
};

// ❌ useDeleteHall hook không có onError handler
// => Nếu BE trả lỗi constraint, user không thấy thông báo
```

### Cần Bổ Sung

```typescript
// 1. Thêm API: GET /api/v1/halls/{id}/dependencies
//    Trả về: { showtimes: number, bookings: number }
// 2. Kiểm tra trước khi hiện dialog xác nhận
// 3. Thêm onError handler cho useDeleteHall hook
```

---

## 🎥 Module: MOVIE (Phim)

### Ràng Buộc Xóa (Delete Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| M-D1 | Movie có Release | Không cho xóa Movie nếu có Movie Release | ❌ Chưa triển khai | `movies/page.tsx` | Critical |
| M-D2 | Movie có Showtime | Không cho xóa Movie nếu có Showtime đang chiếu/tương lai | ❌ Chưa triển khai | `movies/page.tsx` | Qua Release → Showtime |
| M-D3 | Movie có Review | Cảnh báo nếu xóa Movie có reviews | ❌ Chưa triển khai | `movies/page.tsx` | Warning only |

### Ràng Buộc Cập Nhật (Update Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| M-U1 | Đổi status | Cảnh báo khi đổi sang INACTIVE nếu có Showtime tương lai | ❌ Chưa triển khai | `movies/page.tsx` | Warning |
| M-U2 | Đổi runtime | Cảnh báo nếu có Showtime có thể bị ảnh hưởng end_time | ❌ Chưa triển khai | `movies/page.tsx` | Info only |

### Hiện Trạng Code

```typescript
// File: movies/page.tsx - Lines 282-290
const handleDelete = async () => {
  if (deleteId) {
    await deleteMovie.mutateAsync(deleteId);
    // ❌ Không kiểm tra release/showtime
    // ❌ Không có error handling cụ thể
  }
};
```

---

## 📅 Module: MOVIE RELEASE (Phát Hành Phim)

### Ràng Buộc Xóa (Delete Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| MR-D1 | Release có Showtime | Không cho xóa Release nếu có Showtime liên quan | ❌ Chưa triển khai | `movie-releases/page.tsx` | Critical |
| MR-D2 | Release đã qua | Cảnh báo nếu xóa Release có ngày trong quá khứ | ❌ Chưa triển khai | `movie-releases/page.tsx` | Archive data |

### Ràng Buộc Cập Nhật (Update Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| MR-U1 | Đổi ngày release | Cảnh báo nếu có Showtime trước ngày release mới | ❌ Chưa triển khai | `movie-releases/page.tsx` | Logic check |

### Hiện Trạng Code

```typescript
// File: movie-releases/page.tsx - Lines 88-102
const handleDelete = async () => {
  if (deleteReleaseId) {
    await deleteRelease.mutateAsync(deleteReleaseId);
    setDeleteReleaseId(null);
    setDeleteDialogOpen(false);
    // ❌ Không kiểm tra showtime dependency
  }
};
```

---

## 🕐 Module: SHOWTIME (Suất Chiếu)

### 🚨 VẤN ĐỀ NGHIÊM TRỌNG

**Showtime delete KHÔNG CÓ CONFIRMATION DIALOG** - User có thể vô tình xóa suất chiếu!

### Ràng Buộc Xóa (Delete Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| S-D1 | Showtime có Booking | Không cho xóa Showtime nếu có Booking (PENDING/CONFIRMED) | ❌ Chưa triển khai | `showtimes/page.tsx` | 🚨 CRITICAL |
| S-D2 | Showtime đã bắt đầu | Không cho xóa Showtime đã bắt đầu chiếu | ❌ Chưa triển khai | `showtimes/page.tsx` | Time check |
| S-D3 | Confirmation dialog | Hiện dialog xác nhận trước khi xóa | ❌ Chưa triển khai | `showtimes/page.tsx` | 🚨 MISSING! |

### Ràng Buộc Cập Nhật (Update Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| S-U1 | Đổi Hall khi có Booking | Không cho đổi Hall nếu đã có Booking (ghế đã chọn) | ❌ Chưa triển khai | `ShowtimeDialog.tsx` | Seat conflict |
| S-U2 | Đổi thời gian khi có Booking | Cảnh báo nếu đổi thời gian ảnh hưởng người đã đặt | ❌ Chưa triển khai | `ShowtimeDialog.tsx` | Notify users |
| S-U3 | Trùng thời gian | Kiểm tra trùng Hall + thời gian với Showtime khác | ❌ Chưa triển khai | `ShowtimeDialog.tsx` | BE handles |

### Hiện Trạng Code

```typescript
// File: showtimes/page.tsx - Lines 83-88
// 🚨 CRITICAL: Xóa trực tiếp KHÔNG CÓ confirmation dialog!
<Button
  variant="ghost"
  size="icon"
  onClick={() => deleteShowtime.mutate(showtime.id)}  // ❌ Xóa ngay lập tức!
>
  <Trash2 className="h-4 w-4 text-red-500" />
</Button>
```

### Cần Bổ Sung Ngay

```typescript
// 1. THÊM CONFIRMATION DIALOG - Bắt buộc!
// 2. Kiểm tra booking trước khi cho xóa
// 3. Hiển thị: "Suất chiếu này có X vé đã đặt. Bạn có chắc muốn xóa?"
// 4. Nếu có booking → Không cho xóa hoặc yêu cầu hủy booking trước
```

---

## 🍿 Module: CONCESSION (Đồ Ăn/Uống)

### Ràng Buộc Xóa (Delete Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| CO-D1 | Concession có Order | Không cho xóa nếu có trong Booking đang pending | ❌ Chưa triển khai | `concessions/page.tsx` | Check booking |
| CO-D2 | Concession có lịch sử | Cảnh báo nếu xóa item đã có trong đơn hàng cũ | ❌ Chưa triển khai | `concessions/page.tsx` | Soft delete |

### Ràng Buộc Cập Nhật (Update Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| CO-U1 | Đổi giá | Cảnh báo ảnh hưởng đến pending orders | ❌ Chưa triển khai | `concessions/page.tsx` | Price change |
| CO-U2 | Đổi availability | Tự động hủy khỏi pending orders nếu unavailable | ❌ Chưa triển khai | `concessions/page.tsx` | Auto update |

### Hiện Trạng Code

```typescript
// File: concessions/page.tsx - Lines 193-209
const handleConfirmDelete = async () => {
  if (!deleteConfirmId) return;
  try {
    await deleteConcession.mutateAsync(deleteConfirmId);
    // ✅ Có onError handler trong hook
    // ❌ Nhưng không kiểm tra constraint trước
  } catch {
    // Error handled by mutation hook
  }
};
```

---

## 🎭 Module: GENRE (Thể Loại)

### Ràng Buộc Xóa (Delete Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| G-D1 | Genre có Movie | Không cho xóa Genre nếu đang được gán cho Movie | ❌ Chưa triển khai | `genres/page.tsx` | Detach first |

### Hiện Trạng Code

```typescript
// File: genres/page.tsx - Lines 89-103
const handleDeleteGenre = async () => {
  if (deleteGenreId) {
    await deleteGenre.mutateAsync(deleteGenreId);
    // ❌ useDeleteGenre không có onError handler
    // => User không biết nếu BE từ chối xóa
  }
};
```

---

## 👥 Module: STAFF (Nhân Viên)

### Ràng Buộc Xóa (Delete Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| ST-D1 | Staff có Shift | Không cho xóa nếu có ca làm việc tương lai | ❌ Chưa triển khai | `staff/page.tsx` | Reassign |
| ST-D2 | Staff đang online | Cảnh báo nếu nhân viên đang trong ca | ❌ Chưa triển khai | `staff/page.tsx` | Active session |

### Hiện Trạng Code

```typescript
// File: staff/page.tsx - Lines 329-343
const handleDelete = async () => {
  if (!deleteUserId) return;
  try {
    await deleteUser.mutateAsync(deleteUserId);
    // ✅ Có onError handler
  } catch {
    // Error handled
  }
};
```

---

## 🎫 Module: BOOKING/RESERVATION (Đặt Vé)

### Ràng Buộc Cập Nhật Status (Update Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| B-U1 | Cancel completed | Không cho cancel booking đã COMPLETED | ✅ BE handles | `reservations/page.tsx` | BE validates |
| B-U2 | Cancel started | Cảnh báo nếu hủy booking của showtime đã bắt đầu | ❌ Chưa triển khai | `reservations/page.tsx` | Time check |
| B-U3 | Refund policy | Hiển thị policy hoàn tiền khi cancel | ❌ Chưa triển khai | `reservations/page.tsx` | Info display |

### Hiện Trạng Code

```typescript
// File: reservations/page.tsx - Lines 117-132
const handleStatusUpdate = async (
  bookingId: string,
  newStatus: BookingStatus
) => {
  await updateStatus.mutateAsync({
    id: bookingId,
    status: newStatus,
  });
  // ✅ Có onError handler
  // ❌ Không kiểm tra time constraint trước
};
```

---

## 👤 Module: USER (Người Dùng)

### Ràng Buộc Xóa (Delete Constraints)

| # | Ràng Buộc | Mô Tả | Trạng Thái | File | Ghi Chú |
|---|-----------|-------|------------|------|---------|
| U-D1 | User có Booking | Không cho xóa User có booking history | ❌ Chưa triển khai | N/A | Soft delete |
| U-D2 | User có Review | Cảnh báo/xử lý reviews khi xóa user | ❌ Chưa triển khai | N/A | Orphan data |

---

## 🔧 API Hooks - Error Handling Status

### Hooks CÓ onError Handler ✅

| Hook | File | Error Handling |
|------|------|----------------|
| `useDeleteCinema` | hooks.ts | ✅ Toast error message |
| `useDeleteConcession` | hooks.ts | ✅ Toast error message |
| `useDeleteStaff` | hooks.ts | ✅ Toast error message |
| `useUpdateBookingStatus` | hooks.ts | ✅ Toast error message |
| `useCreateMovie` | hooks.ts | ✅ Toast with validation details |
| `useUpdateMovie` | hooks.ts | ✅ Toast with validation details |

### Hooks KHÔNG CÓ onError Handler ❌

| Hook | File | Vấn Đề |
|------|------|--------|
| `useDeleteHall` | hooks.ts | ❌ Silent failure - User không biết lỗi |
| `useDeleteMovie` | hooks.ts | ❌ Silent failure |
| `useDeleteMovieRelease` | hooks.ts | ❌ Silent failure |
| `useDeleteShowtime` | hooks.ts | ❌ Silent failure |
| `useDeleteGenre` | hooks.ts | ❌ Silent failure |
| `useDeleteReview` | hooks.ts | ❌ Silent failure |

---

## 📋 Action Items - Ưu Tiên Triển Khai (Fast Solution)

### 🚀 Sprint 1: CRITICAL (Cần làm ngay) - 2-3 giờ

#### Backend Tasks (30 phút)
| # | Task | Module | Code |
|---|------|--------|------|
| B1 | Modify DELETE endpoint - add constraint check | Cinema | 10 lines |
| B2 | Modify DELETE endpoint - add constraint check | Hall | 10 lines |
| B3 | Modify DELETE endpoint - add constraint check | Movie | 10 lines |
| B4 | Modify DELETE endpoint - add constraint check | Movie Release | 10 lines |
| B5 | Modify DELETE endpoint - add constraint check | Showtime | 10 lines |
| B6 | Modify DELETE endpoint - add constraint check | Genre | 10 lines |
| B7 | Modify DELETE endpoint - add constraint check | Concession | 10 lines |

**Tip**: Copy-paste pattern một lần, modify values, xong!

#### Frontend Tasks (1.5-2 giờ)
| # | Task | Module | Code |
|---|------|--------|------|
| F1 | Add error handler + constraint dialog | Cinema | 15 lines |
| F2 | Add error handler + constraint dialog | Hall | 15 lines |
| F3 | Add error handler + constraint dialog | Movie | 15 lines |
| F4 | Add error handler + constraint dialog | Movie Release | 15 lines |
| F5 | Add confirmation + error handler | Showtime | 20 lines |
| F6 | Add error handler + constraint dialog | Genre | 15 lines |
| F7 | Add error handler + constraint dialog | Concession | 15 lines |

### ⚠️ Sprint 2: HIGH (1-2 ngày) - UX Polish

| # | Task | Priority |
|---|------|----------|
| 7 | Disable delete button nếu có constraint (FE) | HIGH |
| 8 | Add loading state khi delete | HIGH |
| 9 | Show toast notification style consistent | HIGH |
| 10 | Test cascade delete prevent | HIGH |

---

## 🛠️ Implementation Guide

### Pattern cho Pre-Delete Validation

```typescript
// Ví dụ: Kiểm tra constraint trước khi xóa Hall

const handleDeleteHall = async (hallId: string) => {
  // 1. Kiểm tra dependencies
  const dependencies = await checkHallDependencies(hallId);
  
  if (dependencies.showtimes > 0) {
    toast({
      title: "Không thể xóa",
      description: `Phòng chiếu này có ${dependencies.showtimes} suất chiếu. Vui lòng xóa suất chiếu trước.`,
      variant: "destructive",
    });
    return;
  }
  
  if (dependencies.bookings > 0) {
    toast({
      title: "Không thể xóa",
      description: `Phòng chiếu này có ${dependencies.bookings} đặt vé chưa hoàn tất.`,
      variant: "destructive",
    });
    return;
  }
  
  // 2. Hiện confirmation dialog
  setHallToDelete(hallId);
  setDeleteDialogOpen(true);
};
```

### Pattern cho onError Handler

```typescript
// Thêm vào hooks.ts

export const useDeleteHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => hallsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.halls.lists() });
      toast.success('Hall deleted successfully');
    },
    onError: (error: Error & { responseData?: { message?: string } }) => {
      // ✅ Thêm error handler
      const message = error.responseData?.message || error.message || 'Failed to delete hall';
      toast.error(message);
    },
  });
};
```

### Pattern cho Confirmation Dialog với Constraint Info

```typescript
// Confirmation dialog hiển thị thông tin constraint

<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Xác nhận xóa?</AlertDialogTitle>
      <AlertDialogDescription>
        {dependencies && dependencies.count > 0 ? (
          <div className="text-red-500">
            ⚠️ Không thể xóa! Có {dependencies.count} mục phụ thuộc:
            <ul className="list-disc ml-4 mt-2">
              {dependencies.showtimes > 0 && (
                <li>{dependencies.showtimes} suất chiếu</li>
              )}
              {dependencies.bookings > 0 && (
                <li>{dependencies.bookings} đặt vé</li>
              )}
            </ul>
          </div>
        ) : (
          "Hành động này không thể hoàn tác."
        )}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Hủy</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleConfirmDelete}
        disabled={dependencies && dependencies.count > 0}
      >
        Xóa
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## 📊 Backend Error Response Format

**Không cần thêm API mới** - Chỉ modify DELETE endpoint error response

### ✅ DELETE Endpoint Error Response (Recommended)

```json
{
  "statusCode": 400,
  "code": "CONSTRAINT_VIOLATION",
  "message": "Cannot delete cinema with dependent data",
  "halls": 3,
  "showtimes": 15,
  "bookings": 42
}
```

### Áp Dụng Cho Tất Cả Module

| Module | Fields | Ví Dụ |
|--------|--------|-------|
| Cinema | `halls`, `showtimes`, `bookings` | `{ halls: 3, showtimes: 15, bookings: 42 }` |
| Hall | `showtimes`, `bookings` | `{ showtimes: 5, bookings: 20 }` |
| Movie | `releases`, `showtimes`, `reviews` | `{ releases: 2, showtimes: 10, reviews: 5 }` |
| Movie Release | `showtimes` | `{ showtimes: 3 }` |
| Showtime | `bookings`, `confirmedBookings` | `{ bookings: 15, confirmedBookings: 12 }` |
| Genre | `movies` | `{ movies: 5 }` |
| Concession | `pendingOrders` | `{ pendingOrders: 2 }` |

### Quick Copy-Paste cho Backend (NestJS)

```typescript
// Tạo exception này một lần, dùng lại everywhere
export class ConstraintViolationException extends BadRequestException {
  constructor(
    private dependencyInfo: Record<string, number>
  ) {
    super({
      code: 'CONSTRAINT_VIOLATION',
      message: 'Cannot delete: has dependent data',
      ...dependencyInfo,
    });
  }
}

// Dùng:
if (deps.count > 0) {
  throw new ConstraintViolationException({
    halls: deps.halls,
    showtimes: deps.showtimes,
    bookings: deps.bookings,
  });
}
```

---

## 📅 Timeline Đề Xuất

### Phase 1: Nhanh (2-3 giờ) - Fast Solution

**Backend Changes** (30 phút):
```
Modify DELETE endpoints (6 endpoints) → Add constraint check → Return error
```

**Frontend Changes** (1.5-2 giờ):
```
Add error handling + show constraint dialog → Test
```

**Result**: ✅ Prevent delete + show why can't delete

---

### Phase 2: Polish (1 ngày) - UX Improvements

- Disable delete button when has constraints (FE)
- Add loading states
- Test all scenarios
- QA sign-off

---

### Phase 3: Optional (Future) - Advanced Features

- Soft delete with archive
- Auto-cascade some items with confirmation
- Bulk delete with constraint preview

---

## ✅ Checklist Hoàn Thành

- [ ] Tất cả delete operations có confirmation dialog
- [ ] Tất cả delete hooks có onError handler
- [ ] Pre-delete validation cho Cinema dependencies
- [ ] Pre-delete validation cho Hall dependencies
- [ ] Pre-delete validation cho Movie dependencies
- [ ] Pre-delete validation cho Showtime dependencies
- [ ] Update constraints cho Booking status
- [ ] Error messages hiển thị thông tin constraint cụ thể
- [ ] QA test tất cả constraint scenarios
- [ ] Documentation updated

---

**Last Updated**: January 3, 2026  
**Author**: GitHub Copilot  
**Status**: 🔴 Cần triển khai nhiều ràng buộc quan trọng

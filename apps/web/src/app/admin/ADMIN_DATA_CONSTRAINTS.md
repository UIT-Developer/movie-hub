# 📋 Admin FE - Data Constraints Audit (Full Version)

**Date**: January 4, 2026  
**Updated**: January 4, 2026 - Thêm CREATE constraints + cập nhật toàn bộ  
**Purpose**: Rà soát và quản lý các ràng buộc dữ liệu (business/data constraints) trên Admin FE  
**Status**: 🔴 Cần bổ sung nhiều ràng buộc quan trọng

---

## 📊 Tổng Quan

| Module | CREATE | UPDATE | DELETE | Tổng | Đã Triển Khai | Chưa Triển Khai |
|--------|--------|--------|--------|------|---------------|-----------------|
| Cinema | 3 | 4 | 3 | **10** | 0 | 10 |
| Hall | 5 | 4 | 3 | **12** | 0 | 12 |
| Movie | 4 | 3 | 3 | **10** | 0 | 10 |
| Movie Release | 5 | 4 | 2 | **11** | 0 | 11 |
| Showtime | 8 | 6 | 4 | **18** | 0 | 18 |
| Booking/Reservation | 5 | 5 | 2 | **12** | 2 | 10 |
| Concession | 3 | 3 | 2 | **8** | 1 | 7 |
| Genre | 2 | 1 | 2 | **5** | 0 | 5 |
| Ticket Pricing | 3 | 2 | 1 | **6** | 0 | 6 |
| Staff | 5 | 3 | 2 | **10** | 1 | 9 |
| **TOTAL** | **43** | **35** | **24** | **102** | **4** | **98** |

---

## 🚨 LỖI NGHIÊM TRỌNG ĐÃ PHÁT HIỆN (Critical Bugs)

### Bug #1: Showtime có thể tạo ngoài Release Period
**Mức độ**: 🔴 CRITICAL  
**Mô tả**: Hiện tại cho phép tạo Showtime có ngày lớn hơn `endDate` của Release tương ứng  
**Ảnh hưởng**: Suất chiếu có thể được tạo sau khi phim đã hết thời gian phát hành  
**File liên quan**: `ShowtimeDialog.tsx`, `batch-showtimes/page.tsx`

### Bug #2: Release startDate có thể nhỏ hơn Movie releaseDate
**Mức độ**: 🔴 CRITICAL  
**Mô tả**: Movie có ngày ra mắt là X nhưng cho tạo Release có `startDate` nhỏ hơn X  
**Ảnh hưởng**: Phim có thể được phát hành trước cả ngày ra mắt chính thức  
**File liên quan**: `movie-releases/page.tsx`, `MovieReleaseDialog.tsx`

### Bug #3: Showtime delete không có confirmation dialog
**Mức độ**: 🔴 CRITICAL  
**Mô tả**: Nút xóa suất chiếu gọi delete trực tiếp, không có dialog xác nhận  
**Ảnh hưởng**: User có thể vô tình xóa suất chiếu có booking  
**File liên quan**: `showtimes/page.tsx`

---

## 🏢 Module: CINEMA (Rạp Chiếu Phim)

### ➕ Ràng Buộc Tạo (CREATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| C-C1 | Tên rạp unique | Không cho tạo rạp trùng tên | 🟡 HIGH | ❌ Chưa | `cinemas/page.tsx` |
| C-C2 | Địa chỉ bắt buộc | Rạp phải có địa chỉ đầy đủ | 🟡 HIGH | ❌ Chưa | `CinemaDialog.tsx` |
| C-C3 | Status mặc định | Status mặc định là ACTIVE khi tạo | 🟢 LOW | ✅ BE handles | - |

### ✏️ Ràng Buộc Cập Nhật (UPDATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| C-U1 | Đổi status → INACTIVE | Cảnh báo nếu có Showtime tương lai | 🟡 HIGH | ❌ Chưa | `cinemas/page.tsx` |
| C-U2 | Đổi status → INACTIVE | Không cho đổi nếu có Booking chưa hoàn tất | 🔴 CRITICAL | ❌ Chưa | `cinemas/page.tsx` |
| C-U3 | Đổi tên rạp | Kiểm tra unique name | 🟡 HIGH | ❌ Chưa | `CinemaDialog.tsx` |
| C-U4 | Đổi địa chỉ | Cảnh báo ảnh hưởng hiển thị cho user đã đặt vé | 🟢 MEDIUM | ❌ Chưa | `CinemaDialog.tsx` |

### 🗑️ Ràng Buộc Xóa (DELETE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| C-D1 | Cinema có Hall | Không cho xóa nếu có Hall thuộc Cinema | 🔴 CRITICAL | ❌ Chưa | `cinemas/page.tsx` |
| C-D2 | Cinema có Showtime | Không cho xóa nếu có Showtime (qua Hall) | 🔴 CRITICAL | ❌ Chưa | `cinemas/page.tsx` |
| C-D3 | Cinema có Booking | Không cho xóa nếu có Booking chưa hoàn tất | 🔴 CRITICAL | ❌ Chưa | `cinemas/page.tsx` |

---

## 🎬 Module: HALL (Phòng Chiếu)

### ➕ Ràng Buộc Tạo (CREATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| H-C1 | Cinema phải ACTIVE | Không tạo Hall cho Cinema đã INACTIVE | 🔴 CRITICAL | ❌ Chưa | `halls/page.tsx` |
| H-C2 | Tên Hall unique per Cinema | Không trùng tên trong cùng rạp | 🟡 HIGH | ❌ Chưa | `HallDialog.tsx` |
| H-C3 | Layout hợp lệ | Layout phải có ít nhất 1 row và 1 seat | 🟡 HIGH | ❌ Chưa | `HallDialog.tsx` |
| H-C4 | Số ghế hợp lệ | totalSeats phải > 0 | 🟡 HIGH | ❌ Chưa | `HallDialog.tsx` |
| H-C5 | Format hợp lệ | Format phải là enum value hợp lệ | 🟢 LOW | ✅ BE validates | - |

### ✏️ Ràng Buộc Cập Nhật (UPDATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| H-U1 | Đổi Layout | 🔴 KHÔNG CHO đổi nếu đã có Showtime | 🔴 CRITICAL | ❌ Chưa | `HallDialog.tsx` |
| H-U2 | Đổi Cinema | 🔴 KHÔNG CHO đổi Cinema | 🔴 CRITICAL | ❌ Chưa | `HallDialog.tsx` |
| H-U3 | Đổi status → INACTIVE | Cảnh báo nếu có Showtime tương lai | 🟡 HIGH | ❌ Chưa | `halls/page.tsx` |
| H-U4 | Đổi totalSeats | Không cho đổi nếu có Booking (seat references) | 🔴 CRITICAL | ❌ Chưa | `HallDialog.tsx` |

### 🗑️ Ràng Buộc Xóa (DELETE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| H-D1 | Hall có Showtime | Không cho xóa nếu có Showtime (kể cả quá khứ) | 🔴 CRITICAL | ❌ Chưa | `halls/page.tsx` |
| H-D2 | Hall có Booking | Không cho xóa nếu có Booking | 🔴 CRITICAL | ❌ Chưa | `halls/page.tsx` |
| H-D3 | Confirmation dialog | Hiện dialog xác nhận + warning | 🟡 HIGH | ❌ Chưa | `halls/page.tsx` |

---

## 🎥 Module: MOVIE (Phim)

### ➕ Ràng Buộc Tạo (CREATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| M-C1 | Title bắt buộc | Phim phải có tên | 🟡 HIGH | ✅ FE validates | `MovieDialog.tsx` |
| M-C2 | Runtime > 0 | Thời lượng phim > 0 phút | 🟡 HIGH | ❌ Chưa | `MovieDialog.tsx` |
| M-C3 | releaseDate hợp lệ | Ngày phát hành phải là date hợp lệ | 🟡 HIGH | ❌ Chưa | `MovieDialog.tsx` |
| M-C4 | Genre tồn tại | Genre IDs phải tồn tại trong DB | 🟢 MEDIUM | ✅ BE validates | - |

### ✏️ Ràng Buộc Cập Nhật (UPDATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| M-U1 | Đổi releaseDate | ⚠️ Cảnh báo nếu có Release có startDate < newReleaseDate | 🔴 CRITICAL | ❌ Chưa | `MovieDialog.tsx` |
| M-U2 | Đổi runtime | Cảnh báo ảnh hưởng endTime của Showtime đã tạo | 🟡 HIGH | ❌ Chưa | `MovieDialog.tsx` |
| M-U3 | Đổi status → INACTIVE | Không cho đổi nếu có Showtime tương lai | 🔴 CRITICAL | ❌ Chưa | `movies/page.tsx` |

### 🗑️ Ràng Buộc Xóa (DELETE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| M-D1 | Movie có Release | 🔴 KHÔNG CHO xóa nếu có MovieRelease | 🔴 CRITICAL | ❌ Chưa | `movies/page.tsx` |
| M-D2 | Movie có Showtime | Không cho xóa nếu có Showtime (qua Release) | 🔴 CRITICAL | ❌ Chưa | `movies/page.tsx` |
| M-D3 | Movie có Review | Cảnh báo sẽ mất reviews nếu xóa | 🟢 MEDIUM | ❌ Chưa | `movies/page.tsx` |

---

## 📅 Module: MOVIE RELEASE (Phát Hành Phim)

### ➕ Ràng Buộc Tạo (CREATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| MR-C1 | 🚨 startDate >= Movie.releaseDate | Release KHÔNG THỂ bắt đầu trước ngày ra mắt phim | 🔴 CRITICAL | ❌ **BUG** | `movie-releases/page.tsx` |
| MR-C2 | endDate > startDate | Ngày kết thúc phải sau ngày bắt đầu | 🔴 CRITICAL | ❌ Chưa | `MovieReleaseDialog.tsx` |
| MR-C3 | Movie phải ACTIVE | Không tạo Release cho phim đã INACTIVE | 🟡 HIGH | ❌ Chưa | `movie-releases/page.tsx` |
| MR-C4 | Không chồng lấn Release | Cùng Movie không có 2 Release overlap period | 🟡 HIGH | ❌ Chưa | `MovieReleaseDialog.tsx` |
| MR-C5 | Cinema phải ACTIVE | Release chỉ có thể ở Cinema đang ACTIVE | 🟡 HIGH | ❌ Chưa | `MovieReleaseDialog.tsx` |

### ✏️ Ràng Buộc Cập Nhật (UPDATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| MR-U1 | Đổi startDate | 🔴 KHÔNG CHO nhỏ hơn Movie.releaseDate | 🔴 CRITICAL | ❌ Chưa | `MovieReleaseDialog.tsx` |
| MR-U2 | Đổi endDate | 🔴 KHÔNG CHO nhỏ hơn max(Showtime.startTime) | 🔴 CRITICAL | ❌ Chưa | `MovieReleaseDialog.tsx` |
| MR-U3 | Thu hẹp period | Cảnh báo nếu có Showtime nằm ngoài period mới | 🔴 CRITICAL | ❌ Chưa | `MovieReleaseDialog.tsx` |
| MR-U4 | Đổi status | Không cho INACTIVE nếu có Showtime tương lai | 🟡 HIGH | ❌ Chưa | `movie-releases/page.tsx` |

### 🗑️ Ràng Buộc Xóa (DELETE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| MR-D1 | Release có Showtime | 🔴 KHÔNG CHO xóa nếu có Showtime | 🔴 CRITICAL | ❌ Chưa | `movie-releases/page.tsx` |
| MR-D2 | Confirmation dialog | Hiện dialog + số lượng Showtime sẽ bị ảnh hưởng | 🟡 HIGH | ❌ Chưa | `movie-releases/page.tsx` |

---

## 🕐 Module: SHOWTIME (Suất Chiếu) - 🔴 NHIỀU LỖI NHẤT

### ➕ Ràng Buộc Tạo (CREATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| S-C1 | 🚨 startTime trong Release period | startTime PHẢI >= Release.startDate VÀ <= Release.endDate | 🔴 CRITICAL | ❌ **BUG** | `ShowtimeDialog.tsx` |
| S-C2 | 🚨 endTime trong Release period | endTime (startTime + runtime) <= Release.endDate | 🔴 CRITICAL | ❌ **BUG** | `ShowtimeDialog.tsx` |
| S-C3 | Hall phải ACTIVE | Không tạo Showtime cho Hall đã INACTIVE | 🔴 CRITICAL | ❌ Chưa | `ShowtimeDialog.tsx` |
| S-C4 | Cinema phải ACTIVE | Không tạo Showtime cho Cinema đã INACTIVE | 🔴 CRITICAL | ❌ Chưa | `ShowtimeDialog.tsx` |
| S-C5 | Không trùng Hall + Time | Không có 2 Showtime cùng Hall overlap thời gian | 🔴 CRITICAL | ✅ BE validates | - |
| S-C6 | startTime > now | Không tạo Showtime trong quá khứ | 🟡 HIGH | ❌ Chưa | `ShowtimeDialog.tsx` |
| S-C7 | Release phải ACTIVE | Không tạo Showtime cho Release đã cancel | 🟡 HIGH | ❌ Chưa | `ShowtimeDialog.tsx` |
| S-C8 | Format phù hợp Hall | Showtime.format phải Hall support (2D Hall không chiếu IMAX) | 🟢 MEDIUM | ❌ Chưa | `ShowtimeDialog.tsx` |

### ✏️ Ràng Buộc Cập Nhật (UPDATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| S-U1 | Đổi Hall khi có Booking | 🔴 KHÔNG CHO đổi Hall nếu có Booking (seats khác) | 🔴 CRITICAL | ❌ Chưa | `ShowtimeDialog.tsx` |
| S-U2 | Đổi startTime khi có Booking | ⚠️ Cảnh báo + cần confirm nếu có Booking | 🔴 CRITICAL | ❌ Chưa | `ShowtimeDialog.tsx` |
| S-U3 | Đổi startTime vẫn trong period | startTime mới PHẢI trong Release period | 🔴 CRITICAL | ❌ Chưa | `ShowtimeDialog.tsx` |
| S-U4 | Không đổi Showtime đã chiếu | Không cho edit Showtime có startTime < now | 🟡 HIGH | ❌ Chưa | `ShowtimeDialog.tsx` |
| S-U5 | Đổi Release | Cảnh báo nếu startTime không còn hợp lệ với Release mới | 🟡 HIGH | ❌ Chưa | `ShowtimeDialog.tsx` |
| S-U6 | Đổi format | Kiểm tra Hall có support format mới không | 🟢 MEDIUM | ❌ Chưa | `ShowtimeDialog.tsx` |

### 🗑️ Ràng Buộc Xóa (DELETE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| S-D1 | 🚨 Confirmation dialog | **THIẾU** - Hiện đang xóa trực tiếp không confirm! | 🔴 CRITICAL | ❌ **BUG** | `showtimes/page.tsx` |
| S-D2 | Showtime có Booking | 🔴 KHÔNG CHO xóa nếu có Booking (PENDING/CONFIRMED) | 🔴 CRITICAL | ❌ Chưa | `showtimes/page.tsx` |
| S-D3 | Showtime đã bắt đầu | Không cho xóa Showtime đã/đang chiếu | 🟡 HIGH | ❌ Chưa | `showtimes/page.tsx` |
| S-D4 | Show booking count | Dialog hiện số vé đã đặt nếu có | 🟡 HIGH | ❌ Chưa | `showtimes/page.tsx` |

---

## 🎫 Module: BOOKING/RESERVATION (Đặt Vé)

### ➕ Ràng Buộc Tạo (CREATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| B-C1 | Showtime chưa chiếu | Không đặt vé Showtime đã bắt đầu | 🔴 CRITICAL | ✅ BE validates | - |
| B-C2 | Ghế còn trống | Ghế chọn phải AVAILABLE | 🔴 CRITICAL | ✅ BE validates | - |
| B-C3 | Showtime còn slot | availableSeats > 0 | 🟡 HIGH | ✅ BE validates | - |
| B-C4 | User hợp lệ | User phải tồn tại và ACTIVE | 🟡 HIGH | ✅ BE validates | - |
| B-C5 | Giá hợp lệ | totalPrice = sum(seats) + sum(concessions) | 🟡 HIGH | ✅ BE calculates | - |

### ✏️ Ràng Buộc Cập Nhật (UPDATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| B-U1 | Cancel COMPLETED | 🔴 KHÔNG CHO cancel booking đã COMPLETED | 🔴 CRITICAL | ✅ BE validates | - |
| B-U2 | Cancel time limit | Chỉ cancel trước showtime 2 tiếng (configurable) | 🟡 HIGH | ❌ Chưa | `reservations/page.tsx` |
| B-U3 | Status transitions | PENDING → CONFIRMED → COMPLETED (không ngược) | 🔴 CRITICAL | ✅ BE validates | - |
| B-U4 | Đổi seats | 🔴 KHÔNG CHO đổi seats sau khi CONFIRMED | 🔴 CRITICAL | ✅ BE validates | - |
| B-U5 | Cảnh báo refund | Hiện policy hoàn tiền khi admin cancel | 🟢 MEDIUM | ❌ Chưa | `reservations/page.tsx` |

### 🗑️ Ràng Buộc Xóa (DELETE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| B-D1 | Không cho xóa | Booking chỉ cancel, không xóa (audit trail) | 🔴 CRITICAL | ✅ No delete API | - |
| B-D2 | Soft delete only | Nếu cần xóa thì soft delete + log lý do | 🟡 HIGH | ✅ Design choice | - |

---

## 🍿 Module: CONCESSION (Đồ Ăn/Uống)

### ➕ Ràng Buộc Tạo (CREATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| CO-C1 | Tên unique | Không trùng tên concession | 🟡 HIGH | ❌ Chưa | `ConcessionDialog.tsx` |
| CO-C2 | Giá > 0 | Price phải lớn hơn 0 | 🟡 HIGH | ❌ Chưa | `ConcessionDialog.tsx` |
| CO-C3 | Category hợp lệ | Category phải là value hợp lệ | 🟢 LOW | ✅ FE validates | - |

### ✏️ Ràng Buộc Cập Nhật (UPDATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| CO-U1 | Đổi giá | Cảnh báo ảnh hưởng pending bookings | 🟡 HIGH | ❌ Chưa | `ConcessionDialog.tsx` |
| CO-U2 | Đổi availability → false | Tự động remove khỏi pending bookings | 🟡 HIGH | ❌ Chưa | `concessions/page.tsx` |
| CO-U3 | Đổi tên | Kiểm tra unique | 🟢 MEDIUM | ❌ Chưa | `ConcessionDialog.tsx` |

### 🗑️ Ràng Buộc Xóa (DELETE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| CO-D1 | Concession trong pending order | Không xóa nếu có trong booking đang pending | 🔴 CRITICAL | ❌ Chưa | `concessions/page.tsx` |
| CO-D2 | Soft delete | Concession có lịch sử nên soft delete thay vì hard delete | 🟢 MEDIUM | ❌ Chưa | `concessions/page.tsx` |

---

## 🎭 Module: GENRE (Thể Loại)

### ➕ Ràng Buộc Tạo (CREATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| G-C1 | Tên unique | Không trùng tên genre | 🟡 HIGH | ❌ Chưa | `genres/page.tsx` |
| G-C2 | Tên không rỗng | Genre phải có tên | 🟡 HIGH | ❌ Chưa | `genres/page.tsx` |

### ✏️ Ràng Buộc Cập Nhật (UPDATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| G-U1 | Đổi tên | Kiểm tra unique | 🟡 HIGH | ❌ Chưa | `genres/page.tsx` |

### 🗑️ Ràng Buộc Xóa (DELETE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| G-D1 | Genre có Movie | Không xóa Genre đang được gán cho Movie | 🔴 CRITICAL | ❌ Chưa | `genres/page.tsx` |
| G-D2 | Confirmation + count | Hiện số Movie đang dùng Genre này | 🟡 HIGH | ❌ Chưa | `genres/page.tsx` |

---

## 💰 Module: TICKET PRICING (Định Giá Vé)

### ➕ Ràng Buộc Tạo (CREATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| TP-C1 | Price > 0 | Giá vé phải > 0 | 🟡 HIGH | ❌ Chưa | `ticket-pricing/page.tsx` |
| TP-C2 | Không trùng rule | Không có 2 rule cùng (dayType, timeSlot, seatType, format) | 🟡 HIGH | ❌ Chưa | `ticket-pricing/page.tsx` |
| TP-C3 | Enum values hợp lệ | dayType, seatType, format phải là enum hợp lệ | 🟢 MEDIUM | ✅ FE validates | - |

### ✏️ Ràng Buộc Cập Nhật (UPDATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| TP-U1 | Đổi price | Cảnh báo: giá mới áp dụng cho booking mới | 🟢 MEDIUM | ❌ Chưa | `ticket-pricing/page.tsx` |
| TP-U2 | Đổi conditions | Kiểm tra unique rule | 🟡 HIGH | ❌ Chưa | `ticket-pricing/page.tsx` |

### 🗑️ Ràng Buộc Xóa (DELETE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| TP-D1 | Phải có rule mặc định | Cảnh báo nếu xóa rule cuối cùng của loại ghế | 🟡 HIGH | ❌ Chưa | `ticket-pricing/page.tsx` |

---

## 👥 Module: STAFF (Nhân Viên)

### ➕ Ràng Buộc Tạo (CREATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| ST-C1 | Email unique | Không trùng email | 🔴 CRITICAL | ❌ Chưa | `staff/page.tsx` |
| ST-C2 | Email format | Email phải valid format | 🟡 HIGH | ❌ Chưa | `staff/page.tsx` |
| ST-C3 | Rạp hợp lệ | Nếu assign cinema, cinema phải tồn tại và ACTIVE | 🟡 HIGH | ❌ Chưa | `staff/page.tsx` |
| ST-C4 | Password policy | Password đủ mạnh (nếu tạo account) | 🟡 HIGH | ❌ Chưa | `staff/page.tsx` |
| ST-C5 | Role hợp lệ | Role phải là enum value hợp lệ | 🟢 LOW | ✅ FE validates | - |

### ✏️ Ràng Buộc Cập Nhật (UPDATE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| ST-U1 | Đổi email | Kiểm tra unique | 🟡 HIGH | ❌ Chưa | `staff/page.tsx` |
| ST-U2 | Đổi role | Cảnh báo ảnh hưởng permissions | 🟢 MEDIUM | ❌ Chưa | `staff/page.tsx` |
| ST-U3 | Đổi cinema | Cảnh báo nếu có shift tương lai ở rạp cũ | 🟢 MEDIUM | ❌ Chưa | `staff/page.tsx` |

### 🗑️ Ràng Buộc Xóa (DELETE Constraints)

| # | Ràng Buộc | Mô Tả | Ưu Tiên | Trạng Thái | File |
|---|-----------|-------|---------|------------|------|
| ST-D1 | Staff có shift tương lai | Không xóa nếu có shift chưa qua | 🟡 HIGH | ❌ Chưa | `staff/page.tsx` |
| ST-D2 | Soft delete | Staff có history nên soft delete | 🟢 MEDIUM | ❌ Chưa | `staff/page.tsx` |

---

## 🚀 Implementation Priority

### 🔴 CRITICAL - Sprint 1 (Làm ngay - 1-2 ngày)

| # | Constraint | Module | Lý do |
|---|------------|--------|-------|
| 1 | S-C1, S-C2 | Showtime | **BUG**: Cho tạo showtime ngoài release period |
| 2 | MR-C1 | Movie Release | **BUG**: Cho release trước ngày ra mắt phim |
| 3 | S-D1 | Showtime | **BUG**: Xóa showtime không có confirmation |
| 4 | S-D2 | Showtime | Xóa showtime có booking = mất tiền khách |
| 5 | MR-D1 | Movie Release | Xóa release = orphan showtimes |
| 6 | M-D1 | Movie | Xóa movie = orphan releases |

### 🟡 HIGH - Sprint 2 (1 tuần)

| # | Constraint | Module | Lý do |
|---|------------|--------|-------|
| 7 | H-U1 | Hall | Đổi layout khi có showtime = seat mapping broken |
| 8 | S-U1 | Showtime | Đổi hall khi có booking = invalid seats |
| 9 | MR-U2 | Movie Release | Thu hẹp period có thể orphan showtimes |
| 10 | C-D1, C-D2, C-D3 | Cinema | Delete cinema cascade nhiều data |
| 11 | H-D1, H-D2 | Hall | Delete hall cascade showtimes |
| 12 | G-D1 | Genre | Delete genre đang dùng = broken data |

### 🟢 MEDIUM - Sprint 3 (2 tuần)

| # | Constraint | Module | Lý do |
|---|------------|--------|-------|
| 13 | All unique checks | All | Data integrity |
| 14 | Status change warnings | Cinema, Hall, Movie | User awareness |
| 15 | B-U2 | Booking | Cancel time limit |
| 16 | CO-D1 | Concession | Pending order integrity |

### ⚪ LOW - Backlog

| # | Constraint | Module | Lý do |
|---|------------|--------|-------|
| 17 | Soft deletes | All | Audit trail (nice to have) |
| 18 | Info warnings | All | UX improvements |

---

## ⚡ FAST SOLUTION - Backend Error Response

### Mô Hình Xử Lý

```
User click action → FE call API
                       ↓
                   BE kiểm tra constraint
                       ↓
                   Nếu vi phạm:
                     Return 400 + error details
                   Nếu OK:
                     Execute + Return 200
                       ↓
                   FE catch error → Show constraint info
```

### Backend Error Response Format

```json
{
  "statusCode": 400,
  "code": "CONSTRAINT_VIOLATION",
  "message": "Cannot delete cinema with dependent data",
  "details": {
    "halls": 3,
    "showtimes": 15,
    "bookings": 42
  }
}
```

### CREATE Validation Error Format

```json
{
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "Release startDate cannot be before movie releaseDate",
  "details": {
    "field": "startDate",
    "value": "2026-01-01",
    "constraint": "Movie releaseDate is 2026-01-15"
  }
}
```

---

## 📝 Checklist Hoàn Thành

### CREATE Constraints
- [ ] MR-C1: Release startDate >= Movie releaseDate
- [ ] S-C1: Showtime startTime trong release period
- [ ] S-C2: Showtime endTime trong release period
- [ ] H-C1: Hall chỉ tạo cho Cinema ACTIVE
- [ ] S-C3, S-C4: Showtime chỉ cho Hall/Cinema ACTIVE
- [ ] All unique name checks

### UPDATE Constraints
- [ ] H-U1: Không đổi layout khi có showtime
- [ ] S-U1: Không đổi hall khi có booking
- [ ] MR-U2: Không thu hẹp period có showtime ngoài
- [ ] All status change validations

### DELETE Constraints
- [ ] S-D1: Showtime confirmation dialog
- [ ] S-D2: Không xóa showtime có booking
- [ ] MR-D1: Không xóa release có showtime
- [ ] M-D1: Không xóa movie có release
- [ ] C-D1, H-D1, G-D1: All dependency checks

---

**Last Updated**: January 4, 2026  
**Author**: GitHub Copilot  
**Status**: 🔴 102 ràng buộc cần triển khai, chỉ có 4 đã hoàn thành

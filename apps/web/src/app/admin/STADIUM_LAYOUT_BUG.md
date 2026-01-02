# 🏟️ STADIUM Layout Bug - Create Hall Fails

**Date**: January 3, 2026  
**Status**: 🔴 BLOCKING - Needs BE Fix  
**Priority**: HIGH  
**Component**: Admin > Halls > Create Hall with STADIUM Layout

---

## Problem Description

When user tries to **create a hall with Layout Type = "Sân Vận Động" (STADIUM)**, the operation **fails with database error**.

### Steps to Reproduce
1. Go to Admin > Phòng Chiếu (Halls)
2. Click "Thêm Phòng" (Add Hall)
3. Fill form:
   - Rạp: Select any cinema
   - Tên Phòng: Any name
   - Loại Bố Trí: Select "Sân Vận Động" (STADIUM) ✅ Can select
4. Click "Tạo" (Create)
5. **Result**: ❌ **FAILS** - Error returned from BE

---

## Root Cause

### The Issue
When BE processes create hall with `layoutType: STADIUM`:

1. `HallService.createHall()` called with `layoutType: STADIUM`
2. BE loads `StadiumLayoutTemplate` from `seat-template.ts`
3. Template contains 131 seats with this structure:
```typescript
{
  row_letter: 'A',      // ✅ Valid
  seat_number: 1,       // ✅ Valid
  type: 'STANDARD',     // ✅ Valid (SeatType enum)
  tier: 1               // ❌ INVALID - Not in Prisma schema!
}
```
4. Tries to create seats via Prisma
5. **Prisma rejects unknown field `tier`**
6. **DB Error thrown** ❌

### Why This Happens

**File**: `BE/movie-hub/apps/cinema-service/src/app/hall/seat-template.ts` (lines 72-90)

```typescript
const stadiumRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

stadiumRows.forEach((row, idx) => {
  const baseSeats = 10;
  const extra = Math.floor(idx / 2);
  const totalSeats = baseSeats + extra;

  for (let i = 1; i <= totalSeats; i++) {
    StadiumLayoutTemplate.seats.push({
      row_letter: row,
      seat_number: i,
      type: row === 'F' || row === 'G' || row === 'H' 
        ? SeatType.VIP 
        : SeatType.STANDARD,
      tier: idx + 1,  // ❌ THIS FIELD CAUSES ERROR - Not in Prisma!
    });
  }
});
```

**Problem**: `tier` field doesn't exist in Prisma Seats model

```prisma
model Seats {
  id           String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  hall_id      String             @db.Uuid
  row_letter   String             @db.VarChar(2)
  seat_number  Int
  type         SeatType           @default(STANDARD)
  status       SeatStatus         @default(ACTIVE)
  // ❌ NO TIER FIELD!
  created_at   DateTime           @default(now()) @db.Timestamp(6)
  // ... relations ...
}
```

---

## Why This Cannot Be Fixed in FE

- ❌ Template is defined in **BE code** (`seat-template.ts`)
- ❌ Field validation happens in **Prisma (BE)**
- ❌ FE cannot control what BE template generates
- ❌ FE cannot override Prisma schema validation
- ✅ **This MUST be fixed in BE**

---

## Required Solution (BE Team)

### Option A: REMOVE tier field ⭐ RECOMMENDED

**File to modify**: `BE/movie-hub/apps/cinema-service/src/app/hall/seat-template.ts`

**Change**:
```typescript
for (let i = 1; i <= totalSeats; i++) {
  StadiumLayoutTemplate.seats.push({
    row_letter: row,
    seat_number: i,
    type: row === 'F' || row === 'G' || row === 'H' 
      ? SeatType.VIP 
      : SeatType.STANDARD,
    // REMOVE: tier: idx + 1,
  });
}
```

**Advantages**:
- ✅ Quickest fix (5 seconds)
- ✅ No DB migration needed
- ✅ Stadium tiers still visible from row_letter (A→K = tier 1→11)
- ✅ Works immediately after deploy

---

### Option B: ADD tier to Prisma Schema

**File to modify**: `BE/movie-hub/apps/cinema-service/prisma/schema.prisma`

**Change**:
```prisma
model Seats {
  id           String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  hall_id      String             @db.Uuid
  row_letter   String             @db.VarChar(2)
  seat_number  Int
  type         SeatType           @default(STANDARD)
  status       SeatStatus         @default(ACTIVE)
  tier         Int?               // ADD THIS LINE for stadium layout
  created_at   DateTime           @default(now()) @db.Timestamp(6)
  // ... relations ...
}
```

**Then run migration**:
```bash
npx prisma migrate dev
```

**Advantages**:
- ✅ Allows explicit tier queries later
- ✅ Can use tier for seat pricing/display
- ❌ Requires DB migration (more complex)

---

## FE Status

✅ **FULLY READY** - Nothing needed in FE

- ✅ Form allows STADIUM selection
- ✅ All validation logic correct
- ✅ Layout type properly locked after creation (cannot change)
- ✅ All seat templates loaded correctly
- **⏳ Only waiting for BE fix**

---

## Testing After BE Fix

1. BE team applies one of the fixes above
2. Deploy BE changes
3. FE will work immediately - no changes needed
4. Test creating STADIUM hall:
   - Should create ✅
   - Should have 131 seats ✅
   - Seats should be rows A-K ✅
   - Rows F, G, H should be VIP type ✅

---

## Expected Result (After Fix)

**User creates hall with STADIUM layout**:
- ✅ Hall created successfully
- ✅ 131 seats auto-generated
- ✅ Correct row letters (A-K)
- ✅ Correct seat types (F,G,H = VIP; others = STANDARD)
- ✅ Layout locked (cannot be changed after creation)
- ✅ User can see hall in halls list

---

## Action Items

- [ ] **BE Team**: Choose Option A or B and apply fix
- [ ] **BE Team**: Run tests to verify STADIUM hall creation works
- [ ] **BE Team**: Deploy to staging/production
- [ ] **QA/User**: Test creating STADIUM halls
- [ ] **Close this issue** once confirmed working

---

# Issue #2: DUAL_AISLE Layout - Incorrect Capacity Value

**Date**: January 3, 2026  
**Status**: 🔴 NEEDS BE FIX  
**Priority**: MEDIUM  
**Component**: Admin > Seat Status > Hall Display

---

## Problem Description

When user selects a DUAL_AISLE layout hall in Admin > Seat Status, the capacity is **incorrect**:

- **Shown**: 96 ghế (in header and stats)
- **Actual**: 88 ghế (real seats rendered - columns 4 and 9 are missing as design)
- **Mismatch**: 96 ≠ 88

### User Impact
- Confusing to see "96 ghế" when only 88 seats visible in diagram
- Header says "96 ghế" but stats show "88 ghế"
- Seat diagram is correct (missing cols 4 & 9 intentional for aisles)

---

## Root Cause

**File**: `BE/movie-hub/apps/cinema-service/src/app/hall/seat-template.ts` (line 37)

```typescript
export const DualAisleLayoutTemplate = {
  capacity: 96,  // ❌ WRONG!
  rows: 8,
  seats: [
    // Generates seats...
  ],
};
```

**The Math**:
```
6 rows (A,B,E,F,G,H) × 11 seats per row = 66 seats
2 rows (C,D)         × 11 seats per row = 22 seats
---
TOTAL = 88 seats ✅

BUT capacity field says: 96 ❌
```

**Why 11 seats per row?**
- Template creates 13 columns: 0-12
- Skips index 3 and 8 (return null, then filter)
- Result: columns [0,1,2,4,5,6,7,9,10,11,12] = 11 seats
- This creates the "dual aisle" (walking space at columns 3 and 8)

---

## Required Fix (BE Team)

**File**: `BE/movie-hub/apps/cinema-service/src/app/hall/seat-template.ts`

**Line 37**: Change capacity value from 96 to 88

```typescript
export const DualAisleLayoutTemplate = {
  capacity: 88,  // ✅ CORRECT - matches actual seat count
  rows: 8,
  seats: [ /* ... */ ],
};
```

**Verification**:
- After fix, capacity will match actual seats: 88 = 88
- Header will show "88 ghế"
- Stats "Tổng Số Ghế" will show "88"
- All aligned ✅

---

## Why This Cannot Be Fixed in FE

- ❌ Capacity is stored in DB (set during hall creation)
- ❌ Template capacity affects initial DB data
- ❌ FE receives capacity from BE API response
- ❌ FE cannot override data from BE
- ✅ **Must be fixed in BE template**

---

## FE Status

✅ **FE is correct** - displaying what BE returns

- ✅ Stats calculation is correct: `hallDetail.seats.length` = 88 ✅
- ✅ Header displays: `hallDetail.capacity` = 96 (from BE, will be 88 after fix)
- ✅ Seat diagram is correct: 88 seats with columns 4 & 9 missing ✅

---

## Testing After BE Fix

1. BE team fixes capacity: 96 → 88
2. New halls created will have correct capacity
3. Old halls with capacity=96 need data migration or will still show 96
4. FE displays automatically correct after fix

---

## Action Items

- [ ] **BE Team**: Fix DualAisleLayoutTemplate capacity: 96 → 88
- [ ] **BE Team**: Verify StadiumLayoutTemplate capacity is also correct (currently 131 - seems right)
- [ ] **DB Migration**: Consider fixing existing DUAL_AISLE halls if they have capacity=96
- [ ] **Deploy**: Update to production
- [ ] **QA/User**: Verify DUAL_AISLE halls show 88 ghế in stats

---

# Issue #3: Delete Hall - Unexpected Error

**Date**: January 3, 2026  
**Status**: 🔴 NEEDS BE FIX  
**Priority**: HIGH  
**Component**: Admin > Halls > Delete Hall

---

## Problem Description

When user tries to **delete a hall**, the operation **fails with error**:

```json
{
  "success": false,
  "message": "Unexpected error occurred while deleting hall",
  "errors": [{
    "code": "INTERNAL_ERROR",
    "field": null,
    "message": "Unexpected error occurred while deleting hall"
  }],
  "timestamp": "2026-01-02T20:15:05.063Z"
}
```

### Steps to Reproduce
1. Go to Admin > Phòng Chiếu (Halls)
2. Click menu icon (three dots) on any hall
3. Select "Xóa" (Delete)
4. Confirm delete
5. **Result**: ❌ **FAILS** - "Unexpected error occurred while deleting hall"

---

## Root Cause

**Payload Format Mismatch** between API Gateway and Cinema Service

### API Gateway sends:
**File**: `BE/movie-hub/apps/api-gateway/src/app/module/cinema/service/hall.service.ts` (line 42)
```typescript
async deleteHall(hallId: string) {
  return this.cinemaClient.send(CinemaMessage.HALL.DELETE, { hallId });  // ❌ Sends OBJECT
}
```

### Cinema Service expects:
**File**: `BE/movie-hub/apps/cinema-service/src/app/hall/hall.controller.ts` (line 46)
```typescript
@MessagePattern(CinemaMessage.HALL.DELETE)
async deleteHall(@Payload() hallId: string) {  // ❌ Expects STRING, not object!
  return await this.hallService.deleteHall(hallId);
}
```

### What Happens:
1. FE sends: `DELETE /api/v1/halls/hall/{hallId}` ✅ Correct
2. API Gateway receives hallId correctly
3. **API Gateway sends**: `{ hallId: "uuid" }` (object with key) ❌ WRONG FORMAT
4. Cinema Controller receives object instead of string
5. `hallId` becomes an **object**, not a string
6. Cinema Service tries to delete with object as ID
7. **Prisma fails** (expects UUID string)
8. Generic exception caught → "Unexpected error occurred" ❌

---

## Required Fix (BE Team)

**Option A** (Fix API Gateway - Recommended):

File: `BE/movie-hub/apps/api-gateway/src/app/module/cinema/service/hall.service.ts` (line 42)

```typescript
async deleteHall(hallId: string) {
  return this.cinemaClient.send(CinemaMessage.HALL.DELETE, hallId);  // ✅ Send STRING directly
}
```

**Option B** (Fix Cinema Service):

File: `BE/movie-hub/apps/cinema-service/src/app/hall/hall.controller.ts` (line 46-49)

```typescript
@MessagePattern(CinemaMessage.HALL.DELETE)
async deleteHall(@Payload() payload: { hallId: string }) {  // ✅ Expect object
  return await this.hallService.deleteHall(payload.hallId);
}
```

---

## Why This Is A BE Issue (Not FE)

- ✅ FE sends correct HTTP request: `DELETE /api/v1/halls/hall/{hallId}`
- ✅ FE payload is correct (hallId in URL path)
- ❌ **API Gateway internal message format is WRONG** (sends object instead of string)
- ❌ Cinema Service controller expects wrong format
- ✅ **FE CANNOT workaround** this - it's purely BE message passing issue

**Why FE Cannot Workaround**:
- FE sends HTTP to API Gateway ✅ (correct)
- API Gateway internally sends message to Cinema Service ❌ (wrong format)
- FE has NO control over BE internal message passing
- Only BE can fix by correcting message format

---

## FE Status

✅ **FE is correct** - no changes needed

- ✅ Delete button sends correct REST API call
- ✅ No validation issues in FE
- ✅ Error handling works (toast shows error)

---

## Testing After BE Fix

1. BE team applies fix (Option A or B)
2. FE will work immediately - no changes needed
3. Test deleting a hall:
   - Should delete ✅
   - Hall removed from list ✅
   - No error message ✅

---

## Action Items

- [ ] **BE Team**: Fix API Gateway OR Cinema Service to match message format
- [ ] **BE Team**: Verify delete operation works
- [ ] **BE Team**: Check other delete/update operations have same issue
- [ ] **Deploy**: Update to production
- [ ] **QA/User**: Verify hall deletion works

---

# Issue #4: Update Showtime - Cinema Not Updated When Hall Changes

**Date**: January 3, 2026  
**Status**: 🔴 CRITICAL BUG - Causes Data Inconsistency  
**Priority**: CRITICAL  
**Component**: Admin > Showtimes > Edit Showtime

---

## Problem Description

When user **updates a showtime's hall** in the "Chỉnh sửa suất chiếu" (Edit Showtime) dialog, the **cinema_id is NOT updated** in the database. This causes **data inconsistency** and makes the hall field appear **blank** when reopening the edit dialog.

### Steps to Reproduce
1. Go to Admin > Suất Chiếu (Showtimes)
2. Click "Chỉnh sửa" (Edit) on any showtime
3. Change "Rạp Chiếu Phim" (Cinema) to a different cinema
4. Select a new "Phòng Chiếu" (Hall) from the new cinema
5. Click "Cập Nhật Suất Chiếu" (Update Showtime) ✅ Success message
6. **Reopen the same showtime for editing**
7. **Result**: ❌ **"Phòng Chiếu" field is BLANK** (see attached screenshot)

### What Actually Happens (Database Level)
```sql
-- Before Update:
cinema_id: "cinema-A-uuid"
hall_id: "hall-1-uuid" (belongs to cinema A)

-- User changes to hall-2 (belongs to cinema B) in FE
-- FE sends: { cinemaId: "cinema-B-uuid", hallId: "hall-2-uuid" }

-- After Update in DB:
cinema_id: "cinema-A-uuid"  -- ❌ NOT UPDATED! Still old cinema
hall_id: "hall-2-uuid"       -- ✅ Updated correctly

-- Result: Data inconsistency!
-- hall-2 belongs to cinema-B, but DB says cinema-A
```

### Why This Causes Blank Hall Field
1. When FE fetches showtime, it gets:
   - `cinemaId: "cinema-A-uuid"` (old, wrong)
   - `hallId: "hall-2-uuid"` (new, correct)
2. FE populates form with these values
3. Hall dropdown filters halls by `cinemaId === "cinema-A-uuid"`
4. But "hall-2" belongs to "cinema-B", so it's NOT in the filtered list
5. Select component has value "hall-2-uuid" but can't find it in options
6. **Result: Blank/empty dropdown display**

---

## Root Cause

**File**: `BE/movie-hub/apps/cinema-service/src/app/showtime/showtime-command.service.ts` (lines 279-288)

```typescript
const updatedShowtime = await this.prisma.showtimes.update({
  where: { id },
  data: {
    movie_id: dto.movieId ?? showtime.movie_id,
    hall_id: dto.hallId ?? showtime.hall_id,  // ✅ Updates hall
    start_time: start,
    end_time: end,
    format: dto.format ? (dto.format as Format) : showtime.format,
    language: dto.language ?? showtime.language,
    subtitles: dto.subtitles ?? showtime.subtitles,
    updated_at: new Date(),
    // ❌ MISSING: cinema_id is NEVER updated!
  },
});
```

**The Bug**:
- BE updates `hall_id` when user changes hall ✅
- BE **NEVER updates `cinema_id`** even though halls belong to cinemas ❌
- This creates **referential inconsistency**: hall points to cinema B, but cinema_id still says cinema A

**Why This Is Critical**:
- Violates data integrity (hall and cinema don't match)
- Makes edit dialog unusable after first hall change
- User cannot see which hall is selected
- Could cause booking/reservation issues (cinema mismatch)

---

## Required Fix (BE Team)

**File**: `BE/movie-hub/apps/cinema-service/src/app/showtime/showtime-command.service.ts`

### Option A: Update cinema_id When hallId Changes (Recommended)

```typescript
const updatedShowtime = await this.prisma.showtimes.update({
  where: { id },
  data: {
    movie_id: dto.movieId ?? showtime.movie_id,
    hall_id: dto.hallId ?? showtime.hall_id,
    cinema_id: dto.cinemaId ?? showtime.cinema_id,  // ✅ ADD THIS LINE
    start_time: start,
    end_time: end,
    format: dto.format ? (dto.format as Format) : showtime.format,
    language: dto.language ?? showtime.language,
    subtitles: dto.subtitles ?? showtime.subtitles,
    updated_at: new Date(),
  },
});
```

**Advantages**:
- ✅ Simple one-line fix
- ✅ Maintains data integrity
- ✅ FE already sends cinemaId in update payload
- ✅ No migration needed

---

### Option B: Derive cinema_id From hallId Automatically

```typescript
// When hallId changes, fetch the hall to get its cinemaId
let cinemaIdToUse = showtime.cinema_id;
if (dto.hallId && dto.hallId !== showtime.hall_id) {
  const hall = await this.prisma.halls.findUnique({
    where: { id: dto.hallId },
    select: { cinema_id: true },
  });
  if (!hall) {
    throw new NotFoundException('Hall not found');
  }
  cinemaIdToUse = hall.cinema_id;
}

const updatedShowtime = await this.prisma.showtimes.update({
  where: { id },
  data: {
    movie_id: dto.movieId ?? showtime.movie_id,
    hall_id: dto.hallId ?? showtime.hall_id,
    cinema_id: cinemaIdToUse,  // ✅ Auto-derived from hall
    start_time: start,
    end_time: end,
    format: dto.format ? (dto.format as Format) : showtime.format,
    language: dto.language ?? showtime.language,
    subtitles: dto.subtitles ?? showtime.subtitles,
    updated_at: new Date(),
  },
});
```

**Advantages**:
- ✅ Prevents user from sending mismatched cinema/hall
- ✅ Enforces referential integrity at BE level
- ❌ More complex (extra DB query)
- ❌ Requires testing

---

## Why This Cannot Be Fixed in FE

- ❌ FE **already sends correct cinemaId** to BE (verified in payload)
- ❌ BE receives cinemaId but **ignores it** in update query
- ❌ BE only updates `hall_id`, not `cinema_id`
- ❌ FE has NO control over what BE writes to database
- ✅ **Must be fixed in BE update logic**

---

## FE Status

✅ **FE is correct** - sending all required data

- ✅ Edit dialog sends both `cinemaId` and `hallId` in update payload
- ✅ User can select cinema and hall correctly
- ✅ Form validation works
- ✅ API call succeeds (200 OK)
- ❌ But BE doesn't persist `cinema_id` change

**FE sends this payload**:
```json
{
  "movieId": "...",
  "movieReleaseId": "...",
  "cinemaId": "new-cinema-uuid",  // ✅ FE sends this
  "hallId": "new-hall-uuid",       // ✅ FE sends this
  "startTime": "...",
  "format": "...",
  "language": "...",
  "subtitles": []
}
```

**BE only updates**:
```sql
UPDATE showtimes SET
  hall_id = 'new-hall-uuid',  -- ✅ Used
  cinema_id = ???              -- ❌ Not updated (keeps old value)
```

---

## Data Inconsistency Impact

### Current DB State After Bug
| Column | Value | Correct? |
|--------|-------|----------|
| `cinema_id` | `cinema-A-uuid` | ❌ Wrong (not updated) |
| `hall_id` | `hall-2-uuid` | ✅ Correct |
| Hall's Actual Cinema | `cinema-B-uuid` | ✅ (from halls table) |

**Result**: `cinema_id` != actual cinema of the hall

### Potential Issues
1. ❌ Edit dialog shows blank hall field
2. ❌ Reports/analytics show wrong cinema for showtime
3. ❌ Cinema-based queries return incorrect data
4. ❌ Booking flow might show wrong cinema name
5. ❌ Violates foreign key semantics (hall belongs to different cinema)

---

## Testing After BE Fix

### Test Case 1: Change Hall Within Same Cinema
1. Edit showtime with hall-1 (cinema A)
2. Change to hall-2 (also cinema A)
3. Save and reopen edit dialog
4. **Expected**: ✅ Hall-2 displayed correctly

### Test Case 2: Change Hall to Different Cinema
1. Edit showtime with hall-1 (cinema A)
2. Change cinema to B, then select hall-3 (cinema B)
3. Save and reopen edit dialog
4. **Expected**: 
   - ✅ Cinema B selected
   - ✅ Hall-3 displayed correctly
   - ✅ DB has matching cinema_id and hall_id

### Test Case 3: Verify DB Consistency
```sql
-- After update, run this query:
SELECT 
  s.id,
  s.cinema_id,
  s.hall_id,
  h.cinema_id as hall_cinema_id,
  s.cinema_id = h.cinema_id as is_consistent
FROM showtimes s
JOIN halls h ON s.hall_id = h.id
WHERE s.id = '<updated-showtime-id>';

-- Expected: is_consistent = true
```

---

## Recommended Fix Priority

**Priority**: 🔴 **CRITICAL**

**Reasoning**:
- Data integrity violation
- Makes admin panel unusable after first edit
- Could affect production bookings/reservations
- Simple one-line fix (Option A)

**Recommended Solution**: **Option A** (add `cinema_id: dto.cinemaId ?? showtime.cinema_id`)
- Fastest to implement
- Leverages existing FE payload
- No migration needed
- Maintains backward compatibility

---

## Action Items

- [ ] **BE Team**: Apply Option A fix (add cinema_id update line)
- [ ] **BE Team**: Run Test Cases 1-3 to verify fix
- [ ] **BE Team**: Check if other microservices have similar issues
- [ ] **DB Team**: Consider data cleanup script for existing inconsistent records
- [ ] **Deploy**: Update to staging → production
- [ ] **QA/User**: Verify hall changes persist correctly
- [ ] **Monitor**: Check for any cinema/hall mismatch errors in logs

---

# Issue #5: Update Showtime - Movie Release Not Updated When Movie Changes

**Date**: January 3, 2026  
**Status**: 🔴 CRITICAL BUG - Causes Data Loss  
**Priority**: CRITICAL  
**Component**: Admin > Showtimes > Edit Showtime

---

## Problem Description

When user **updates a showtime's movie** in the "Chỉnh sửa suất chiếu" (Edit Showtime) dialog, the **movie_release_id is NOT updated** in the database. This causes the movie release field to appear **blank** when reopening the edit dialog.

### Steps to Reproduce
1. Go to Admin > Suất Chiếu (Showtimes)
2. Click "Chỉnh sửa" (Edit) on any showtime
3. Change "Phim" (Movie) to a different movie
4. Select "ID Phát hành phim" (Movie Release) for the new movie
5. Click "Cập Nhật Suất Chiếu" (Update Showtime) ✅ Success message
6. **Reopen the same showtime for editing**
7. **Result**: ❌ **"ID Phát hành phim" field is BLANK**

### What Actually Happens (Database Level)
```sql
-- Before Update:
movie_id: "movie-A-uuid"
movie_release_id: "release-1-uuid" (belongs to movie A)

-- User changes to movie-B and selects release-2 in FE
-- FE sends: { movieId: "movie-B-uuid", movieReleaseId: "release-2-uuid" }

-- After Update in DB:
movie_id: "movie-B-uuid"           -- ✅ Updated correctly
movie_release_id: "release-1-uuid" -- ❌ NOT UPDATED! Still old release

-- Result: Data inconsistency!
-- release-1 belongs to movie-A, but current movie_id is movie-B
```

### Why This Causes Blank Release Field
1. When FE fetches showtime, it gets:
   - `movieId: "movie-B-uuid"` (new, correct)
   - `movieReleaseId: "release-1-uuid"` (old, wrong - doesn't belong to movie-B)
2. FE fetches releases for `movieId = "movie-B-uuid"`
3. Release list does NOT contain "release-1-uuid" (it belongs to movie-A)
4. Select component has value "release-1-uuid" but can't find it in options
5. **Result: Blank/empty dropdown display**

---

## Root Cause

**File**: `BE/movie-hub/apps/cinema-service/src/app/showtime/showtime-command.service.ts` (lines 280-288)

```typescript
const updatedShowtime = await this.prisma.showtimes.update({
  where: { id },
  data: {
    movie_id: dto.movieId ?? showtime.movie_id,  // ✅ Updates movie
    hall_id: dto.hallId ?? showtime.hall_id,
    start_time: start,
    end_time: end,
    format: dto.format ? (dto.format as Format) : showtime.format,
    language: dto.language ?? showtime.language,
    subtitles: dto.subtitles ?? showtime.subtitles,
    updated_at: new Date(),
    // ❌ MISSING: movie_release_id is NEVER updated!
  },
});
```

**The Bug**:
- BE updates `movie_id` when user changes movie ✅
- BE **NEVER updates `movie_release_id`** even though releases belong to movies ❌
- This creates **referential inconsistency**: release points to movie A, but movie_id now says movie B

**Why This Is Critical**:
- Violates data integrity (release and movie don't match)
- Makes edit dialog unusable after first movie change
- User cannot see which release is selected
- Could affect seat calculations (movie runtime affects showtime duration)

---

## Required Fix (BE Team)

**File**: `BE/movie-hub/apps/cinema-service/src/app/showtime/showtime-command.service.ts` (lines 280-288)

### Option A: Update movie_release_id When movieId Changes (Recommended)

```typescript
const updatedShowtime = await this.prisma.showtimes.update({
  where: { id },
  data: {
    movie_id: dto.movieId ?? showtime.movie_id,
    movie_release_id: dto.movieReleaseId ?? showtime.movie_release_id,  // ✅ ADD THIS LINE
    hall_id: dto.hallId ?? showtime.hall_id,
    cinema_id: dto.cinemaId ?? showtime.cinema_id,
    start_time: start,
    end_time: end,
    format: dto.format ? (dto.format as Format) : showtime.format,
    language: dto.language ?? showtime.language,
    subtitles: dto.subtitles ?? showtime.subtitles,
    updated_at: new Date(),
  },
});
```

**Advantages**:
- ✅ Simple one-line fix
- ✅ Maintains data integrity
- ✅ FE already sends movieReleaseId in update payload
- ✅ No migration needed

---

### Option B: Validate movie_release_id Belongs to movieId

```typescript
// When movieId changes, validate that movieReleaseId (if provided) belongs to new movie
if (dto.movieId && dto.movieReleaseId) {
  const release = await this.prisma.movieReleases.findUnique({
    where: { id: dto.movieReleaseId },
  });
  if (!release || release.movie_id !== dto.movieId) {
    throw new RpcException({
      summary: 'Movie Release does not belong to selected Movie',
      statusCode: 400,
      code: 'INVALID_MOVIE_RELEASE',
      message: 'Selected movie release does not match the selected movie',
    });
  }
}

const updatedShowtime = await this.prisma.showtimes.update({
  where: { id },
  data: {
    movie_id: dto.movieId ?? showtime.movie_id,
    movie_release_id: dto.movieReleaseId ?? showtime.movie_release_id,
    hall_id: dto.hallId ?? showtime.hall_id,
    cinema_id: dto.cinemaId ?? showtime.cinema_id,
    start_time: start,
    end_time: end,
    format: dto.format ? (dto.format as Format) : showtime.format,
    language: dto.language ?? showtime.language,
    subtitles: dto.subtitles ?? showtime.subtitles,
    updated_at: new Date(),
  },
});
```

**Advantages**:
- ✅ Prevents invalid movie/release combinations
- ✅ Enforces referential integrity at BE level
- ❌ More complex (extra DB query)
- ❌ Requires testing

---

## Why This Cannot Be Fixed in FE

- ❌ FE **already sends correct movieReleaseId** to BE (verified in payload)
- ❌ BE receives movieReleaseId but **ignores it** in update query
- ❌ BE only updates `movie_id`, not `movie_release_id`
- ❌ FE has NO control over what BE writes to database
- ✅ **Must be fixed in BE update logic**

---

## FE Status

✅ **FE is correct** - sending all required data

- ✅ Edit dialog sends both `movieId` and `movieReleaseId` in update payload
- ✅ User can select movie and release correctly
- ✅ Form validation works
- ✅ API call succeeds (200 OK)
- ❌ But BE doesn't persist `movie_release_id` change

**FE sends this payload**:
```json
{
  "movieId": "new-movie-uuid",        // ✅ FE sends this
  "movieReleaseId": "new-release-uuid", // ✅ FE sends this
  "cinemaId": "...",
  "hallId": "...",
  "startTime": "...",
  "format": "...",
  "language": "...",
  "subtitles": []
}
```

**BE only updates**:
```sql
UPDATE showtimes SET
  movie_id = 'new-movie-uuid',  -- ✅ Used
  movie_release_id = ???         -- ❌ Not updated (keeps old value)
```

---

## Data Inconsistency Impact

### Current DB State After Bug
| Column | Value | Correct? |
|--------|-------|----------|
| `movie_id` | `movie-B-uuid` | ✅ Correct |
| `movie_release_id` | `release-1-uuid` | ❌ Wrong (not updated) |
| Release's Actual Movie | `movie-A-uuid` | ✅ (from movieReleases table) |

**Result**: `movie_release_id` belongs to different movie than `movie_id`

### Potential Issues
1. ❌ Edit dialog shows blank release field
2. ❌ Seat calculations use old movie's runtime (affects showtime duration)
3. ❌ Reports/analytics show wrong release for showtime
4. ❌ Release-based queries return incorrect data
5. ❌ Violates foreign key semantics (release belongs to different movie)

---

## Testing After BE Fix

### Test Case 1: Change Movie Within Same Release Group
1. Edit showtime with movie-A, release-1
2. Change to movie-B, release-2
3. Save and reopen edit dialog
4. **Expected**: ✅ Both movieId and movieReleaseId displayed correctly

### Test Case 2: Verify Runtime Updates End Time
1. Edit showtime with 120-min movie, start 19:00
2. Change to 100-min movie
3. Save and reopen
4. **Expected**: ✅ End time adjusted (19:00 + 100min, not 120min)

### Test Case 3: Verify DB Consistency
```sql
-- After update, run this query:
SELECT 
  s.id,
  s.movie_id,
  s.movie_release_id,
  mr.movie_id as release_movie_id,
  s.movie_id = mr.movie_id as is_consistent
FROM showtimes s
JOIN movieReleases mr ON s.movie_release_id = mr.id
WHERE s.id = '<updated-showtime-id>';

-- Expected: is_consistent = true
```

---

## Relationship With Issue #4 (Cinema Not Updated)

**Issue #4**: `cinema_id` not updated when `hallId` changes  
**Issue #5**: `movie_release_id` not updated when `movieId` changes

**Pattern**: BE is missing updates for multiple foreign key fields when parent entities change:
```typescript
// Current BE update (WRONG - missing 2 fields):
data: {
  movie_id: dto.movieId ?? showtime.movie_id,
  hall_id: dto.hallId ?? showtime.hall_id,
  // ❌ cinema_id not included
  // ❌ movie_release_id not included
}

// Correct update should include:
data: {
  movie_id: dto.movieId ?? showtime.movie_id,
  movie_release_id: dto.movieReleaseId ?? showtime.movie_release_id,  // ✅ ADD
  cinema_id: dto.cinemaId ?? showtime.cinema_id,                      // ✅ ADD (Issue #4)
  hall_id: dto.hallId ?? showtime.hall_id,
  // ... rest of fields
}
```

**Recommended Fix Priority**: Fix both issues simultaneously to avoid future regressions.

---

## Recommended Fix Priority

**Priority**: 🔴 **CRITICAL**

**Reasoning**:
- Data integrity violation
- Makes admin panel unusable after first edit
- Could affect seat calculation and booking flow
- Simple one-line fix (Option A)
- Part of pattern: both cinema_id and movie_release_id missing

**Recommended Solution**: **Option A** (add `movie_release_id: dto.movieReleaseId ?? showtime.movie_release_id`)
- Fastest to implement
- Leverages existing FE payload
- No migration needed
- Maintains backward compatibility
- Should be applied together with Issue #4 fix

---

## FE Workaround (Applied)

Since BE has this bug, FE now includes automatic correction:

When FE detects that a movieReleaseId doesn't exist in the fetched releases for the current movieId:
1. Console logs a warning with BE bug reference
2. Shows a toast message to user: "Đã phát hiện lỗi dữ liệu từ backend"
3. Attempts to auto-correct if possible

This keeps the form usable while BE is being fixed.

---

## Action Items

- [ ] **BE Team**: Apply Option A fix to showtime-command.service.ts (add movie_release_id line)
- [ ] **BE Team**: Also apply Issue #4 fix simultaneously (add cinema_id line)
- [ ] **BE Team**: Run Test Cases 1-3 to verify both fixes
- [ ] **BE Team**: Check UpdateShowtimeRequest DTO includes movieReleaseId field
- [ ] **DB Team**: Consider data cleanup script for existing inconsistent records
- [ ] **Deploy**: Update to staging → production
- [ ] **QA/User**: Verify movie/release changes persist correctly
- [ ] **Monitor**: Check for any movie/release mismatch errors in logs

---

# Issue #6: Concession Filter - "All Cinemas" Items Not Showing When Filtering by Cinema

**Date**: January 3, 2026  
**Status**: 🔴 CRITICAL BUG - Data Not Displayed  
**Priority**: HIGH  
**Component**: Admin > Concessions (Đồ Ăn)

---

## Problem Description

When user **adds a concession with "Tất cả rạp" (All Cinemas)** and then **filters by a specific cinema**, the concession **does NOT appear** in the filtered list.

### Steps to Reproduce
1. Go to Admin > Đồ Ăn (Concessions)
2. Click "Thêm" (Add) to create new concession
3. Fill details and set **Rạp = "Tất cả rạp" (All Cinemas)**
4. Click "Tạo" (Create) → Success ✅
5. **Filter by a specific cinema**
6. **Result**: ❌ Concession not visible in that cinema's list

### Expected Behavior
- If a concession is available in "Tất cả rạp", it should appear when filtering **any specific cinema**
- Concession with `cinema_id = NULL` should be combined with cinema-specific concessions when filtering

### What Actually Happens
- BE query filters: `where: { cinema_id: 'specific-cinema-uuid' }`
- This **excludes all concessions with `cinema_id = NULL`**
- "All Cinemas" concessions disappear ❌

---

## Root Cause

**File**: `BE/movie-hub/apps/booking-service/src/app/concession/concession.service.ts` (lines 20-22)

```typescript
async findAll(
  cinemaId?: string,
  category?: ConcessionCategory,
  available = true
): Promise<ServiceResult<ConcessionDto[]>> {
  const where: any = {};
  const normalizedCinemaId = this.optionalUuid(cinemaId, 'cinemaId');
  
  if (normalizedCinemaId) {
    where.cinema_id = normalizedCinemaId;  // ❌ BUG: Excludes cinema_id = NULL
  }
  
  // ... rest of query
}
```

**The Bug**:
- When `cinemaId` filter is applied, query sets `where.cinema_id = 'specific-uuid'`
- This **only** returns concessions with that exact cinema_id
- **Excludes** concessions with `cinema_id = NULL` (representing "all cinemas")
- User cannot see "all cinema" items when filtering by specific cinema

**Why This Is Critical**:
- Makes "All Cinemas" option useless for cinema-specific views
- Incomplete data display
- User confusion (item was created but can't find it)

---

## Required Fix (BE Team)

**File**: `BE/movie-hub/apps/booking-service/src/app/concession/concession.service.ts`

### Option A: Use OR Logic for Cinema Filter (Recommended)

```typescript
async findAll(
  cinemaId?: string,
  category?: ConcessionCategory,
  available = true
): Promise<ServiceResult<ConcessionDto[]>> {
  const where: any = {};
  const normalizedCinemaId = this.optionalUuid(cinemaId, 'cinemaId');
  
  // When filtering by cinema, include both specific cinema AND all-cinemas items
  if (normalizedCinemaId) {
    where.OR = [
      { cinema_id: normalizedCinemaId },  // ✅ Specific cinema
      { cinema_id: null }                  // ✅ All cinemas
    ];
  }
  
  if (category) {
    where.category = category;
  }
  
  if (available !== undefined) {
    where.available = available;
  }

  const concessions = await this.prisma.concessions.findMany({
    where,
    orderBy: { name: 'asc' },
  });

  return {
    data: concessions.map((c) => this.mapToDto(c)),
  };
}
```

**Advantages**:
- ✅ Simple one-line logic change (OR instead of direct assignment)
- ✅ Maintains correct filtering behavior
- ✅ "All Cinemas" items now visible in every cinema filter
- ✅ No migration needed

---

### Option B: Separate Query Merge

```typescript
async findAll(
  cinemaId?: string,
  category?: ConcessionCategory,
  available = true
): Promise<ServiceResult<ConcessionDto[]>> {
  const where: any = {};
  const normalizedCinemaId = this.optionalUuid(cinemaId, 'cinemaId');
  
  let concessions: any[] = [];
  
  // Query 1: All-cinema items (always included)
  const allCinemasWhere: any = { cinema_id: null };
  if (category) {
    allCinemasWhere.category = category;
  }
  if (available !== undefined) {
    allCinemasWhere.available = available;
  }
  const allCinemasItems = await this.prisma.concessions.findMany({
    where: allCinemasWhere,
  });
  
  // Query 2: Cinema-specific items (if cinema filter applied)
  if (normalizedCinemaId) {
    const cinemaSpecificWhere: any = { cinema_id: normalizedCinemaId };
    if (category) {
      cinemaSpecificWhere.category = category;
    }
    if (available !== undefined) {
      cinemaSpecificWhere.available = available;
    }
    const cinemaSpecificItems = await this.prisma.concessions.findMany({
      where: cinemaSpecificWhere,
    });
    concessions = [...allCinemasItems, ...cinemaSpecificItems];
  } else {
    // No cinema filter: return only cinema-specific items
    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (available !== undefined) {
      where.available = available;
    }
    concessions = await this.prisma.concessions.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  return {
    data: concessions.map((c) => this.mapToDto(c)).sort((a, b) => a.name.localeCompare(b.name)),
  };
}
```

**Advantages**:
- ✅ Explicit logic, easy to understand
- ✅ More control over behavior
- ❌ More complex (two queries)
- ❌ Less efficient

---

## Why This Cannot Be Fixed in FE

- ❌ FE sends correct filter request to BE
- ❌ FE receives what BE returns (incomplete data)
- ❌ FE cannot override what BE queries from database
- ❌ FE has no way to know if items with NULL cinema_id exist
- ✅ **Must be fixed in BE query logic**

---

## FE Status

✅ **FE is correct** - sending proper filter requests

- ✅ Filter dropdown works correctly
- ✅ API call sends `cinemaId` properly
- ✅ Data display logic is correct
- ❌ But BE returns incomplete results

**FE sends**:
```
GET /api/v1/concessions?cinemaId=specific-uuid
```

**BE should return**:
- Concessions with `cinema_id = 'specific-uuid'` ✅ (currently returns these)
- **+ Concessions with `cinema_id = NULL`** ❌ (currently missing these)

---

## Data Model Impact

### Database State
| concession_id | name | cinema_id | Status |
|---|---|---|---|
| uuid-1 | Popcorn | null | "All Cinemas" ✅ |
| uuid-2 | Coke | cinema-A | "Cinema A only" |
| uuid-3 | Candy | cinema-B | "Cinema B only" |

### Current Query Result (WRONG)
```sql
SELECT * FROM concessions WHERE cinema_id = 'cinema-A';
-- Returns: [uuid-2] 
-- Missing: [uuid-1] ❌
```

### Expected Query Result (CORRECT)
```sql
SELECT * FROM concessions 
WHERE cinema_id = 'cinema-A' OR cinema_id IS NULL
ORDER BY name;
-- Returns: [uuid-1, uuid-2] ✅
```

---

## Testing After BE Fix

### Test Case 1: Filter by Cinema Shows All-Cinemas Items
1. Create concession: "Popcorn" with cinema = "All Cinemas"
2. Create concession: "Coke" with cinema = "Cinema A"
3. Filter by "Cinema A"
4. **Expected**: Both "Popcorn" and "Coke" appear ✅

### Test Case 2: No Cinema Filter Shows Only Cinema-Specific
1. (Same data as Test Case 1)
2. Filter by "All Cinemas"
3. **Expected**: All concessions appear ✅

### Test Case 3: Cinema-Specific Items Still Work
1. Create "Candy" with cinema = "Cinema B"
2. Filter by "Cinema B"
3. **Expected**: See "Candy" + "Popcorn" (if exists) ✅

---

## Recommended Fix Priority

**Priority**: 🔴 **HIGH**

**Reasoning**:
- Core functionality broken (filtering shows incomplete data)
- User cannot see items they created
- Simple fix (Option A: 2-line change)
- Affects user experience directly

**Recommended Solution**: **Option A** (OR logic)
- Fastest to implement
- Most efficient (single query)
- Clear logic
- No breaking changes

---

## Action Items

- [ ] **BE Team**: Apply Option A fix to concession.service.ts findAll() method
- [ ] **BE Team**: Ensure Prisma OR syntax handles NULL correctly
- [ ] **BE Team**: Test with both cinema-specific and all-cinemas concessions
- [ ] **Deploy**: Update to staging → production
- [ ] **QA/User**: Verify:
  - Create concession with "All Cinemas"
  - Filter by specific cinema
  - Verify "All Cinemas" item appears ✅
  - Verify cinema-specific items still appear ✅
  - No duplicate items shown
- [ ] **Monitor**: Check concession filter queries in logs

---

# Issue #8: Update Concession - Cinema Not Updated When Changed from "Tất cả rạp"

**Date**: January 3, 2026  
**Status**: 🔴 CRITICAL BUG - Update Ignored  
**Priority**: CRITICAL  
**Component**: Admin > Concessions (Đồ Ăn) > Edit

---

## Problem Description

When user **updates a concession's cinema from a specific cinema to "Tất cả rạp" (All Cinemas)**, the update appears to succeed but the concession **still belongs to the original cinema** and **does NOT appear** in the "All Cinemas" filter view.

### Steps to Reproduce
1. Go to Admin > Đồ Ăn (Concessions)
2. Create a concession with **Rạp = "Cinema A"**
3. Click "Chỉnh Sửa" (Edit) on the concession
4. Change **Rạp = "Cinema A"** to **"Tất cả rạp" (All Cinemas)**
5. Click "Cập Nhật" (Update) → Success message ✅
6. **Filter by "Tất cả rạp"**
7. **Result**: ❌ Concession NOT visible
8. **Filter by "Cinema A"**
9. **Result**: ✅ Concession still visible (should NOT be here after update)

### Expected Behavior
- When updating to "Tất cả rạp", the concession's `cinema_id` should be set to **NULL**
- Concession should appear in "All Cinemas" filter view
- Concession should no longer appear in "Cinema A" filter view
- DB should reflect: `cinema_id = NULL`

### What Actually Happens
- FE sends: `cinemaId: undefined` (after converting empty string)
- BE receives: `cinemaId: undefined`
- BE query checks: `if (normalizedCinemaId !== undefined && { cinema_id: normalizedCinemaId })`
- Since `normalizedCinemaId === undefined`, **no update is applied**
- `cinema_id` remains as the **original cinema UUID**
- **Update silently fails - no error message to user**

---

## Root Cause

**File**: `BE/movie-hub/apps/booking-service/src/app/concession/concession.service.ts` (lines 102-150)

```typescript
async update(id: string, dto: UpdateConcessionDto): Promise<ServiceResult<ConcessionDto>> {
  const concessionId = this.requireUuid(id, 'id');
  const normalizedCinemaId = this.optionalUuid(dto.cinemaId, 'cinemaId');
  // Line 104: ^^^^^^^^^^^^^^^^^^^^^^^^^
  // When dto.cinemaId = undefined, normalizedCinemaId = undefined

  // ... validation code ...

  const concession = await this.prisma.concessions.update({
    where: { id: concessionId },
    data: {
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.nameEn !== undefined && { name_en: dto.nameEn }),
      // ... other fields ...
      ...(normalizedCinemaId !== undefined && { cinema_id: normalizedCinemaId }),
      // Line 142: ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // ❌ BUG: When normalizedCinemaId is undefined, this spreads NOTHING
      // So cinema_id is never updated to NULL
      // ... other fields ...
    },
  });
  // Result: cinema_id keeps its old value ❌
}
```

**The Bug**:
1. User selects "Tất cả rạp" in FE form
2. FE converts 'all' string to empty string `''` in formData
3. In handleSubmit, cinemaId becomes `undefined`
4. FE sends to BE: `cinemaId: undefined`
5. BE's `optionalUuid(undefined, ...)` returns `undefined`
6. Update condition: `...(normalizedCinemaId !== undefined && { cinema_id: normalizedCinemaId })`
7. Since `normalizedCinemaId === undefined`, nothing is added to update data
8. **Prisma skips the `cinema_id` field entirely**
9. `cinema_id` keeps its **old value** ❌

**Why This Is Critical**:
- BE cannot distinguish between "don't update" and "update to NULL"
- FE has no way to send "set to NULL" (can only send undefined)
- Data integrity is violated (concession assignment not updated)
- Update appears successful but is actually ignored
- User cannot change concession assignment

---

## Why This Is A BE Design Issue

The BE's conditional update pattern:
```typescript
...(normalizedCinemaId !== undefined && { cinema_id: normalizedCinemaId })
```

This pattern assumes:
- `undefined` = "don't update this field"
- A UUID string = "update to this UUID"
- ❌ **No way to update to NULL**

But for optional fields like `cinema_id`, we need to support:
- `undefined` = "don't update"
- A UUID string = "update to this UUID"
- ✅ `null` explicitly = "update to NULL"

The BE needs a different approach to handle NULL updates.

---

## Required Fix (BE Team)

**File**: `BE/movie-hub/apps/booking-service/src/app/concession/concession.service.ts`

### Option A: Use Explicit Field Flag (Recommended)

Modify the DTO to use an explicit flag or use a different approach:

```typescript
async update(id: string, dto: UpdateConcessionDto): Promise<ServiceResult<ConcessionDto>> {
  const concessionId = this.requireUuid(id, 'id');
  
  // For optional UUID fields, need to handle three cases:
  // 1. undefined = don't update
  // 2. null = update to NULL
  // 3. valid UUID = update to this UUID
  
  let cinemaIdValue = undefined;
  let shouldUpdateCinemaId = false;
  
  if ('cinemaId' in dto) {  // Field was explicitly provided
    shouldUpdateCinemaId = true;
    if (dto.cinemaId !== null && dto.cinemaId !== undefined) {
      cinemaIdValue = this.optionalUuid(dto.cinemaId, 'cinemaId');
    } else {
      cinemaIdValue = null;  // Explicitly NULL
    }
  }

  // ... validation code ...

  const concession = await this.prisma.concessions.update({
    where: { id: concessionId },
    data: {
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.nameEn !== undefined && { name_en: dto.nameEn }),
      // ... other fields ...
      ...(shouldUpdateCinemaId && { cinema_id: cinemaIdValue }),  // ✅ Now handles NULL
      // ... other fields ...
    },
  });

  return {
    data: this.mapToDto(concession),
    message: 'Concession updated successfully',
  };
}
```

**Advantages**:
- ✅ Explicitly checks if field was provided
- ✅ Distinguishes between "don't update" and "update to NULL"
- ✅ Works with current FE approach
- ✅ Handles all three cases properly

---

### Option B: Use Zod Validation with Optional Nulls

Change the UpdateConcessionDto DTO to allow explicit null:

```typescript
export interface UpdateConcessionDto {
  name?: string;
  nameEn?: string;
  description?: string | null;
  category?: ConcessionCategory;
  price?: number;
  imageUrl?: string | null;
  available?: boolean;
  inventory?: number;
  cinemaId?: string | null;  // ✅ Changed: now accepts null
  nutritionInfo?: Record<string, any> | null;
  allergens?: string[];
}
```

Then in BE:
```typescript
const concession = await this.prisma.concessions.update({
  where: { id: concessionId },
  data: {
    ...(dto.name !== undefined && { name: dto.name }),
    ...(dto.nameEn !== undefined && { name_en: dto.nameEn }),
    // ... other fields ...
    ...(dto.cinemaId !== undefined && { cinema_id: dto.cinemaId ?? null }),  // ✅ Coalesce to NULL
    // ... other fields ...
  },
});
```

**Advantages**:
- ✅ Cleaner code
- ✅ Type-safe NULL handling
- ✅ More semantic (cinemaId can be null)
- ❌ Requires DTO update (touches both FE and BE shared types)

---

## Why This Cannot Be Fixed in FE

- ❌ FE can only send `undefined` or a string value
- ❌ JavaScript doesn't have a way to distinguish "omitted" from "explicitly undefined"
- ❌ FE cannot control whether BE treats undefined as "don't update" or "update to NULL"
- ❌ FE cannot modify BE's update logic
- ✅ **Must be fixed in BE update logic**

---

## FE Status

✅ **FE is correct** - sending the right data

- ✅ Form correctly converts 'all' to empty string
- ✅ handleSubmit correctly converts empty string to undefined
- ✅ API call sends correct payload: `cinemaId: undefined`
- ✅ No validation errors (BE accepts undefined)
- ❌ But BE ignores the undefined value instead of treating it as "set to NULL"

**FE sends this payload**:
```json
{
  "name": "Popcorn",
  "category": "FOOD",
  "price": 25000,
  "cinemaId": undefined,  // ✅ FE sends this
  "available": true,
  // ... other fields ...
}
```

**BE receives but ignores**:
- `cinemaId: undefined` is in the object
- But update condition skips it: `...(undefined !== undefined && ...)`
- So `cinema_id` in DB is never updated ❌

---

## Data Inconsistency Impact

### Current State After Update Bug
| Before | After (with bug) | Expected |
|--------|------------------|----------|
| `cinema_id: 'cinema-A-uuid'` | `cinema_id: 'cinema-A-uuid'` | `cinema_id: NULL` |
| Appears in "Cinema A" filter | Still in "Cinema A" | NOT in "Cinema A" |
| NOT in "All Cinemas" filter | Still NOT in "All Cinemas" | Should be in "All Cinemas" |

### Potential Issues
1. ❌ Concession still restricted to original cinema
2. ❌ User cannot change concession assignment
3. ❌ "All Cinemas" option doesn't work for updates
4. ❌ Update appears successful but is silent failure
5. ❌ Data integrity violation

---

## Testing After BE Fix

### Test Case 1: Update Specific Cinema to All Cinemas
1. Create concession with cinema = "Cinema A"
2. Edit and change to cinema = "Tất cả rạp"
3. Update → Success ✅
4. Filter by "All Cinemas"
5. **Expected**: Concession appears ✅
6. Filter by "Cinema A"
7. **Expected**: Concession does NOT appear ✅
8. DB check: `SELECT cinema_id FROM concessions WHERE id='...';`
9. **Expected**: `cinema_id = NULL` ✅

### Test Case 2: Update All Cinemas to Specific Cinema
1. Create concession with cinema = "All Cinemas" (cinema_id = NULL)
2. Edit and change to cinema = "Cinema B"
3. Update → Success ✅
4. Filter by "Cinema B"
5. **Expected**: Concession appears ✅
6. Filter by "All Cinemas"
7. **Expected**: Concession does NOT appear ✅
8. DB check:
9. **Expected**: `cinema_id = 'cinema-B-uuid'` ✅

### Test Case 3: Update Specific Cinema to Different Specific Cinema
1. Create concession with cinema = "Cinema A"
2. Edit and change to cinema = "Cinema C"
3. Update → Success ✅
4. Filter by "Cinema C"
5. **Expected**: Concession appears ✅
6. Filter by "Cinema A"
7. **Expected**: Concession does NOT appear ✅

---

## Relationship to Other Issues

| Issue | Component | Root Cause | Fix |
|-------|-----------|-----------|-----|
| #4 | Showtime | `cinema_id` not updated when hall changes | Add field to update |
| #5 | Showtime | `movie_release_id` not updated when movie changes | Add field to update |
| #8 | Concession | `cinema_id` not updated to NULL when needed | Handle NULL case |

**Pattern**: Multiple issues with optional field updates. Issues #4 & #5 are missing fields in update data. Issue #8 is BE ignoring NULL updates.

---

## Recommended Fix Priority

**Priority**: 🔴 **CRITICAL**

**Reasoning**:
- Core feature broken (cannot change concession assignment)
- Silent failure (appears successful but doesn't update)
- Data integrity violation
- Affects all concession updates to/from "All Cinemas"

**Recommended Solution**: **Option A** (explicit field flag)
- Works with current FE approach
- No FE changes needed
- Handles NULL properly
- More defensive (explicitly checks if field provided)

---

## Action Items

- [ ] **BE Team**: Apply Option A fix to concession.service.ts update() method
- [ ] **BE Team**: Verify fix handles all three cases: undefined, null, UUID string
- [ ] **BE Team**: Run Test Cases 1-3 to verify fix
- [ ] **BE Team**: Check if same issue exists in create() method (might also need fix)
- [ ] **DB Team**: Consider data cleanup script for concessions with wrong cinema_id
- [ ] **Deploy**: Update to staging → production
- [ ] **QA/User**: Verify:
  - Update concession from specific cinema to "All Cinemas"
  - Verify appears in "All Cinemas" filter ✅
  - Verify removed from original cinema filter ✅
  - Update concession from "All Cinemas" to specific cinema
  - Verify appears in that cinema's filter ✅
  - Verify removed from "All Cinemas" filter ✅
- [ ] **Monitor**: Check concession update queries in logs





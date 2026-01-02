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





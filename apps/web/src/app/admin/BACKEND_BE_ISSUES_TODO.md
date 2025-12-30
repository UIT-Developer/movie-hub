# Issue: Showtime Date Filter Off-by-One — Showtimes Not Appearing (urgent)

**Status**: 🔴 BLOCKING for Admin FE showtimes filter

**Problem (tóm tắt):**
- Admin creates showtime with `startTime = "2025-12-31 14:00:00"` (Dec 31, 2025)
- But when filtering by `date: "2025-12-31"` in the showtimes list, the showtime doesn't appear
- Showtime only appears when filtering by `date: "2026-01-01"` (next day)
- **Root cause**: Timezone mismatch between how `startTime` is stored and how the date filter is applied

## Affected Endpoints:
- `GET /api/v1/showtimes` with `date` query parameter (admin filter)

## Affected Files (BE):

### File 1: `apps/cinema-service/src/app/showtime/showtime.service.ts` (line 41-49)

**Current Problematic Code**:
```typescript
async getShowtimes(filter: AdminShowtimeFilterDTO) {
  const { cinemaId, date, movieId, hallId } = filter;
  const where: Prisma.ShowtimesWhereInput = {};
  
  if (date) {
    where.start_time = {
      gte: new Date(`${date}T00:00:00.000Z`),     // e.g., "2025-12-31T00:00:00.000Z"
      lt: new Date(`${date}T23:59:59.999Z`),      // e.g., "2025-12-31T23:59:59.999Z"
    };
  }
  // ...
}
```

**Problem Explanation:**

1. **Creating showtime** (cinema-service/showtime-command.service.ts line 61):
   - FE sends: `startTime = "2025-12-31 14:00:00"` (no timezone, just datetime string)
   - BE does: `const start = new Date(startTime)` 
   - Result: JavaScript interprets this as **LOCAL BROWSER TIMEZONE**. If browser is UTC+7, it becomes `2025-12-31T07:00:00Z` (7 hours earlier in UTC)
   - Stored in DB as: `2025-12-31T07:00:00Z` (in UTC)

2. **Filtering showtimes** (cinema-service/showtime.service.ts line 48):
   - FE sends: `date = "2025-12-31"`
   - BE builds filter: `gte: new Date("2025-12-31T00:00:00.000Z")` = `2025-12-31T00:00:00Z`
   - And: `lt: new Date("2025-12-31T23:59:59.999Z")` = `2025-12-31T23:59:59Z`
   - Stored time: `2025-12-31T07:00:00Z` ✓ **WITHIN** the filter range
   - **BUT** if there's timezone confusion or the stored time is actually in a different timezone, it won't match

3. **Why it shows on next day:**
   - If timezone offset causes stored time to be: `2026-01-01T07:00:00Z`
   - Then filtering by `date: "2026-01-01"` catches it
   - And filtering by `date: "2025-12-31"` misses it

## Solution (Proposed for BE Team):

### Option 1 (Recommended): Normalize to UTC in create method
```typescript
// In showtime-command.service.ts createShowtime() method (line ~61)
// Instead of:
// const start = new Date(startTime);

// Do this - parse the string as local date, then convert properly:
const [datePart, timePart] = startTime.split(' ');
const [year, month, day] = datePart.split('-');
const [hours, minutes, seconds] = timePart.split(':');

const start = new Date(Date.UTC(
  parseInt(year), 
  parseInt(month) - 1,  // JS months are 0-indexed
  parseInt(day),
  parseInt(hours),
  parseInt(minutes),
  parseInt(seconds)
));

// This ensures the startTime is treated as UTC, not local browser time
```

### Option 2: Change BE API to accept ISO format
- Update API contract so FE sends `startTime` as ISO string `"2025-12-31T14:00:00.000Z"`
- BE does: `const start = new Date(startTime)` — works correctly with ISO format
- Update FE to send: `const startTime = new Date(dateString + 'T' + timeString).toISOString()`

### Option 3: Add explicit timezone handling
- Define a timezone constant (e.g., "Asia/Ho_Chi_Minh" or "UTC+7")
- Parse datetime strings considering that timezone
- Use library like `date-fns-tz` or `moment-timezone` in BE

## Test Case After Fix:

1. Create showtime with: `startTime = "2025-12-31 14:00:00"`
2. Open admin showtimes list
3. Date picker defaults to today (current date)
4. Change date picker to `2025-12-31`
5. **Expected**: Showtime appears in list ✓
6. Change date picker to `2026-01-01`
7. **Expected**: Showtime does NOT appear (or appears only if it's for next day)

## FE Workaround (Current):
- None required — issue is on BE side
- FE correctly sends date filters to BE
- FE correctly displays showtimes returned by BE
- But BE filtering logic has timezone bug

## Notes for BE Team:
- JavaScript `new Date("2025-12-31 14:00:00")` without timezone info is interpreted as **local time**, not UTC
- The database should store all datetimes in **UTC** for consistency across timezones
- When filtering, the comparison must use the **same timezone** as what's stored
- Consider using UTC-based parsing to avoid timezone ambiguity
- Add logging to debug: Log both the input `startTime` string and the resulting UTC datetime before storing
- Test with different system timezones to catch timezone-related bugs


# Issue: Delete Staff Member — 500 Error (CRITICAL)

**Status**: 🔴 BLOCKING for Admin FE staff management

**Problem (tóm tắt):**
- Admin tries to delete a staff member → HTTP 500 "Cannot DELETE /api/v1/staffs/[id]"
- FE sends: `DELETE /api/v1/staffs/18d08e5c-2633-44ba-8f0a-682796381765`
- BE returns: 500 error with message "Cannot DELETE /api/v1/staffs/[id]"
- **Root cause**: **The DELETE endpoint does not exist in BE** - API Gateway and user-service have no delete handler for staff

## Affected Endpoints:
- `DELETE /api/v1/staffs/:id` (missing entirely)

## Current State (BE):

### API Gateway Controller (`apps/api-gateway/src/app/module/user/controller/staff.controller.ts`):
- ✅ `@Post()` - Create
- ✅ `@Get()` - List all
- ✅ `@Get(':id')` - Get one
- ✅ `@Put(':id')` - Update
- ❌ **MISSING**: `@Delete(':id')` - Delete

### User Service (`apps/user-service/src/app/staff/staff.service.ts`):
- ✅ `create()` method
- ✅ `findAll()` method
- ✅ `findOne()` method
- ✅ `update()` method
- ❌ **MISSING**: `delete()` method

### User Service Controller (`apps/user-service/src/app/staff/staff.controller.ts`):
- ❌ **MISSING**: `@MessagePattern(UserMessage.STAFF.DELETED)` message handler

## Solution (Proposed for BE Team):

### Step 1: Add delete method to user-service

**File**: `apps/user-service/src/app/staff/staff.service.ts`

Add this method:
```typescript
async delete(id: string): Promise<ServiceResult<{ id: string; message: string }>> {
  // Optional: Add soft delete with deactivation instead of hard delete
  // For now, implementing hard delete:
  await this.prisma.staff.delete({
    where: { id },
  });

  return {
    data: { id, message: 'Staff member deleted successfully' },
  };
}
```

### Step 2: Add message pattern to user-service controller

**File**: `apps/user-service/src/app/staff/staff.controller.ts`

Add this handler:
```typescript
@MessagePattern(UserMessage.STAFF.DELETED)
async delete(@Payload() id: string) {
  return this.staffService.delete(id);
}
```

### Step 3: Add delete endpoint to API Gateway

**File**: `apps/api-gateway/src/app/module/user/controller/staff.controller.ts`

Add this endpoint:
```typescript
@Delete(':id')
async delete(@Param('id') id: string) {
  return this.staffService.delete(id);
}
```

### Step 4: Ensure UserMessage enum has STAFF.DELETED

**File**: Check `libs/shared-types/src/user/user.message.ts` or similar

Make sure the enum contains:
```typescript
STAFF: {
  CREATED: 'staff.created',
  GET_LIST: 'staff.list',
  GET_DETAIL: 'staff.detail',
  UPDATED: 'staff.updated',
  DELETED: 'staff.deleted',  // ← Add this if missing
},
```

## FE Status:

**Current Implementation** (`FE/movie-hub-fe/apps/web/src/libs/api/services.ts`):
```typescript
export const staffApi = {
  // ... other methods ...
  delete: (id: string) =>
    api.delete(`/api/v1/staffs/${id}`),  // ← Calls BE endpoint
};
```

**FE is correct** - ready to work once BE implements the delete endpoint.

## Test Case After BE Fix:

1. Open Admin → Staff Management
2. Click delete icon on any staff member
3. Confirm delete in dialog
4. **Expected**: Staff member removed from list, success toast shown ✓
5. Refresh page — staff should not reappear

## Important Notes for BE Team:

- This is a **CRITICAL BLOCKER** for admin staff management
- Users cannot remove staff members at all (no workaround available)
- Consider implementing **soft delete** (mark as inactive) instead of hard delete to maintain referential integrity with reservations/bookings
- If implementing hard delete, ensure there are no foreign key constraints that would prevent deletion (e.g., if staff has bookings)
- Add proper error handling: If staff has active reservations, return 400 "Cannot delete staff with active reservations" instead of 500

---

## Issue: Batch Create Showtimes � HTTP 500 Unexpected Error (CRITICAL)

**Status**: ?? BLOCKING for Admin FE batch showtimes feature

**Problem (t�m t?t):**
- Admin tries to batch-create showtimes via POST /api/v1/showtimes/batch
- FE sends correct payload with valid format (dates as YYYY-MM-DD, timeSlots as HH:mm)
- BE returns HTTP 500 with generic message Unexpected error
- Root causes: Missing runtime validation at API gateway, masked error messages in cinema-service, no proper logging

See: BATCH_SHOWTIMES_FOR_BACKEND.md for full details

## Quick Summary:

1. Add ZodValidationPipe to API gateway POST /batch endpoint
2. Add console.error logging to batchCreateShowtimes() and fetchMovieAndRelease() catch blocks
3. Verify Zod schema uses z.coerce.date() for startDate and endDate

## Files to Fix:
- apps/api-gateway/src/app/module/cinema/controller/showtime.controller.ts
- apps/cinema-service/src/app/showtime/showtime-command.service.ts
- libs/shared-types (batch-create-showtimes schema)

Estimated fix time: 15-20 minutes

---

# Issue: Batch Create Showtimes  HTTP 500 Unexpected Error (CRITICAL)

**Status**:  BLOCKING for Admin FE batch showtimes feature

**Problem (t�m t?t):**
- Admin tries to batch-create showtimes via POST /api/v1/showtimes/batch
- FE sends correct payload with valid format (dates as YYYY-MM-DD, timeSlots as HH:mm)
- BE returns HTTP 500 with generic message "Unexpected error"
- **Root causes**: 
  1. Missing Zod validation at API gateway
  2. Error messages masked in cinema-service with no logging
  3. No proper HTTP status mapping (all errors return 500)

## Affected Endpoint:
- POST /api/v1/showtimes/batch (endpoint exists but has validation/error handling issues)

## FE Payload (Verified Correct):
`json
{
  "movieId": "8c3a2f5a-1b4d-4e2c-9f3a-2b5c8d7e9f1a",
  "movieReleaseId": "9d4b3g6b-2c5e-5f3d-0g4b-3c6d9e8f0g2b",
  "startDate": "2025-12-31",
  "endDate": "2026-01-05",
  "timeSlots": ["09:00", "14:00", "18:00"],
  "repeatType": "DAILY",
  "format": "2D",
  "language": "vi"
}
`

## Root Cause Analysis:

### Issue 1: Missing Zod Validation at API Gateway

**File**: pps/api-gateway/src/app/module/cinema/controller/showtime.controller.ts

**Current Code** (problematic):
`	ypescript
@Post('batch')
async createBatch(@Body() payload: CreateShowtimeBatchDTO) {
  // No validation! Payload goes directly to cinema-service
  return this.showtimeService.createBatch(payload);
}
`

**Problem**: 
- startDate and endDate come as strings (e.g., "2025-12-31")
- No Zod validation to coerce them to Date objects
- Cinema-service receives string dates, expects Date objects
- Error occurs downstream when cinema-service tries to process string as date
- But error is caught and masked (see Issue 2)

**Solution**: Add ZodValidationPipe
`	ypescript
@Post('batch')
@UsePipes(new ZodValidationPipe(createShowtimeBatchSchema))
async createBatch(@Body() payload: CreateShowtimeBatchDTO) {
  return this.showtimeService.createBatch(payload);
}
`

### Issue 2: Error Masking Without Logging

**File 1**: pps/cinema-service/src/app/showtime/showtime-command.service.ts (line ~85)

**Current Code**:
`	ypescript
async batchCreateShowtimes(createDtos: CreateShowtimeDTO[]) {
  const result = await Promise.allSettled(
    createDtos.map(dto => this.createShowtime(dto)),
  );
  // No logging!
  return result;
}

private async createShowtime(dto: CreateShowtimeDTO) {
  try {
    // ... validation and creation ...
  } catch (e) {
    throw new RpcException(e); // Masked! No logging!
  }
}

private async fetchMovieAndRelease(movieId: string, releaseId: string) {
  try {
    // ... fetch logic ...
  } catch (error) {
    // Error is caught and converted to generic BadRequestException
    throw new BadRequestException('Invalid movie or release');
  }
}
`

**Problem**:
- When date string parsing fails, error is caught
- Thrown as RpcException without logging
- FE receives 500 with masked message
- BE team has no visibility into what failed

**Solution**: Add logging
`	ypescript
async batchCreateShowtimes(createDtos: CreateShowtimeDTO[]) {
  const result = await Promise.allSettled(
    createDtos.map(dto => this.createShowtime(dto)),
  );
  
  // Log failures
  result.forEach((r, idx) => {
    if (r.status === 'rejected') {
      console.error(Showtime creation failed for slot ${idx}:, r.reason);
    }
  });
  
  return result;
}

private async createShowtime(dto: CreateShowtimeDTO) {
  try {
    // ... validation and creation ...
  } catch (e) {
    console.error('Create showtime error:', e); // Add logging
    throw new RpcException(e);
  }
}

private async fetchMovieAndRelease(movieId: string, releaseId: string) {
  try {
    // ... fetch logic ...
  } catch (error) {
    console.error('Fetch movie/release error:', error); // Add logging
    throw new BadRequestException('Invalid movie or release');
  }
}
`

### Issue 3: No Proper HTTP Status Mapping

**Problem**: All errors return 500 to FE instead of semantically correct status codes

**Expected Status Codes**:
- 400 Bad Request: Invalid dates, invalid format, invalid language
- 404 Not Found: Movie or release not found
- 409 Conflict: Showtime already exists for slot
- 503 Service Unavailable: Movie service temporarily down

**Current**: Everything returns 500

## Solution (Summary for BE Team):

### Step 1: Verify Zod Schema (in libs/shared-types)

Check that createShowtimeBatchSchema uses z.coerce.date() for date fields:
`	ypescript
export const createShowtimeBatchSchema = z.object({
  movieId: z.string().uuid(),
  movieReleaseId: z.string().uuid(),
  startDate: z.coerce.date(),  //  Must be coerce, not string
  endDate: z.coerce.date(),    //  Must be coerce, not string
  timeSlots: z.array(z.string().regex(/^\d{2}:\d{2}5/)),
  repeatType: z.enum(['DAILY', 'WEEKLY', 'ONCE']),
  format: z.enum(['2D', '3D', 'IMAX']),
  language: z.enum(['en', 'vi', 'ja']),
});
`

If using z.string() instead of z.coerce.date(), change it immediately.

### Step 2: Add Validation Pipe to API Gateway

**File**: pps/api-gateway/src/app/module/cinema/controller/showtime.controller.ts

`	ypescript
import { ZodValidationPipe } from '@app/shared-pipes';
import { createShowtimeBatchSchema } from '@app/shared-types';

@Post('batch')
@UsePipes(new ZodValidationPipe(createShowtimeBatchSchema))
async createBatch(@Body() payload: CreateShowtimeBatchDTO) {
  return this.showtimeService.createBatch(payload);
}
`

### Step 3: Add Error Logging to Cinema Service

**File**: pps/cinema-service/src/app/showtime/showtime-command.service.ts

Add console.error() calls in:
1. atchCreateShowtimes() method  log each failed showtime
2. createShowtime() catch block  log creation errors
3. etchMovieAndRelease() catch block  log fetch errors

### Step 4: Test the Fix

1. Send valid batch request  Should succeed (200 OK)
2. Send with invalid date format  Should fail (400 Bad Request with validation error)
3. Send with non-existent movieId  Should fail (404 Not Found with clear message)
4. Check BE logs  Should see detailed error messages for debugging

## Test Case After All Fixes:

1. Open Admin  Showtimes  Batch Create
2. Fill form with valid data:
   - Select a movie and release
   - Start date: 2025-12-31
   - End date: 2026-01-05
   - Time slots: 09:00, 14:00, 18:00
   - Repeat type: DAILY
3. Click "Create Batch"
4. **Expected**: Shows success toast, batch showtimes created 
5. Navigate to daily view for each date  all showtimes should appear
6. If validation fails, should see clear error message (not generic "Unexpected error")

## Important Notes for BE Team:

- **CRITICAL**: Add logging first (helps debug faster)
- Zod validation must use z.coerce.date() for string-to-Date conversion
- The FE payload is correct  issue is BE's handling of string dates
- Estimated fix time: 15-20 minutes (3 small changes)
- No schema changes needed  just add validation and logging

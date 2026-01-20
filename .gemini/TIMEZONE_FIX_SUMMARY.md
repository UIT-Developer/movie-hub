# Timezone Issue - Root Cause & Solution

## Problem Identified

The timezone display issue was **NOT in the frontend**, but in the **backend seed data generation**.

### Root Cause

The seed script (`synthetic_seed_data/seed_cinema/seed.js`) was creating showtime dates using JavaScript's `new Date()` with `.setHours()`, which operates in **the local timezone of the machine running the script**.

**Example:**

```javascript
// OLD CODE (WRONG):
const scheduleDate = new Date(today);
scheduleDate.setDate(scheduleDate.getDate() + dayOffset);
scheduleDate.setHours(9, 0, 0, 0); // ❌ Creates "9:00 AM in LOCAL timezone"
```

**What happens:**

1. If your machine is in UTC+7 (Vietnam), this creates "9:00 AM UTC+7"
2. Prisma converts this to UTC when saving: "9:00 AM UTC+7" → "2:00 AM UTC"
3. Frontend displays it back in Vietnam time: "2:00 AM UTC" → "9:00 AM UTC+7" ✅

BUT if you run the seed script on a machine with a different timezone (e.g., UTC+0), you get:

1. Creates "9:00 AM UTC+0"
2. Saved as "9:00 AM UTC"
3. Displayed in Vietnam: "9:00 AM UTC" → "4:00 PM UTC+7" ❌ WRONG!

## Solution Applied

### 1. Fixed Seed Script (Backend)

Updated `synthetic_seed_data/seed_cinema/seed.js` to use **explicit UTC time manipulation**:

```javascript
// NEW CODE (CORRECT):
const todayVN = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));
todayVN.setUTCHours(todayVN.getUTCHours() - 7); // Midnight Vietnam Time

const scheduleDate = new Date(todayVN);
scheduleDate.setUTCDate(scheduleDate.getUTCDate() + dayOffset);
scheduleDate.setUTCHours(2, 0, 0, 0); // 9:00 AM Vietnam = 2:00 AM UTC
```

This ensures:

- Showtimes are **always** created as if they're in Vietnam Time (UTC+7)
- Stored in database as UTC
- Independent of the seed script runner's local timezone

### 2. Enhanced Frontend Display

Updated `apps/web/src/app/(main)/showtimes/[showtimeId]/_components/ticket-preview.tsx`:

```tsx
// Uses explicit Intl.DateTimeFormat with timezone
new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Ho_Chi_Minh', // ✅ Force Vietnam timezone
}).format(dateObj);
```

Added:

- `suppressHydrationWarning` to prevent SSR/client mismatch
- Console logging for debugging
- Error handling

## Action Required

**You MUST re-run the cinema seed script** to regenerate showtime data:

```bash
npm run seed:synthetic:cinema
```

After re-seeding:

1. All showtimes will have correct UTC timestamps
2. Frontend will display them correctly in Vietnam Time (UTC+7)
3. The issue will be resolved **permanently**, regardless of where the seed script runs

## Verification

After re-seeding, check the browser console when visiting a showtime page:

```
TicketPreview start_time: 2026-01-07T02:00:00.000Z Wed Jan 07 2026 09:00:00 GMT+0700
                         ↑ UTC stored value       ↑ Correctly displayed as Vietnam Time
```

Expected display: `09:00 07/01/2026` (matching the intended 9:00 AM Vietnam showtime)

## VNPay Integration

The VNPay payment integration already uses correct UTC+7 handling in `payment.service.ts`:

```typescript
const createDate = moment.utc().utcOffset('+07:00').format('YYYYMMDDHHmmss');
const expireDate = moment.utc(expireAt).utcOffset('+07:00').format('YYYYMMDDHHmmss');
```

This is unaffected by the seed data fix.

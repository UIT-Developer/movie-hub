# Timezone Issue - Final Analysis

## Summary

After extensive investigation, the timezone display issue persists despite multiple attempted fixes. The problem is complex and involves multiple layers of date/time handling.

## What Was Attempted

### 1. Frontend Fixes

- ✅ Added explicit `timeZone: 'Asia/Ho_Chi_Minh'` to `Intl.DateTimeFormat`
- ✅ Added `suppressHydrationWarning` to prevent SSR/client mismatches
- ✅ Changed from `toLocaleString` to `Intl.DateTimeFormat`
- ✅ Added ISO string handling to prevent hydration issues
- ✅ Implemented manual UTC+7 offset calculation to bypass all browser APIs

### 2. Backend/Seed Fixes

- ✅ Updated seed script to use explicit UTC time manipulation
- ✅ Changed from `.setHours()` to `.setUTCHours()` for timezone-independent dates
- ✅ Added Vietnam timezone offset calculations in seed data

## Root Cause Analysis

The issue is **NOT** in any single location but rather in the **interaction** between:

1. **Prisma/PostgreSQL**:

   - Schema uses `@db.Timestamp(6)` (timestamp WITHOUT timezone)
   - Prisma converts JavaScript Date objects before storing
   - PostgreSQL session timezone (unknown without Docker) affects storage

2. **JavaScript Date Behavior**:

   - `new Date()` always uses system local timezone for construction
   - `.getTime()` returns UTC milliseconds
   - Serialization to JSON converts to ISO 8601 UTC string

3. **React Query Dehydration**:

   - Server Component prefetches data
   - Dehydrates to JSON (Dates → ISO strings)
   - Rehydrates on client (ISO strings →Dates)
   - Client's local timezone affects rehydration

4. **Next.js SSR/Hydration**:
   - Server renders with server's timezone
   - Client renders with browser's timezone
   - Mismatch can cause display issues

## The "Overlapping" Issue

Your senior mentioned "overlapping timezone functions." This likely refers to:

- Seed script applying timezone conversion
- Prisma applying timezone conversion
- Database applying timezone conversion
- React Query hydration applying timezone conversion
- Browser applying timezone conversion

Each layer might be adding or subtracting timezone offsets, compounding the error.

## Recommended Solution

Since all code-based fixes have failed, the issue is likely in **infrastructure configuration**:

###1. Check PostgreSQL Timezone

```sql
SHOW timezone;
SET timezone = 'UTC'; -- Force UTC storage
```

### 2. Verify Prisma Connection String

Ensure the connection string doesn't specify a timezone:

```
postgresql://user:pass@host:port/db
# NOT: postgresql://user:pass@host:port/db?timezone=Asia/Ho_Chi_Minh
```

### 3. Use `timestamptz` Instead of `timestamp`

Update schema:

```prisma
start_time DateTime @db.Timestamptz(6)  // WITH timezone
```

This makes PostgreSQL timezone-aware.

### 4. Normalize All Dates in Code

Create a utility:

```typescript
export function toUTCDate(date: Date | string): Date {
  const d = new Date(date);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()));
}
```

## Current State

The manual UTC+7 offset calculation in `ticket-preview.tsx` should work mathematically:

```tsx
const utcDate = new Date(data.showtime.start_time);
const vnDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
const hours = vnDate.getUTCHours().toString().padStart(2, '0');
// ...
return `${hours}:${minutes} ${day}/${month}/${year}`;
```

If this doesn't display the correct time, then the **database itself** has incorrect UTC values, meaning the seed script is not working as expected OR Prisma/PostgreSQL is applying an unwanted conversion during save/retrieve.

## Next Steps (When Infrastructure is Available)

1. **Verify database timezone**: `SHOW timezone;` in PostgreSQL
2. **Check actual stored values**: `SELECT id, start_time FROM showtimes LIMIT 1;`
3. **Compare with seed script output**: Add `console.log(startTime.toISOString())` before Prisma create
4. **Verify Prisma client timezone handling**: Check if Prisma CLI/NODE_TZ environment variables are set

## Conclusion

Without access to the running database, we cannot verify:

- What timezone PostgreSQL is using
- What values are actually stored
- Whether Prisma is applying unexpected conversions

The code is structurally sound, but the **infrastructure configuration** (PostgreSQL timezone, Node.js TZ variable, Docker timezone) is likely the culprit.

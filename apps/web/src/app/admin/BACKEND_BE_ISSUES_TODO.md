# Backend BE Issues & TODO

## Status: PARTIALLY FIXED IN ADMIN FE, BACKEND ISSUES IDENTIFIED 🔴

### Movie Releases - Add New Release Dialog Issues

---

## 🔴 BACKEND ISSUES - REQUIRE BE TEAM FIX

### Issue 1: MovieReleaseResponse Missing Required Field
**Status:** 🔴 BACKEND ISSUE - NEEDS BE FIX

**Problem:** The `MovieReleaseResponse` interface does not include `movieId` field, but `movieId` is a required field in the Prisma schema and in the Create request.

**Details:**
- **BE Service Location:** `/BE/movie-hub/apps/movie-service/src/module/movie/movie.service.ts`
- **Current Response:** Only returns `id`, `startDate`, `endDate`, `note`
- **Expected:** Should also return `movieId`
- **Prisma Schema:** `movieId` is required (`movieId String @db.Uuid` - no `?`)
- **Impact:** Frontend cannot know which movie the created release belongs to; data integrity issue

**Affected Methods (ALL NEED TO ADD `movieId` TO SELECT):**
1. `createMovieRelease()` (line ~256)
2. `updateMovieRelease()` (line ~286)
3. `getMovieRelease()` (line ~239)

**BE FIX REQUIRED:**
1. **Update Response DTO:** `/BE/movie-hub/libs/shared-types/src/movie/dto/response/movie-release.response.ts`
   ```typescript
   export interface MovieReleaseResponse {
     id: string;
     movieId: string;      // ← ADD THIS
     startDate: Date;
     endDate: Date;
     note: string;
   }
   ```

2. **Update Service Methods:** `/BE/movie-hub/apps/movie-service/src/module/movie/movie.service.ts`
   - Add `movieId: true` to SELECT clause in all 3 methods:
     - Line ~239 in `getMovieRelease()` 
     - Line ~269 in `createMovieRelease()`
     - Line ~296 in `updateMovieRelease()`

**Current SELECT (WRONG):**
```typescript
select: {
  id: true,
  startDate: true,
  endDate: true,
  note: true,
}
```

**Should be:**
```typescript
select: {
  id: true,
  movieId: true,      // ← ADD THIS
  startDate: true,
  endDate: true,
  note: true,
}
```

**API Gateway Note:**
The API Gateway Movie Service (`/BE/movie-hub/apps/api-gateway/src/app/module/movie/service/movie.service.ts`) also has `getMovieRelease()` method (line ~79) that calls the movie-service. This should automatically work once the movie-service is fixed.

---

## Backend API Schema Reference

**CreateMovieReleaseRequest Schema:**
```typescript
{
  movieId: z.uuid().optional(),        // Optional in schema, but required logically
  startDate: z.coerce.date(),          // Required - string format: YYYY-MM-DD from HTML input
  endDate: z.coerce.date(),            // Required - string format: YYYY-MM-DD from HTML input
  note: z.string().max(500).optional() // Optional
}
```

**Prisma Schema:**
```
model MovieRelease {
  id          String   @id
  movieId     String   @db.Uuid       // REQUIRED (no ?)
  startDate   DateTime @db.Date       // REQUIRED
  endDate     DateTime? @db.Date      // OPTIONAL (has ?)
  note        String?                 // OPTIONAL
}
```

**⚠️ SCHEMA MISMATCH:** 
- Prisma has `endDate` as optional (`?`), but Zod schema requires it
- BE team should verify if this is intentional

---

## Testing Steps After BE Fix
1. Fill in Movie Release form with:
   - Movie: Select any movie
   - Start Date: Select date (e.g., 2025-12-31)
   - End Date: Select date (e.g., 2026-02-28)
   - Note: Optional, can be left empty
2. Click "Create Release"
3. Verify:
   - ✅ Success toast appears
   - ✅ Dialog closes
   - ✅ Release appears in list with correct movieId
   - ✅ Movie name displays correctly next to release

---

## Admin FE Workaround Status
❌ Cannot fully workaround the missing `movieId` in response - this is a BE contract issue
✅ Error handling is now properly displayed to users
✅ Field labels now correctly reflect required/optional status

## Next Steps
🚀 **Backend team MUST fix Issue 3** before Add New Release will work properly
📝 The FE is ready and waiting for the correct API response

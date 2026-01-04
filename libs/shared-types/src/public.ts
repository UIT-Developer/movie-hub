// Frontend-safe export surface for the web app.
//
// Important:
// - Do NOT export Nest-only DTO classes created via `createZodDto`.
// - Do NOT export exception types that depend on `@nestjs/*`.
//
// This file is intentionally conservative: only shared enums, response DTO
// interfaces, and plain request interfaces used by the frontend are exported.

export * from './constant';
export * from './common';

// Movie
export * from './movie/enum';
export * from './movie/dto/response';

// Cinema
export * from './cinema/enum';
export * from './cinema/dto/response';

// Booking
export * from './booking/enum';
export * from './booking/dto/response';
export * from './booking/dto/request/create-payment.dto';
export * from './booking/dto/request/create-concession.dto';

// User (responses + enums only)
export * from './user/enum';
export * from './user/user-detail.dto';
export * from './user/staff.response';

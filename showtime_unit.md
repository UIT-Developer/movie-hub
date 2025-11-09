Test Coverage Summary
46 tests total - All passing ✅
Service tests: 22 tests covering all methods and scenarios
Controller tests: 24 tests covering all MessagePattern endpoints
ShowtimeService Tests
The service tests comprehensively cover:

getMovieShowtimesAtCinema:

✅ Redis caching behavior (cache hits and misses)
✅ Database query with proper date filtering
✅ Mapper integration for response transformation
✅ Empty results handling
✅ Database error propagation
✅ Cache key generation validation
getShowtimeSeats (Complex method with multi-layer caching):

✅ Complete seat information retrieval with user context
✅ Multi-layer Redis caching (showtime, seats, pricing)
✅ Real-time data fetching (confirmed seats, held seats, user seats)
✅ Reservation status mapping logic (CONFIRMED > HELD > AVAILABLE)
✅ Optional user ID parameter handling
✅ Empty seat/pricing results
✅ Complex seat mapper integration
clearShowtimeCache:

✅ Cinema-specific cache clearing
✅ Hall-specific cache clearing
✅ Combined cache clearing
✅ Default ticket pricing cache clearing
ShowtimeController Tests
The controller tests thoroughly cover:

getMovieShowtimesAtCinema (MessagePattern method):

✅ Service integration and payload handling
✅ Empty and multiple showtime responses
✅ Error propagation from service layer
✅ Different date formats and cinema/movie IDs
✅ Async operation handling
getShowtimeSeats (MessagePattern method):

✅ Optional userId parameter handling (with/without user)
✅ Complex seat response structure processing
✅ Different showtime and user ID variations
✅ Service error propagation
✅ Async operation handling
Advanced Test Scenarios
Concurrent Operations: Multiple simultaneous requests handling
Error Handling: Service errors, network errors, validation errors
Edge Cases: Invalid data, empty results, null parameters
Message Pattern Integration: Proper payload structure validation
Cache Behavior: Multi-level caching logic and error scenarios
Key Technical Features Tested
Geographic Precision: Complex seat mapping with reservation statuses
Caching Strategy: Multi-layer Redis caching with different TTL values
Real-time Data: Seat reservations, held seats, and user-specific data
Business Logic: Reservation priority (confirmed > held), pricing calculations
Microservice Integration: MessagePattern decorators and payload handling
Mock Quality
Comprehensive Mocking: All dependencies properly mocked with Jest
Realistic Data: Mock data reflects actual business entities
Error Simulation: Various failure scenarios tested
Type Safety: Proper TypeScript typing throughout tests
MovieService Tests (movie.service.spec.ts)
✅ 15 test cases covering:

getMovies method (6 tests):

Pagination with metadata
Without pagination (no metadata)
Filtering by "now_show" status
Filtering by "upcoming" status
Sorting parameters
Multi-page pagination calculations
getMovieDetail method (2 tests):

Movie with genres
Movie without genres
createMovie method (2 tests):

Successful creation with all data
Creation with minimal data
updateMovie method (3 tests):

Successful update with genre changes
ResourceNotFoundException when movie doesn't exist
Update without genre changes
deleteMovie method (2 tests):

Successful deletion
Error handling for non-existent movies
MovieController Tests (movie.controller.spec.ts)
✅ 16 test cases covering:

getMovies method (3 tests):

Correct parameter passing with pagination
Empty query parameters
Sorting parameters
getDetail method (2 tests):

Movie with genres
Movie without genres
createMovie method (2 tests):

Complete movie creation
Minimal movie creation
updateMovie method (2 tests):

Successful update
Partial update (title only)
deleteMovie method (2 tests):

Successful deletion
Error handling
Message Pattern Decorators (1 test):

Validates NestJS microservice message patterns
Error Handling (4 tests):

Service error propagation for all methods
Key Features of the Tests:
Comprehensive Mocking: Properly mocked PrismaService and MovieMapper dependencies
Type Safety: Used appropriate type assertions to handle enum compatibility
Edge Cases: Covered both success and error scenarios
Realistic Data: Used realistic mock data that matches your domain model
Microservice Patterns: Tested NestJS microservice message pattern decorators
Error Handling: Verified proper error propagation and exception handling
Clean Structure: Well-organized test suites with descriptive test names
Test Results:
Total Test Suites: 2 passed
Total Tests: 31 passed
Coverage: All major methods and edge cases covered
Status: ✅ All tests passing
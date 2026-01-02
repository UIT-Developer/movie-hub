# Integration Tests Guide

## 📂 Integration Tests Structure

```
apps/
├── api-gateway-e2e/                    # 🎯 END-TO-END TESTS (Full API Gateway)
│   ├── src/
│   │   ├── api-gateway/
│   │   │   └── api-gateway.spec.ts     # Full API integration tests
│   │   └── support/
│   │       ├── global-setup.ts         # Start services before tests
│   │       ├── global-teardown.ts      # Clean up after tests
│   │       └── test-setup.ts           # Configure test environment
│   ├── jest.config.ts                  # E2E test configuration
│   └── project.json                    # NX project configuration
│
├── movie-service/src/
│   └── movie.e2e-spec.ts              # 🎯 SERVICE INTEGRATION TESTS
│
├── user-service/src/
│   └── user.e2e-spec.ts               # 🎯 SERVICE INTEGRATION TESTS
│
└── cinema-service/src/
    └── cinema.e2e-spec.ts             # 🎯 SERVICE INTEGRATION TESTS
```

## 🎭 Types of Integration Tests

### 1. **Service-Level Integration Tests** (`.e2e-spec.ts` in service folders)

- **Location**: `apps/{service}/src/*.e2e-spec.ts`
- **Purpose**: Test individual microservice with real database
- **What they test**:
  - API endpoints within the service
  - Database interactions
  - Service business logic
  - Error handling

### 2. **API Gateway Integration Tests** (api-gateway-e2e app)

- **Location**: `apps/api-gateway-e2e/src/`
- **Purpose**: Test the complete API through the gateway
- **What they test**:
  - End-to-end API workflows
  - Microservice communication through gateway
  - Authentication and authorization
  - Cross-service operations

## 🚀 Pipeline Integration

### Current Pipeline Commands

```bash
# Unit Tests (mocked dependencies)
npm run test:unit:report

# Integration Tests (real services/databases)
npm run test:integration:report
```

### What Each Command Runs

**Unit Tests** (`test:unit:report`):

- Runs all `*.spec.ts` files (excludes `*.e2e-spec.ts`)
- Uses mocked dependencies (Prisma, external services)
- Fast execution (~10-20 seconds)
- Generates coverage reports

**Integration Tests** (`test:integration:report`):

- Runs all `*.e2e-spec.ts` files in services
- Runs the `api-gateway-e2e` project
- Uses real databases/services
- Slower execution (~30-60 seconds)
- Tests real integrations

## 📋 Jenkins Pipeline Stages

```groovy
stage('Unit Tests') {
    steps {
        bat 'npm run test:unit:report'
    }
    // Publishes unit test results and coverage
}

stage('Integration Tests') {
    steps {
        bat 'npm run test:integration:report'
    }
    // Publishes integration test results
}
```

## 🏗️ Test Execution Flow

### 1. Service Integration Tests

```typescript
// apps/movie-service/src/movie.e2e-spec.ts
describe('Movie Service Integration', () => {
  // Tests actual movie service with real Prisma
  // No mocking - real database operations
  // Tests API endpoints directly
});
```

### 2. API Gateway Integration Tests

```typescript
// apps/api-gateway-e2e/src/api-gateway/api-gateway.spec.ts
describe('API Gateway Integration', () => {
  // Tests through API Gateway (port 3000)
  // Tests microservice communication
  // Tests complete user workflows
});
```

## 🎯 When to Use Each Type

### Service Integration Tests

- **When**: Testing individual service functionality
- **Good for**:
  - Database operations
  - Service-specific business logic
  - Internal API endpoints
  - Service error handling

### API Gateway Integration Tests

- **When**: Testing complete user workflows
- **Good for**:
  - End-to-end user journeys
  - Cross-service operations
  - Authentication flows
  - API Gateway routing

## 🔧 Configuration Files

### Service Integration Test Config

```typescript
// Each service's jest.config.ts includes:
{
  coverageDirectory: '../../test-results/coverage/apps/{service}',
  reporters: ['default', ['jest-junit', { ... }]]
}
```

### API Gateway E2E Config

```typescript
// apps/api-gateway-e2e/jest.config.ts
{
  globalSetup: '<rootDir>/src/support/global-setup.ts',    // Starts services
  globalTeardown: '<rootDir>/src/support/global-teardown.ts', // Cleanup
  setupFiles: ['<rootDir>/src/support/test-setup.ts'],     // Test config
}
```

## 📊 Test Results Structure

After running integration tests:

```
test-results/
├── coverage/apps/
│   ├── api-gateway-e2e/           # E2E coverage
│   ├── movie-service/             # Service integration coverage
│   ├── user-service/              # Service integration coverage
│   └── cinema-service/            # Service integration coverage
└── junit/
    ├── api-gateway-e2e-junit.xml  # E2E test results
    ├── movie-service-junit.xml     # Service test results
    ├── user-service-junit.xml      # Service test results
    └── cinema-service-junit.xml    # Service test results
```

## 🏃‍♂️ Running Integration Tests

### All Integration Tests

```bash
npm run test:integration:report
```

### Specific Service Integration Test

```bash
npx nx e2e api-gateway-e2e      # Full API Gateway tests
npx nx test movie-service       # Movie service integration tests
npx nx test user-service        # User service integration tests
```

### With Coverage

```bash
npx nx test movie-service --coverage
```

## 🐛 Troubleshooting

### Common Issues

1. **Service Not Running**: Integration tests need services to be running

   ```bash
   npm run dev:core  # Start core services first
   ```

2. **Database Issues**: Ensure test databases are set up

   ```bash
   npm run prisma:generate
   ```

3. **Port Conflicts**: Check if ports are available
   - API Gateway: 3000
   - Movie Service: 3001
   - User Service: 3002
   - Cinema Service: 3003

### Test Data Management

- **Service Tests**: Use test database with cleanup
- **E2E Tests**: Use global setup/teardown for data management
- **Isolation**: Each test should clean up after itself

## 🚀 Best Practices

1. **Test Isolation**: Each test should be independent
2. **Data Cleanup**: Always clean up test data
3. **Real Dependencies**: Use real databases, not mocks
4. **Error Testing**: Test both success and failure scenarios
5. **Performance**: Keep tests fast by limiting data setup

# 🎫 Booking Service Setup Guide

## ✅ What Has Been Created

The booking service has been successfully scaffolded with the following structure:

### 📁 File Structure
```
apps/booking-service/
├── src/
│   ├── app/
│   │   ├── app.module.ts              ✅ Configured with ConfigModule, CacheModule
│   │   ├── app.controller.ts          ✅ Basic controller
│   │   ├── app.service.ts             ✅ Basic service
│   │   └── prisma.service.ts          ✅ Prisma database service
│   ├── filter/
│   │   └── all-exception.filter.ts    ✅ Global exception filter for error handling
│   ├── main.ts                        ✅ TCP microservice bootstrap
│   └── assets/
├── prisma/
│   └── schema.prisma                  ✅ Complete database schema (11 tables)
├── generated/                         ✅ Generated Prisma Client
├── Dockerfile                         ✅ Multi-stage Docker build
├── .env                               ✅ Environment variables
├── .env.db                            ✅ Database configuration
├── project.json                       ✅ Nx targets with Prisma tasks
├── webpack.config.js                  ✅ Webpack configuration
├── tsconfig.json                      ✅ TypeScript configuration
├── tsconfig.app.json                  ✅ App-specific TS config
├── tsconfig.spec.json                 ✅ Test TS config
├── jest.config.ts                     ✅ Jest test configuration
├── eslint.config.mjs                  ✅ ESLint configuration
└── README.md                          ✅ Comprehensive documentation
```

### 🗄️ Database Schema (11 Tables)

1. **Bookings** - Main booking records with status tracking
2. **Tickets** - Individual e-tickets with QR codes
3. **Payments** - Payment transactions (multiple methods supported)
4. **Refunds** - Refund management
5. **Concessions** - Food, drinks, combos, merchandise
6. **BookingConcessions** - Junction table linking bookings to concessions
7. **Promotions** - Discount codes and promotional campaigns
8. **LoyaltyAccounts** - User loyalty points accounts
9. **LoyaltyTransactions** - Points earning/redemption history

### 🔧 Configuration

**TCP Port**: 3004  
**Database Port**: 5438 (PostgreSQL)  
**Database Name**: movie_hub_booking

## 🚀 Next Steps

### Step 1: Initialize Database

```bash
# Navigate to booking service directory
cd apps/booking-service

# Run database migration to create tables
npx prisma migrate dev --name init

# (Optional) Check database with Prisma Studio
npx prisma studio
```

### Step 2: Update Docker Compose

Add to `docker-compose.yml`:

```yaml
  # In database services section
  postgres-booking:
    image: postgres:15-alpine
    container_name: moviehub-postgres-booking
    restart: unless-stopped
    env_file:
      - ./apps/booking-service/.env.db
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DB:-movie_hub_booking}
    ports:
      - "5438:5432"
    volumes:
      - postgres_booking_data:/var/lib/postgresql/data
    networks:
      - moviehub-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d movie_hub_booking"]
      interval: 10s
      timeout: 5s
      retries: 5

  # In microservices section
  booking-service:
    build:
      context: .
      dockerfile: apps/booking-service/Dockerfile
      target: production
    container_name: moviehub-booking-service
    restart: unless-stopped
    env_file:
      - ./apps/booking-service/.env
    ports:
      - "4004:3004"
    depends_on:
      postgres-booking:
        condition: service_healthy
    networks:
      - moviehub-network
    volumes:
      - ./apps/booking-service/src:/app/apps/booking-service/src:ro
    healthcheck:
      test: ["CMD", "node", "--version"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
    command: sh -c "npx prisma migrate deploy && node main.js"

# In volumes section, add:
volumes:
  postgres_booking_data:
    name: moviehub_postgres_booking_data
```

### Step 3: Create Business Logic Modules

Generate the main feature modules:

```bash
cd apps/booking-service

# Booking Module
npx nest g module booking src/app
npx nest g controller booking src/app/booking --flat
npx nest g service booking src/app/booking --flat

# Payment Module
npx nest g module payment src/app
npx nest g controller payment src/app/payment --flat
npx nest g service payment src/app/payment --flat

# Concession Module
npx nest g module concession src/app
npx nest g controller concession src/app/concession --flat
npx nest g service concession src/app/concession --flat

# Promotion Module
npx nest g module promotion src/app
npx nest g controller promotion src/app/promotion --flat
npx nest g service promotion src/app/promotion --flat

# Loyalty Module
npx nest g module loyalty src/app
npx nest g controller loyalty src/app/loyalty --flat
npx nest g service loyalty src/app/loyalty --flat

# Ticket Module
npx nest g module ticket src/app
npx nest g controller ticket src/app/ticket --flat
npx nest g service ticket src/app/ticket --flat
```

### Step 4: Integrate with API Gateway

Update `apps/api-gateway/src/app/app.module.ts`:

```typescript
{
  name: 'BOOKING_SERVICE',
  transport: Transport.TCP,
  options: {
    host: process.env.BOOKING_SERVICE_HOST || 'localhost',
    port: parseInt(process.env.BOOKING_SERVICE_PORT) || 3004,
  },
}
```

Add to `apps/api-gateway/.env`:
```env
BOOKING_SERVICE_HOST=localhost
BOOKING_SERVICE_PORT=3004
```

### Step 5: Implement API Endpoints

Reference the API contract: `docs/booking-api-contract.yml`

Key endpoints to implement:
- `POST /bookings` - Create booking
- `GET /bookings` - List user bookings
- `GET /bookings/:id` - Get booking details
- `DELETE /bookings/:id` - Cancel booking
- `POST /bookings/:id/payments` - Create payment
- `POST /payments/:id/confirm` - Confirm payment
- `GET /concessions` - List concessions
- `GET /promotions` - List promotions
- `POST /promotions/:code/validate` - Validate promo code
- `GET /loyalty/balance` - Get loyalty points

### Step 6: Test the Service

```bash
# Build the service
npx nx build booking-service

# Run the service locally
npx nx serve booking-service

# Run tests
npx nx test booking-service

# Run with Docker
docker compose up -d postgres-booking booking-service
```

## 📋 Quick Commands Reference

```bash
# Development
npx nx serve booking-service              # Start dev server
npx nx build booking-service              # Build for production
npx nx test booking-service               # Run tests

# Database
cd apps/booking-service
npx prisma generate                       # Generate Prisma client
npx prisma migrate dev                    # Create and apply migration
npx prisma migrate deploy                 # Apply migrations (production)
npx prisma studio                         # Open Prisma Studio GUI
npx prisma db push                        # Push schema without migration
npx prisma db seed                        # Seed database

# Docker
docker compose up -d postgres-booking     # Start database only
docker compose up -d booking-service      # Start service with dependencies
docker compose logs -f booking-service    # View service logs
docker compose exec booking-service sh    # Access container shell

# Nx
npx nx show project booking-service       # View project details
npx nx graph                              # View dependency graph
```

## 🔗 Related Files

- API Contract: `docs/booking-api-contract.yml`
- Database Schema: `apps/booking-service/prisma/schema.prisma`
- Service Documentation: `apps/booking-service/README.md`
- Docker Configuration: `apps/booking-service/Dockerfile`

## ✨ Features Ready to Implement

Based on the schema and API contract:

1. ✅ Database models defined
2. ✅ Exception handling configured
3. ✅ Prisma client generated
4. ✅ Docker configuration ready
5. ✅ Nx build system configured
6. ⏳ Business logic modules (to be created)
7. ⏳ API Gateway integration (to be configured)
8. ⏳ Payment gateway integration (to be implemented)
9. ⏳ QR code generation (to be implemented)
10. ⏳ Loyalty points calculation (to be implemented)

## 🎯 Implementation Priority

1. **Core Booking Flow** (HIGH)
   - Create booking
   - List bookings
   - View booking details
   - Cancel booking

2. **Payment Processing** (HIGH)
   - Create payment
   - Confirm payment
   - Handle payment webhooks

3. **Concessions** (MEDIUM)
   - List available items
   - Add to booking

4. **Promotions** (MEDIUM)
   - Validate promo codes
   - Apply discounts

5. **Loyalty Program** (LOW)
   - Track points
   - Redeem points

6. **E-Tickets** (MEDIUM)
   - Generate QR codes
   - Validate tickets

## 📝 Notes

- No e2e tests were created as requested
- Service follows the same pattern as other services (cinema, movie, user)
- All configuration files use the same structure for consistency
- Ready for immediate development after database initialization

**Status**: ✅ Booking service scaffolding complete and ready for implementation!

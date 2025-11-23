# Booking Service

## Overview
Microservice for handling movie ticket bookings, payments, concessions, promotions, and loyalty programs.

## Features
- 🎫 Booking Management (create, view, cancel bookings)
- 💳 Payment Processing (multiple payment methods)
- 🍿 Concessions (food, drinks, combos)
- 🎁 Promotions & Discounts
- ⭐ Loyalty Points System
- 📱 E-Tickets with QR codes
- 💰 Refund Management

## Tech Stack
- **Framework**: NestJS
- **Database**: PostgreSQL (via Prisma ORM)
- **Transport**: TCP Microservice
- **Language**: TypeScript

## Environment Variables

Create `.env` file in `apps/booking-service/`:

```env
# TCP Microservice Configuration
TCP_HOST=0.0.0.0
TCP_PORT=3004

# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5438/movie_hub_booking?schema=public"

# Node Environment
NODE_ENV=development
```

## Database Setup

### 1. Generate Prisma Client
```bash
npx nx prisma:generate booking-service
```

### 2. Run Migrations (Create database schema)
```bash
cd apps/booking-service
npx prisma migrate dev --name init
```

### 3. (Optional) Seed Database
```bash
cd apps/booking-service
npx prisma db seed
```

## Development

### Build the service
```bash
npx nx build booking-service
```

### Serve the service
```bash
npx nx serve booking-service
```

### Run tests
```bash
npx nx test booking-service
```

## Docker

### Build Docker image
```bash
docker build -f apps/booking-service/Dockerfile -t booking-service .
```

### Run with Docker Compose
```bash
docker compose up -d postgres-booking booking-service
```

## Database Schema

### Main Entities
- **Bookings**: Main booking records
- **Tickets**: Individual tickets with QR codes
- **Payments**: Payment transactions
- **Refunds**: Refund records
- **Concessions**: Food & beverage items
- **BookingConcessions**: Junction table for bookings and concessions
- **Promotions**: Discount codes and promotions
- **LoyaltyAccounts**: User loyalty points
- **LoyaltyTransactions**: Points transaction history

### Key Relationships
- One booking has many tickets
- One booking has many payments
- One booking has many concessions (via junction table)
- One payment has many refunds
- One loyalty account has many transactions

## API Integration

This service communicates via TCP with the API Gateway.

**TCP Port**: 3004 (configurable via TCP_PORT env variable)

### Message Patterns
- `booking.create`
- `booking.findAll`
- `booking.findOne`
- `booking.cancel`
- `payment.create`
- `payment.confirm`
- `promotion.validate`
- `loyalty.getBalance`
- etc.

## Project Structure
```
apps/booking-service/
├── src/
│   ├── app/
│   │   ├── app.module.ts       # Main module
│   │   ├── app.controller.ts   # Default controller
│   │   ├── app.service.ts      # Default service
│   │   └── prisma.service.ts   # Prisma service
│   ├── filter/
│   │   └── all-exception.filter.ts  # Global exception filter
│   ├── main.ts                 # Entry point
│   └── assets/                 # Static assets
├── prisma/
│   └── schema.prisma           # Database schema
├── Dockerfile                  # Docker configuration
├── .env                        # Environment variables
├── .env.db                     # Database environment variables
├── project.json                # Nx project configuration
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Webpack configuration
└── README.md                   # This file
```

## Next Steps

1. **Create booking module**:
   ```bash
   cd apps/booking-service
   npx nest g module booking src/app
   npx nest g controller booking src/app
   npx nest g service booking src/app
   ```

2. **Create payment module**:
   ```bash
   npx nest g module payment src/app
   npx nest g controller payment src/app
   npx nest g service payment src/app
   ```

3. **Create other modules** (concession, promotion, loyalty, ticket)

4. **Implement business logic** based on the API contract in `docs/booking-api-contract.yml`

5. **Add to API Gateway** routing and communication

6. **Update docker-compose.yml** to include booking service

## Related Documentation
- [Booking API Contract](../../docs/booking-api-contract.yml)
- [Database Schema](../../docs/database-schema.md)
- [Docker Setup](../../docs/DOCKER_SETUP.md)

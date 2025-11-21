# Concession & Promotion CRUD API Documentation

## Overview

Complete CRUD (Create, Read, Update, Delete) operations for managing concessions and promotions in the MovieHub booking system.

---

## 🍿 Concessions API

### Base URL
```
/v1/concessions
```

### Endpoints

#### 1. Get All Concessions
```http
GET /v1/concessions
```

**Query Parameters:**
- `cinemaId` (optional): Filter by cinema ID
- `category` (optional): Filter by category (FOOD, BEVERAGE, COMBO, MERCHANDISE)
- `available` (optional): Filter by availability (true/false)

**Response:**
```json
[
  {
    "id": "conc123",
    "name": "Popcorn Large",
    "nameEn": "Popcorn Large",
    "description": "Large bucket of buttered popcorn",
    "category": "FOOD",
    "price": 50000,
    "imageUrl": "https://...",
    "available": true,
    "inventory": 100,
    "cinemaId": "cinema456",
    "nutritionInfo": {
      "calories": 500,
      "protein": 5
    },
    "allergens": ["dairy"]
  }
]
```

#### 2. Get Single Concession
```http
GET /v1/concessions/:id
```

**Response:** Same as single item above

#### 3. Create Concession
```http
POST /v1/concessions
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Popcorn Large",
  "nameEn": "Popcorn Large",
  "description": "Large bucket of buttered popcorn",
  "category": "FOOD",
  "price": 50000,
  "imageUrl": "https://...",
  "available": true,
  "inventory": 100,
  "cinemaId": "cinema456",
  "nutritionInfo": {
    "calories": 500,
    "protein": 5
  },
  "allergens": ["dairy"]
}
```

**Response:** Created concession object

#### 4. Update Concession
```http
PUT /v1/concessions/:id
Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "name": "Popcorn Medium",
  "price": 40000,
  "available": true,
  "inventory": 150
}
```

**Response:** Updated concession object

#### 5. Delete Concession
```http
DELETE /v1/concessions/:id
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Concession deleted successfully"
}
```

**Note:** Cannot delete concessions used in active bookings. Will return error suggesting to mark as unavailable instead.

#### 6. Update Inventory
```http
PATCH /v1/concessions/:id/inventory
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "quantity": 50  // Positive to add, negative to subtract
}
```

**Response:** Updated concession object

---

## 🎟️ Promotions API

### Base URL
```
/v1/promotions
```

### Endpoints

#### 1. Get All Promotions
```http
GET /v1/promotions
```

**Query Parameters:**
- `active` (optional): Filter by active status (true/false)
- `type` (optional): Filter by type (PERCENTAGE, FIXED_AMOUNT)

**Response:**
```json
[
  {
    "id": "promo123",
    "code": "SUMMER2024",
    "name": "Summer Sale",
    "description": "10% off all bookings",
    "type": "PERCENTAGE",
    "value": 10,
    "minPurchase": 100000,
    "maxDiscount": 50000,
    "validFrom": "2024-06-01T00:00:00Z",
    "validTo": "2024-08-31T23:59:59Z",
    "usageLimit": 1000,
    "usagePerUser": 5,
    "currentUsage": 234,
    "applicableFor": ["TICKET", "CONCESSION"],
    "conditions": {
      "minTickets": 2
    },
    "active": true
  }
]
```

#### 2. Get Single Promotion
```http
GET /v1/promotions/:id
```

**Response:** Single promotion object

#### 3. Get Promotion by Code
```http
GET /v1/promotions/code/:code
```

**Response:** Single promotion object

#### 4. Validate Promotion
```http
POST /v1/promotions/validate/:code
```

**Request Body:**
```json
{
  "bookingAmount": 200000,
  "userId": "user123"
}
```

**Response:**
```json
{
  "valid": true,
  "promotion": { /* promotion object */ },
  "discountAmount": 20000,
  "finalAmount": 180000,
  "message": "Promotion code is valid"
}
```

**Error Response:**
```json
{
  "valid": false,
  "message": "Promotion code has expired"
}
```

#### 5. Create Promotion
```http
POST /v1/promotions
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "code": "NEWYEAR2025",
  "name": "New Year Special",
  "description": "Special discount for new year",
  "type": "PERCENTAGE",
  "value": 15,
  "minPurchase": 150000,
  "maxDiscount": 100000,
  "validFrom": "2025-01-01T00:00:00Z",
  "validTo": "2025-01-31T23:59:59Z",
  "usageLimit": 500,
  "usagePerUser": 3,
  "applicableFor": ["TICKET"],
  "conditions": {
    "minTickets": 2
  },
  "active": true
}
```

**Response:** Created promotion object

**Validation:**
- Code must be unique
- `validFrom` must be before `validTo`
- Code will be automatically converted to uppercase

#### 6. Update Promotion
```http
PUT /v1/promotions/:id
Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "name": "New Year Super Sale",
  "value": 20,
  "maxDiscount": 150000,
  "active": false
}
```

**Response:** Updated promotion object

**Note:** Cannot change promotion code after creation

#### 7. Delete Promotion
```http
DELETE /v1/promotions/:id
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Promotion deleted successfully"
}
```

**Note:** Cannot delete promotions used in active bookings. Will return error suggesting to deactivate instead.

#### 8. Toggle Active Status
```http
PATCH /v1/promotions/:id/toggle-active
Authorization: Bearer {token}
```

**Response:** Updated promotion object with toggled `active` status

---

## 📝 Data Models

### ConcessionCategory Enum
```typescript
enum ConcessionCategory {
  FOOD = 'FOOD',
  BEVERAGE = 'BEVERAGE',
  COMBO = 'COMBO',
  MERCHANDISE = 'MERCHANDISE'
}
```

### PromotionType Enum
```typescript
enum PromotionType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT'
}
```

---

## 🔒 Authentication

All CREATE, UPDATE, DELETE operations require authentication:
```http
Authorization: Bearer {clerk_jwt_token}
```

GET operations (read-only) are public and do not require authentication.

---

## ⚠️ Business Rules

### Concessions
1. **Duplicate Prevention**: Cannot create concession with same name in same cinema
2. **Active Booking Protection**: Cannot delete concessions used in PENDING or CONFIRMED bookings
3. **Inventory Management**: 
   - Inventory automatically updated when used in bookings
   - `available` automatically set to false when inventory reaches 0
4. **Cinema Scoping**: Concessions can be cinema-specific or global (no cinemaId)

### Promotions
1. **Unique Codes**: Promotion codes must be unique across all promotions
2. **Code Format**: Codes automatically converted to uppercase
3. **Date Validation**: `validFrom` must be before `validTo`
4. **Usage Limits**: 
   - System tracks `currentUsage` against `usageLimit`
   - Can set per-user limits with `usagePerUser`
5. **Active Booking Protection**: Cannot delete promotions used in PENDING or CONFIRMED bookings
6. **Discount Calculation**:
   - **PERCENTAGE**: `(amount * value) / 100` capped at `maxDiscount`
   - **FIXED_AMOUNT**: Direct deduction of `value`

---

## 🧪 Example Usage

### Create a Combo Deal
```bash
curl -X POST http://localhost:3000/v1/concessions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Movie Night Combo",
    "category": "COMBO",
    "price": 120000,
    "description": "2 Large Popcorn + 2 Large Drinks",
    "available": true,
    "inventory": 50
  }'
```

### Create Holiday Promotion
```bash
curl -X POST http://localhost:3000/v1/promotions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "HOLIDAY2024",
    "name": "Holiday Special",
    "type": "PERCENTAGE",
    "value": 20,
    "validFrom": "2024-12-20T00:00:00Z",
    "validTo": "2024-12-31T23:59:59Z",
    "minPurchase": 200000,
    "maxDiscount": 100000,
    "usageLimit": 1000,
    "active": true
  }'
```

### Validate Promotion Before Booking
```bash
curl -X POST http://localhost:3000/v1/promotions/validate/HOLIDAY2024 \
  -H "Content-Type: application/json" \
  -d '{
    "bookingAmount": 300000,
    "userId": "user123"
  }'
```

### Update Concession Inventory (Stock Replenishment)
```bash
curl -X PATCH http://localhost:3000/v1/concessions/conc123/inventory \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 100
  }'
```

---

## 🔍 Error Handling

### Common Error Responses

**404 Not Found:**
```json
{
  "statusCode": 404,
  "message": "Concession not found"
}
```

**400 Bad Request:**
```json
{
  "statusCode": 400,
  "message": "Promotion code already exists"
}
```

**400 Validation Error:**
```json
{
  "statusCode": 400,
  "message": "Cannot delete concession that is used in active bookings. Consider marking it as unavailable instead."
}
```

**401 Unauthorized:**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## 📊 Message Patterns (Internal Service Communication)

### Concession Service
```typescript
ConcessionMessage = {
  FIND_ALL: 'concession.findAll',
  FIND_ONE: 'concession.findOne',
  CREATE: 'concession.create',
  UPDATE: 'concession.update',
  DELETE: 'concession.delete',
  UPDATE_INVENTORY: 'concession.updateInventory',
}
```

### Promotion Service
```typescript
PromotionMessage = {
  FIND_ALL: 'promotion.findAll',
  FIND_ONE: 'promotion.findOne',
  FIND_BY_CODE: 'promotion.findByCode',
  VALIDATE: 'promotion.validate',
  CREATE: 'promotion.create',
  UPDATE: 'promotion.update',
  DELETE: 'promotion.delete',
  TOGGLE_ACTIVE: 'promotion.toggleActive',
}
```

---

## 🎯 Integration Notes

### Booking Flow Integration
1. **User selects concessions** → Call `GET /v1/concessions?available=true`
2. **User applies promo code** → Call `POST /v1/promotions/validate/:code`
3. **Create booking** → Inventory automatically decremented
4. **Cancel booking** → Inventory automatically restored

### Admin Dashboard Integration
1. **Manage Concessions** → CRUD operations with auth
2. **Track Inventory** → Use `PATCH /v1/concessions/:id/inventory`
3. **Manage Promotions** → CRUD operations with usage tracking
4. **Monitor Performance** → Check `currentUsage` in promotion data

# Booking Summary Feature Usage Guide

## Overview

The booking summary feature transforms existing booking data into a detailed, grouped summary with complete pricing breakdown. It uses the `BookingCalculationDto` format to display:

- **Movie & Cinema Information**: Title, poster, cinema name, hall, showtime details
- **Grouped Tickets**: Tickets organized by type (ADULT, CHILD, STUDENT, etc.) with seat details
- **Concessions**: Food and beverage items with quantities and prices
- **Price Breakdown**: Subtotals, discounts, taxes, and final amount
- **Loyalty Points**: Points used and earned

## API Endpoints

### Get Booking Summary

**Endpoint**: `GET /v1/bookings/:id/summary`

**Headers**:
```
Authorization: Bearer {token}
```

**Response**: `BookingCalculationDto`

```json
{
  "movie": {
    "id": "movie123",
    "title": "Inception",
    "posterUrl": "https://...",
    "duration": 148,
    "rating": "PG-13"
  },
  "cinema": {
    "id": "cinema456",
    "name": "CGV Vincom",
    "address": "72 Le Thanh Ton, District 1, HCMC",
    "hallName": "Hall 3"
  },
  "showtime": {
    "id": "showtime789",
    "startTime": "2024-11-15T19:00:00Z",
    "endTime": "2024-11-15T21:28:00Z",
    "format": "2D",
    "language": "Vietnamese"
  },
  "ticketGroups": [
    {
      "ticketType": "ADULT",
      "quantity": 2,
      "pricePerTicket": 100000,
      "subtotal": 200000,
      "seats": [
        {
          "seatId": "A1",
          "row": "A",
          "number": 1,
          "seatType": "STANDARD"
        },
        {
          "seatId": "A2",
          "row": "A",
          "number": 2,
          "seatType": "STANDARD"
        }
      ]
    },
    {
      "ticketType": "CHILD",
      "quantity": 1,
      "pricePerTicket": 70000,
      "subtotal": 70000,
      "seats": [
        {
          "seatId": "A3",
          "row": "A",
          "number": 3,
          "seatType": "STANDARD"
        }
      ]
    }
  ],
  "concessions": [
    {
      "concessionId": "conc1",
      "name": "Popcorn Large",
      "quantity": 2,
      "unitPrice": 50000,
      "totalPrice": 100000
    },
    {
      "concessionId": "conc2",
      "name": "Coca Cola",
      "quantity": 2,
      "unitPrice": 30000,
      "totalPrice": 60000
    }
  ],
  "pricing": {
    "ticketsSubtotal": 270000,
    "concessionsSubtotal": 160000,
    "subtotal": 430000,
    "tax": {
      "vatRate": 10,
      "vatAmount": 38700
    },
    "promotionDiscount": {
      "code": "SUMMER2024",
      "description": "Promotion code: SUMMER2024",
      "discountAmount": 43000
    },
    "loyaltyPointsDiscount": {
      "pointsUsed": 5000,
      "discountAmount": 5000
    },
    "totalDiscount": 48000,
    "totalBeforeTax": 382000,
    "finalAmount": 420700
  },
  "loyaltyPoints": {
    "used": 5000,
    "willEarn": 420,
    "currentBalance": 15000,
    "newBalance": 10420
  },
  "bookingCode": "BK20241115001",
  "expiresAt": "2024-11-15T19:15:00Z"
}
```

## Frontend Implementation Example

### React/Next.js Component

```typescript
'use client';

import { useState, useEffect } from 'react';
import { BookingCalculationDto } from '@movie-hub/shared-types';
import { Card, CardContent, CardHeader, CardTitle } from '@movie-hub/shacdn-ui';

export function BookingSummaryPage({ params }: { params: { id: string } }) {
  const [summary, setSummary] = useState<BookingCalculationDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingSummary();
  }, [params.id]);

  const fetchBookingSummary = async () => {
    try {
      const response = await fetch(`/api/v1/bookings/${params.id}/summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSummary(data);
      }
    } catch (error) {
      console.error('Failed to fetch booking summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!summary) return <div>Booking not found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Booking Summary</h1>
      
      <div className="grid gap-6">
        {/* Movie & Cinema Info */}
        <Card>
          <CardHeader>
            <CardTitle>{summary.movie.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg font-semibold">{summary.cinema.name}</p>
              <p className="text-gray-600">{summary.cinema.address}</p>
              <p className="text-gray-600">{summary.cinema.hallName}</p>
              <p className="text-gray-700">
                {new Date(summary.showtime.startTime).toLocaleString('vi-VN')}
              </p>
              <p className="text-sm text-gray-500">
                {summary.showtime.format} | {summary.showtime.language} | {summary.movie.duration} mins
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary.ticketGroups.map((group, index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className="font-semibold">
                        {group.quantity}x {group.ticketType}
                      </span>
                      <span className="text-gray-500 ml-2">
                        @ {group.pricePerTicket.toLocaleString()}đ
                      </span>
                    </div>
                    <span className="font-semibold">
                      {group.subtotal.toLocaleString()}đ
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Seats: {group.seats.map(s => `${s.row}${s.number}`).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Concessions */}
        {summary.concessions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Concessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {summary.concessions.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <span className="font-medium">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-gray-500 ml-2">
                        @ {item.unitPrice.toLocaleString()}đ
                      </span>
                    </div>
                    <span className="font-semibold">
                      {item.totalPrice.toLocaleString()}đ
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Price Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Tickets Subtotal:</span>
                <span>{summary.pricing.ticketsSubtotal.toLocaleString()}đ</span>
              </div>
              
              {summary.pricing.concessionsSubtotal > 0 && (
                <div className="flex justify-between">
                  <span>Concessions Subtotal:</span>
                  <span>{summary.pricing.concessionsSubtotal.toLocaleString()}đ</span>
                </div>
              )}

              <div className="flex justify-between font-medium border-t pt-2">
                <span>Subtotal:</span>
                <span>{summary.pricing.subtotal.toLocaleString()}đ</span>
              </div>

              {summary.pricing.promotionDiscount && (
                <div className="flex justify-between text-green-600">
                  <span>
                    Promotion ({summary.pricing.promotionDiscount.code}):
                  </span>
                  <span>
                    -{summary.pricing.promotionDiscount.discountAmount.toLocaleString()}đ
                  </span>
                </div>
              )}

              {summary.pricing.loyaltyPointsDiscount && (
                <div className="flex justify-between text-green-600">
                  <span>
                    Loyalty Points ({summary.pricing.loyaltyPointsDiscount.pointsUsed} pts):
                  </span>
                  <span>
                    -{summary.pricing.loyaltyPointsDiscount.discountAmount.toLocaleString()}đ
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span>VAT ({summary.pricing.tax.vatRate}%):</span>
                <span>{summary.pricing.tax.vatAmount.toLocaleString()}đ</span>
              </div>

              <div className="flex justify-between text-xl font-bold border-t-2 pt-3">
                <span>Total:</span>
                <span className="text-primary">
                  {summary.pricing.finalAmount.toLocaleString()}đ
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loyalty Points */}
        {summary.loyaltyPoints && (
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Points Used:</span>
                  <span className="font-semibold text-red-600">
                    -{summary.loyaltyPoints.used}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Points Earned:</span>
                  <span className="font-semibold text-green-600">
                    +{summary.loyaltyPoints.willEarn}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>New Balance:</span>
                  <span className="text-primary">
                    {summary.loyaltyPoints.newBalance}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Booking Code */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Booking Code</p>
          <p className="text-2xl font-bold">{summary.bookingCode}</p>
        </div>
      </div>
    </div>
  );
}
```

## Service Integration (Booking Service)

The feature is already implemented in `BookingService`:

```typescript
// Get booking summary
async getBookingSummary(
  bookingId: string,
  userId: string
): Promise<BookingCalculationDto> {
  return this.bookingService.getBookingSummary(bookingId, userId);
}
```

## Key Features

✅ **No Recalculation**: Uses existing booking data  
✅ **Grouped Display**: Tickets organized by type  
✅ **Complete Breakdown**: Shows all pricing components  
✅ **Tax Information**: Displays VAT calculation  
✅ **Discount Details**: Shows promotion and loyalty point discounts  
✅ **Loyalty Points**: Displays used and earned points  
✅ **Movie/Cinema Info**: Enriched with showtime details  

## Use Cases

1. **Booking Confirmation Page**: Show detailed summary after payment
2. **Booking History**: Display past bookings with full details
3. **Email Receipts**: Generate booking receipts
4. **Print Tickets**: Format data for printable tickets
5. **Customer Support**: Quick reference for booking details

## Notes

- The summary automatically groups tickets by type (ADULT, CHILD, STUDENT, etc.)
- All prices are in VND (Vietnamese Dong)
- Tax calculation uses 10% VAT rate
- Loyalty points conversion: 1 point = 1000 VND discount
- Points earned: 1 point per 1000 VND spent (after discounts)

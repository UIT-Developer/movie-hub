-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'EXPIRED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'MOMO', 'ZALOPAY', 'VNPAY', 'BANK_TRANSFER', 'CASH');

-- CreateEnum
CREATE TYPE "public"."TicketStatus" AS ENUM ('VALID', 'USED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."RefundStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."ConcessionCategory" AS ENUM ('FOOD', 'DRINK', 'COMBO', 'MERCHANDISE');

-- CreateEnum
CREATE TYPE "public"."PromotionType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT', 'FREE_ITEM', 'POINTS');

-- CreateEnum
CREATE TYPE "public"."LoyaltyTransactionType" AS ENUM ('EARN', 'REDEEM', 'EXPIRE');

-- CreateEnum
CREATE TYPE "public"."LoyaltyTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateTable
CREATE TABLE "public"."Bookings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "booking_code" VARCHAR(20) NOT NULL,
    "user_id" UUID NOT NULL,
    "showtime_id" UUID NOT NULL,
    "customer_name" VARCHAR(255) NOT NULL,
    "customer_email" VARCHAR(255) NOT NULL,
    "customer_phone" VARCHAR(20),
    "subtotal" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "points_used" INTEGER NOT NULL DEFAULT 0,
    "points_discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "final_amount" DECIMAL(10,2) NOT NULL,
    "promotion_code" VARCHAR(50),
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "payment_status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "expires_at" TIMESTAMP(6),
    "cancelled_at" TIMESTAMP(6),
    "cancellation_reason" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tickets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "booking_id" UUID NOT NULL,
    "seat_id" UUID NOT NULL,
    "ticket_code" VARCHAR(50) NOT NULL,
    "qr_code" TEXT,
    "barcode" VARCHAR(100),
    "ticket_type" VARCHAR(50) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "status" "public"."TicketStatus" NOT NULL DEFAULT 'VALID',
    "used_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "booking_id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "payment_method" "public"."PaymentMethod" NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "transaction_id" VARCHAR(255),
    "provider_transaction_id" VARCHAR(255),
    "payment_url" TEXT,
    "paid_at" TIMESTAMP(6),
    "metadata" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Refunds" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "payment_id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "public"."RefundStatus" NOT NULL DEFAULT 'PENDING',
    "refunded_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Concessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255),
    "description" TEXT,
    "category" "public"."ConcessionCategory" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "image_url" VARCHAR(500),
    "available" BOOLEAN NOT NULL DEFAULT true,
    "inventory" INTEGER,
    "cinema_id" UUID,
    "nutrition_info" JSONB,
    "allergens" TEXT[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Concessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BookingConcessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "booking_id" UUID NOT NULL,
    "concession_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingConcessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Promotions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "type" "public"."PromotionType" NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "min_purchase" DECIMAL(10,2),
    "max_discount" DECIMAL(10,2),
    "valid_from" TIMESTAMP(6) NOT NULL,
    "valid_to" TIMESTAMP(6) NOT NULL,
    "usage_limit" INTEGER,
    "usage_per_user" INTEGER DEFAULT 1,
    "current_usage" INTEGER NOT NULL DEFAULT 0,
    "applicable_for" TEXT[],
    "conditions" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LoyaltyAccounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "current_points" INTEGER NOT NULL DEFAULT 0,
    "tier" "public"."LoyaltyTier" NOT NULL DEFAULT 'BRONZE',
    "total_spent" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoyaltyAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LoyaltyTransactions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "loyalty_account_id" UUID NOT NULL,
    "points" INTEGER NOT NULL,
    "type" "public"."LoyaltyTransactionType" NOT NULL,
    "transaction_id" UUID,
    "description" TEXT,
    "expires_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoyaltyTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_booking_code_key" ON "public"."Bookings"("booking_code");

-- CreateIndex
CREATE INDEX "Bookings_user_id_idx" ON "public"."Bookings"("user_id");

-- CreateIndex
CREATE INDEX "Bookings_showtime_id_idx" ON "public"."Bookings"("showtime_id");

-- CreateIndex
CREATE INDEX "Bookings_status_idx" ON "public"."Bookings"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_ticket_code_key" ON "public"."Tickets"("ticket_code");

-- CreateIndex
CREATE INDEX "Tickets_booking_id_idx" ON "public"."Tickets"("booking_id");

-- CreateIndex
CREATE INDEX "Tickets_seat_id_idx" ON "public"."Tickets"("seat_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_transaction_id_key" ON "public"."Payments"("transaction_id");

-- CreateIndex
CREATE INDEX "Payments_booking_id_idx" ON "public"."Payments"("booking_id");

-- CreateIndex
CREATE INDEX "Payments_status_idx" ON "public"."Payments"("status");

-- CreateIndex
CREATE INDEX "Refunds_payment_id_idx" ON "public"."Refunds"("payment_id");

-- CreateIndex
CREATE INDEX "Concessions_category_idx" ON "public"."Concessions"("category");

-- CreateIndex
CREATE INDEX "Concessions_available_idx" ON "public"."Concessions"("available");

-- CreateIndex
CREATE INDEX "BookingConcessions_booking_id_idx" ON "public"."BookingConcessions"("booking_id");

-- CreateIndex
CREATE INDEX "BookingConcessions_concession_id_idx" ON "public"."BookingConcessions"("concession_id");

-- CreateIndex
CREATE UNIQUE INDEX "Promotions_code_key" ON "public"."Promotions"("code");

-- CreateIndex
CREATE INDEX "Promotions_code_idx" ON "public"."Promotions"("code");

-- CreateIndex
CREATE INDEX "Promotions_active_idx" ON "public"."Promotions"("active");

-- CreateIndex
CREATE UNIQUE INDEX "LoyaltyAccounts_user_id_key" ON "public"."LoyaltyAccounts"("user_id");

-- CreateIndex
CREATE INDEX "LoyaltyAccounts_user_id_idx" ON "public"."LoyaltyAccounts"("user_id");

-- CreateIndex
CREATE INDEX "LoyaltyTransactions_loyalty_account_id_idx" ON "public"."LoyaltyTransactions"("loyalty_account_id");

-- CreateIndex
CREATE INDEX "LoyaltyTransactions_type_idx" ON "public"."LoyaltyTransactions"("type");

-- AddForeignKey
ALTER TABLE "public"."Tickets" ADD CONSTRAINT "Tickets_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."Bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."Bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Refunds" ADD CONSTRAINT "Refunds_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "public"."Payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookingConcessions" ADD CONSTRAINT "BookingConcessions_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."Bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookingConcessions" ADD CONSTRAINT "BookingConcessions_concession_id_fkey" FOREIGN KEY ("concession_id") REFERENCES "public"."Concessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoyaltyTransactions" ADD CONSTRAINT "LoyaltyTransactions_loyalty_account_id_fkey" FOREIGN KEY ("loyalty_account_id") REFERENCES "public"."LoyaltyAccounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "public"."CinemaStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'CLOSED');

-- CreateEnum
CREATE TYPE "public"."HallType" AS ENUM ('STANDARD', 'VIP', 'IMAX', 'FOUR_DX', 'PREMIUM');

-- CreateEnum
CREATE TYPE "public"."HallStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'CLOSED');

-- CreateEnum
CREATE TYPE "public"."LayoutType" AS ENUM ('STANDARD', 'DUAL_AISLE', 'STADIUM');

-- CreateEnum
CREATE TYPE "public"."SeatType" AS ENUM ('STANDARD', 'VIP', 'COUPLE', 'PREMIUM', 'WHEELCHAIR');

-- CreateEnum
CREATE TYPE "public"."SeatStatus" AS ENUM ('ACTIVE', 'BROKEN', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "public"."DayType" AS ENUM ('WEEKDAY', 'WEEKEND', 'HOLIDAY');

-- CreateEnum
CREATE TYPE "public"."TimeSlot" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'LATE_NIGHT');

-- CreateEnum
CREATE TYPE "public"."Format" AS ENUM ('TWO_D', 'THREE_D', 'IMAX', 'FOUR_DX');

-- CreateEnum
CREATE TYPE "public"."TicketType" AS ENUM ('ADULT', 'CHILD', 'STUDENT', 'COUPLE');

-- CreateEnum
CREATE TYPE "public"."ShowtimeStatus" AS ENUM ('SCHEDULED', 'SELLING', 'SOLD_OUT', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."ReservationStatus" AS ENUM ('CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."ReviewStatus" AS ENUM ('ACTIVE', 'HIDDEN', 'DELETED');

-- CreateTable
CREATE TABLE "public"."Cinemas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "district" VARCHAR(100),
    "phone" VARCHAR(20),
    "email" VARCHAR(255),
    "website" VARCHAR(255),
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "description" TEXT,
    "amenities" TEXT[],
    "facilities" JSONB,
    "images" TEXT[],
    "virtual_tour_360_url" VARCHAR(500),
    "rating" DECIMAL(2,1),
    "total_reviews" INTEGER NOT NULL DEFAULT 0,
    "operating_hours" JSONB,
    "social_media" JSONB,
    "status" "public"."CinemaStatus" NOT NULL DEFAULT 'ACTIVE',
    "timezone" VARCHAR(50) NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cinemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Halls" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cinema_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" "public"."HallType" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "rows" INTEGER NOT NULL,
    "screen_type" VARCHAR(50),
    "sound_system" VARCHAR(50),
    "features" TEXT[],
    "layout_type" "public"."LayoutType" NOT NULL DEFAULT 'STANDARD',
    "status" "public"."HallStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Halls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Seats" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hall_id" UUID NOT NULL,
    "row_letter" VARCHAR(2) NOT NULL,
    "seat_number" INTEGER NOT NULL,
    "type" "public"."SeatType" NOT NULL DEFAULT 'STANDARD',
    "status" "public"."SeatStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TicketPricing" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hall_id" UUID NOT NULL,
    "seat_type" "public"."SeatType" NOT NULL,
    "ticket_type" "public"."TicketType" NOT NULL,
    "day_type" "public"."DayType" NOT NULL,
    "time_slot" "public"."TimeSlot" NOT NULL,
    "price" DECIMAL(8,2) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketPricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Showtimes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "movie_id" UUID NOT NULL,
    "cinema_id" UUID NOT NULL,
    "hall_id" UUID NOT NULL,
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6) NOT NULL,
    "day_type" "public"."DayType" NOT NULL DEFAULT 'WEEKDAY',
    "time_slot" "public"."TimeSlot" NOT NULL DEFAULT 'MORNING',
    "format" "public"."Format" NOT NULL,
    "language" VARCHAR(10) NOT NULL,
    "subtitles" TEXT[],
    "available_seats" INTEGER NOT NULL,
    "total_seats" INTEGER NOT NULL,
    "status" "public"."ShowtimeStatus" NOT NULL DEFAULT 'SCHEDULED',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Showtimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SeatReservations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "showtime_id" UUID NOT NULL,
    "seat_id" UUID NOT NULL,
    "user_id" UUID,
    "session_id" VARCHAR(255),
    "status" "public"."ReservationStatus" NOT NULL DEFAULT 'CONFIRMED',
    "booking_id" UUID,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeatReservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CinemaReviews" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cinema_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "aspects" JSONB,
    "verified_visit" BOOLEAN NOT NULL DEFAULT false,
    "status" "public"."ReviewStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CinemaReviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seats_hall_id_row_letter_seat_number_key" ON "public"."Seats"("hall_id", "row_letter", "seat_number");

-- CreateIndex
CREATE UNIQUE INDEX "TicketPricing_hall_id_seat_type_ticket_type_day_type_time_s_key" ON "public"."TicketPricing"("hall_id", "seat_type", "ticket_type", "day_type", "time_slot");

-- CreateIndex
CREATE UNIQUE INDEX "SeatReservations_showtime_id_seat_id_key" ON "public"."SeatReservations"("showtime_id", "seat_id");

-- CreateIndex
CREATE UNIQUE INDEX "CinemaReviews_cinema_id_user_id_key" ON "public"."CinemaReviews"("cinema_id", "user_id");

-- AddForeignKey
ALTER TABLE "public"."Halls" ADD CONSTRAINT "Halls_cinema_id_fkey" FOREIGN KEY ("cinema_id") REFERENCES "public"."Cinemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seats" ADD CONSTRAINT "Seats_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "public"."Halls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TicketPricing" ADD CONSTRAINT "TicketPricing_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "public"."Halls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Showtimes" ADD CONSTRAINT "Showtimes_cinema_id_fkey" FOREIGN KEY ("cinema_id") REFERENCES "public"."Cinemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Showtimes" ADD CONSTRAINT "Showtimes_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "public"."Halls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatReservations" ADD CONSTRAINT "SeatReservations_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "public"."Showtimes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatReservations" ADD CONSTRAINT "SeatReservations_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "public"."Seats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CinemaReviews" ADD CONSTRAINT "CinemaReviews_cinema_id_fkey" FOREIGN KEY ("cinema_id") REFERENCES "public"."Cinemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

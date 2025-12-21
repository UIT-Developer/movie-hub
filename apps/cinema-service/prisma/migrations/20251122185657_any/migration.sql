/*
  Warnings:

  - You are about to drop the column `session_id` on the `SeatReservations` table. All the data in the column will be lost.
  - You are about to drop the column `time_slot` on the `Showtimes` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_type` on the `TicketPricing` table. All the data in the column will be lost.
  - You are about to drop the column `time_slot` on the `TicketPricing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hall_id,seat_type,day_type]` on the table `TicketPricing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `movie_release_id` to the `Showtimes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."TicketPricing_hall_id_seat_type_ticket_type_day_type_time_s_key";

-- AlterTable
ALTER TABLE "public"."SeatReservations" DROP COLUMN "session_id";

-- AlterTable
ALTER TABLE "public"."Showtimes" DROP COLUMN "time_slot",
ADD COLUMN     "movie_release_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."TicketPricing" DROP COLUMN "ticket_type",
DROP COLUMN "time_slot";

-- DropEnum
DROP TYPE "public"."TicketType";

-- DropEnum
DROP TYPE "public"."TimeSlot";

-- CreateIndex
CREATE UNIQUE INDEX "TicketPricing_hall_id_seat_type_day_type_key" ON "public"."TicketPricing"("hall_id", "seat_type", "day_type");

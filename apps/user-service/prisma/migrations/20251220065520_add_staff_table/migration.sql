/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."StaffStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."WorkType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT');

-- CreateEnum
CREATE TYPE "public"."StaffPosition" AS ENUM ('CINEMA_MANAGER', 'ASSISTANT_MANAGER', 'TICKET_CLERK', 'CONCESSION_STAFF', 'USHER', 'PROJECTIONIST', 'CLEANER', 'SECURITY');

-- CreateEnum
CREATE TYPE "public"."ShiftType" AS ENUM ('MORNING', 'AFTERNOON', 'NIGHT');

-- DropForeignKey
ALTER TABLE "public"."RolePermission" DROP CONSTRAINT "RolePermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RolePermission" DROP CONSTRAINT "RolePermission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropTable
DROP TABLE "public"."Permission";

-- DropTable
DROP TABLE "public"."Role";

-- DropTable
DROP TABLE "public"."RolePermission";

-- DropTable
DROP TABLE "public"."UserRole";

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_roles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role_permissions" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."staffs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cinemaId" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" "public"."Gender" NOT NULL DEFAULT 'MALE',
    "dob" TIMESTAMP(3) NOT NULL,
    "position" "public"."StaffPosition" NOT NULL DEFAULT 'TICKET_CLERK',
    "status" "public"."StaffStatus" NOT NULL DEFAULT 'ACTIVE',
    "workType" "public"."WorkType" NOT NULL DEFAULT 'FULL_TIME',
    "shiftType" "public"."ShiftType" NOT NULL DEFAULT 'MORNING',
    "salary" DECIMAL(65,30) NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."settings" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "public"."roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "public"."permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_email_key" ON "public"."staffs"("email");

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

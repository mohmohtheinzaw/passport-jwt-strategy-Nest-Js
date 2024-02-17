/*
  Warnings:

  - Added the required column `paymentType` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PAYMENTTYPE" AS ENUM ('COD', 'ONLINE');

-- CreateEnum
CREATE TYPE "ONLINEORDERSTATUS" AS ENUM ('PENDING', 'PROCESSING', 'DELIVERING', 'REJECT', 'USER_REJECT');

-- CreateEnum
CREATE TYPE "OTPSTATUS" AS ENUM ('UNUSED', 'USED');

-- AlterTable
ALTER TABLE "author" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "paymentType" "PAYMENTTYPE" NOT NULL;

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp" (
    "id" VARCHAR(255) NOT NULL,
    "phone" TEXT,
    "code" TEXT,
    "otpStatus" "OTPSTATUS" NOT NULL DEFAULT 'UNUSED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otp_phone_key" ON "otp"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "otp_code_key" ON "otp"("code");

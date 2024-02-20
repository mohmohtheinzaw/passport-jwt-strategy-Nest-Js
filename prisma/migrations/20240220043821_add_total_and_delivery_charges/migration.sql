/*
  Warnings:

  - You are about to drop the column `bookId` on the `order` table. All the data in the column will be lost.
  - Added the required column `delveryCharges` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_bookId_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "bookId",
ADD COLUMN     "delveryCharges" INTEGER NOT NULL,
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orderProduct" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

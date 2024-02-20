/*
  Warnings:

  - Added the required column `orderId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `orderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "orderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orderProduct" ADD COLUMN     "quantity" INTEGER NOT NULL;

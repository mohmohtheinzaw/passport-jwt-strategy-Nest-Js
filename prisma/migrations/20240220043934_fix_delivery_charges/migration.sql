/*
  Warnings:

  - You are about to drop the column `delveryCharges` on the `order` table. All the data in the column will be lost.
  - Added the required column `deliveryCharges` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "delveryCharges",
ADD COLUMN     "deliveryCharges" INTEGER NOT NULL;

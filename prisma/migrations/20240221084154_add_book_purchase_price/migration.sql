-- CreateEnum
CREATE TYPE "DISCOUNTTYPE" AS ENUM ('PERCENTAGE', 'AMOUNT');

-- AlterTable
ALTER TABLE "book" ADD COLUMN     "purchasePrice" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "periodDiscount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "periodDiscount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periodDiscountProduct" (
    "id" TEXT NOT NULL,
    "periodDiscountId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "discountType" "DISCOUNTTYPE" NOT NULL DEFAULT 'PERCENTAGE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "periodDiscountProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "periodDiscountProduct" ADD CONSTRAINT "periodDiscountProduct_periodDiscountId_fkey" FOREIGN KEY ("periodDiscountId") REFERENCES "periodDiscount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "periodDiscountProduct" ADD CONSTRAINT "periodDiscountProduct_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterEnum
ALTER TYPE "ONLINEORDERSTATUS" ADD VALUE 'APPROVED';

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "status" "ONLINEORDERSTATUS" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "paymentType" SET DEFAULT 'COD';

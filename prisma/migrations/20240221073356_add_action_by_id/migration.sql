-- AlterTable
ALTER TABLE "order" ADD COLUMN     "actionById" TEXT;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_actionById_fkey" FOREIGN KEY ("actionById") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

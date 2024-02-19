/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `endUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "endUser_phone_key" ON "endUser"("phone");

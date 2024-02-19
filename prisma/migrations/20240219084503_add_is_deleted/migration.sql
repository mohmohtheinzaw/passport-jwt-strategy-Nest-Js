/*
  Warnings:

  - Added the required column `isDeleted` to the `endUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "endUser" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL;

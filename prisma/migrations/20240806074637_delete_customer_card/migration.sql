/*
  Warnings:

  - You are about to drop the `CustomerCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN "customer_id" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CustomerCard";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE INDEX "Card_customer_id_idx" ON "Card"("customer_id");

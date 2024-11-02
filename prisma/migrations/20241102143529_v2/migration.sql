/*
  Warnings:

  - You are about to drop the column `sell_date` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `period_in_month` on the `Offer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_date` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Invoice_customer_id_amount_invoice_date_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "card_number" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "price_before_vat" INTEGER NOT NULL DEFAULT 0,
    "price_after_vat" INTEGER NOT NULL DEFAULT 0,
    "company_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "card_type" TEXT NOT NULL,
    "offer_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Card" ("card_number", "card_type", "comment", "company_id", "created_at", "customer_id", "id", "offer_id", "price_after_vat", "price_before_vat", "start_date", "updated_at") SELECT "card_number", "card_type", "comment", "company_id", "created_at", "customer_id", "id", "offer_id", "price_after_vat", "price_before_vat", "start_date", "updated_at" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_card_number_key" ON "Card"("card_number");
CREATE INDEX "Card_card_number_idx" ON "Card"("card_number");
CREATE INDEX "Card_company_id_idx" ON "Card"("company_id");
CREATE INDEX "Card_offer_id_idx" ON "Card"("offer_id");
CREATE INDEX "Card_customer_id_idx" ON "Card"("customer_id");
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "national_id" TEXT,
    "address" TEXT,
    "grand_name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Customer" ("address", "comment", "created_at", "grand_name", "id", "name", "national_id", "updated_at") SELECT "address", "comment", "created_at", "grand_name", "id", "name", "national_id", "updated_at" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_national_id_key" ON "Customer"("national_id");
CREATE INDEX "Customer_name_national_id_idx" ON "Customer"("name", "national_id");
CREATE TABLE "new_Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "end_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Offer" ("comment", "created_at", "id", "name", "percentage", "updated_at") SELECT "comment", "created_at", "id", "name", "percentage", "updated_at" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
CREATE UNIQUE INDEX "Offer_name_key" ON "Offer"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

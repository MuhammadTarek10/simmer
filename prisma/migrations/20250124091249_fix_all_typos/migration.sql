/*
  Warnings:

  - You are about to drop the column `commnet` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `commnet` on the `ExtraInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `commnet` on the `Invoice` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "national_id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "grand_name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Customer" ("created_at", "firstname", "fullname", "grand_name", "id", "national_id", "updated_at") SELECT "created_at", "firstname", "fullname", "grand_name", "id", "national_id", "updated_at" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_national_id_key" ON "Customer"("national_id");
CREATE TABLE "new_ExtraInvoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL,
    "pay_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT,
    "customer_id" TEXT
);
INSERT INTO "new_ExtraInvoice" ("amount", "created_at", "customer_id", "id", "pay_date", "updated_at") SELECT "amount", "created_at", "customer_id", "id", "pay_date", "updated_at" FROM "ExtraInvoice";
DROP TABLE "ExtraInvoice";
ALTER TABLE "new_ExtraInvoice" RENAME TO "ExtraInvoice";
CREATE INDEX "ExtraInvoice_customer_id_idx" ON "ExtraInvoice"("customer_id");
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL,
    "pay_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT,
    "customer_id" TEXT,
    "card_id" TEXT
);
INSERT INTO "new_Invoice" ("amount", "card_id", "created_at", "customer_id", "id", "pay_date", "updated_at") SELECT "amount", "card_id", "created_at", "customer_id", "id", "pay_date", "updated_at" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE INDEX "Invoice_customer_id_idx" ON "Invoice"("customer_id");
CREATE INDEX "Invoice_card_id_idx" ON "Invoice"("card_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

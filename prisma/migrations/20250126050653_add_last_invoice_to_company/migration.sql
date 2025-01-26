/*
  Warnings:

  - You are about to drop the column `last_invoiced` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ExtraInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN "last_invoice_date" DATETIME;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "price_before_vat" DECIMAL NOT NULL DEFAULT 0,
    "price_after_vat" DECIMAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT,
    "company_id" TEXT NOT NULL,
    "customer_id" TEXT
);
INSERT INTO "new_Card" ("comment", "company_id", "created_at", "customer_id", "id", "number", "price_after_vat", "price_before_vat", "updated_at") SELECT "comment", "company_id", "created_at", "customer_id", "id", "number", "price_after_vat", "price_before_vat", "updated_at" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_number_key" ON "Card"("number");
CREATE INDEX "Card_company_id_idx" ON "Card"("company_id");
CREATE INDEX "Card_customer_id_idx" ON "Card"("customer_id");
CREATE INDEX "Card_number_idx" ON "Card"("number");
CREATE TABLE "new_ExtraInvoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL DEFAULT 0,
    "invoice_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "customer_id" TEXT NOT NULL
);
INSERT INTO "new_ExtraInvoice" ("amount", "comment", "created_at", "customer_id", "id", "invoice_date", "updated_at") SELECT "amount", "comment", "created_at", "customer_id", "id", "invoice_date", "updated_at" FROM "ExtraInvoice";
DROP TABLE "ExtraInvoice";
ALTER TABLE "new_ExtraInvoice" RENAME TO "ExtraInvoice";
CREATE INDEX "ExtraInvoice_customer_id_idx" ON "ExtraInvoice"("customer_id");
CREATE INDEX "ExtraInvoice_invoice_date_idx" ON "ExtraInvoice"("invoice_date");
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL DEFAULT 0,
    "invoice_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "customer_id" TEXT,
    "card_id" TEXT
);
INSERT INTO "new_Invoice" ("amount", "card_id", "comment", "created_at", "customer_id", "id", "invoice_date", "updated_at") SELECT "amount", "card_id", "comment", "created_at", "customer_id", "id", "invoice_date", "updated_at" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE INDEX "Invoice_customer_id_idx" ON "Invoice"("customer_id");
CREATE INDEX "Invoice_card_id_idx" ON "Invoice"("card_id");
CREATE INDEX "Invoice_invoice_date_idx" ON "Invoice"("invoice_date");
CREATE UNIQUE INDEX "Invoice_card_id_invoice_date_key" ON "Invoice"("card_id", "invoice_date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

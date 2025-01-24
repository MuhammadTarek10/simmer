/*
  Warnings:

  - You are about to drop the column `pay_date` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `pay_date` on the `ExtraInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `pay_date` on the `Invoice` table. All the data in the column will be lost.
  - Made the column `updated_at` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `invoice_date` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Made the column `updated_at` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `invoice_date` to the `ExtraInvoice` table without a default value. This is not possible if the table is not empty.
  - Made the column `customer_id` on table `ExtraInvoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `ExtraInvoice` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `invoice_date` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Made the column `updated_at` on table `Invoice` required. This step will fail if there are existing NULL values in that column.

*/
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
INSERT INTO "new_Card" ("comment", "company_id", "created_at", "customer_id", "id", "number", "price_after_vat", "price_before_vat", "updated_at") SELECT "comment", "company_id", coalesce("created_at", CURRENT_TIMESTAMP) AS "created_at", "customer_id", "id", "number", "price_after_vat", "price_before_vat", "updated_at" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_number_key" ON "Card"("number");
CREATE INDEX "Card_company_id_idx" ON "Card"("company_id");
CREATE INDEX "Card_customer_id_idx" ON "Card"("customer_id");
CREATE INDEX "Card_number_idx" ON "Card"("number");
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "invoice_date" DATETIME NOT NULL,
    "phone" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Company" ("comment", "created_at", "id", "name", "phone", "updated_at") SELECT "comment", coalesce("created_at", CURRENT_TIMESTAMP) AS "created_at", "id", "name", "phone", "updated_at" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "national_id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "grand_name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Customer" ("comment", "created_at", "fullname", "grand_name", "id", "national_id", "updated_at") SELECT "comment", coalesce("created_at", CURRENT_TIMESTAMP) AS "created_at", "fullname", "grand_name", "id", "national_id", "updated_at" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_national_id_key" ON "Customer"("national_id");
CREATE INDEX "Customer_national_id_idx" ON "Customer"("national_id");
CREATE TABLE "new_ExtraInvoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL DEFAULT 0,
    "invoice_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT,
    "customer_id" TEXT NOT NULL
);
INSERT INTO "new_ExtraInvoice" ("amount", "comment", "created_at", "customer_id", "id", "updated_at") SELECT "amount", "comment", coalesce("created_at", CURRENT_TIMESTAMP) AS "created_at", "customer_id", "id", "updated_at" FROM "ExtraInvoice";
DROP TABLE "ExtraInvoice";
ALTER TABLE "new_ExtraInvoice" RENAME TO "ExtraInvoice";
CREATE INDEX "ExtraInvoice_customer_id_idx" ON "ExtraInvoice"("customer_id");
CREATE INDEX "ExtraInvoice_invoice_date_idx" ON "ExtraInvoice"("invoice_date");
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL DEFAULT 0,
    "invoice_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT,
    "customer_id" TEXT,
    "card_id" TEXT
);
INSERT INTO "new_Invoice" ("amount", "card_id", "comment", "created_at", "customer_id", "id", "updated_at") SELECT "amount", "card_id", "comment", coalesce("created_at", CURRENT_TIMESTAMP) AS "created_at", "customer_id", "id", "updated_at" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE INDEX "Invoice_customer_id_idx" ON "Invoice"("customer_id");
CREATE INDEX "Invoice_card_id_idx" ON "Invoice"("card_id");
CREATE INDEX "Invoice_invoice_date_idx" ON "Invoice"("invoice_date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

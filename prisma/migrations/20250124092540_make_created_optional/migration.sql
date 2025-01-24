-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "price_before_vat" DECIMAL NOT NULL DEFAULT 0,
    "price_after_vat" DECIMAL NOT NULL DEFAULT 0,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
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
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pay_date" DATETIME NOT NULL,
    "phone" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "comment" TEXT
);
INSERT INTO "new_Company" ("comment", "created_at", "id", "name", "pay_date", "phone", "updated_at") SELECT "comment", "created_at", "id", "name", "pay_date", "phone", "updated_at" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "national_id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "grand_name" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "comment" TEXT
);
INSERT INTO "new_Customer" ("comment", "created_at", "firstname", "fullname", "grand_name", "id", "national_id", "updated_at") SELECT "comment", "created_at", "firstname", "fullname", "grand_name", "id", "national_id", "updated_at" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_national_id_key" ON "Customer"("national_id");
CREATE TABLE "new_ExtraInvoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL,
    "pay_date" DATETIME NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "comment" TEXT,
    "customer_id" TEXT
);
INSERT INTO "new_ExtraInvoice" ("amount", "comment", "created_at", "customer_id", "id", "pay_date", "updated_at") SELECT "amount", "comment", "created_at", "customer_id", "id", "pay_date", "updated_at" FROM "ExtraInvoice";
DROP TABLE "ExtraInvoice";
ALTER TABLE "new_ExtraInvoice" RENAME TO "ExtraInvoice";
CREATE INDEX "ExtraInvoice_customer_id_idx" ON "ExtraInvoice"("customer_id");
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL,
    "pay_date" DATETIME NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "comment" TEXT,
    "customer_id" TEXT,
    "card_id" TEXT
);
INSERT INTO "new_Invoice" ("amount", "card_id", "comment", "created_at", "customer_id", "id", "pay_date", "updated_at") SELECT "amount", "card_id", "comment", "created_at", "customer_id", "id", "pay_date", "updated_at" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE INDEX "Invoice_customer_id_idx" ON "Invoice"("customer_id");
CREATE INDEX "Invoice_card_id_idx" ON "Invoice"("card_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

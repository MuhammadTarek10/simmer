-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "invoice_date" TEXT NOT NULL,
    "phone" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "period_in_month" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "card_number" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "price_before_vat" INTEGER NOT NULL DEFAULT 0,
    "price_after_vat" INTEGER NOT NULL DEFAULT 0,
    "sell_date" TEXT,
    "company_id" TEXT NOT NULL,
    "card_type" TEXT NOT NULL,
    "offer_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "national_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "grand_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);

-- CreateTable
CREATE TABLE "CustomerCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT,
    "card_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT,
    "amount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);

-- CreateIndex
CREATE INDEX "Card_card_number_idx" ON "Card"("card_number");

-- CreateIndex
CREATE INDEX "Card_company_id_idx" ON "Card"("company_id");

-- CreateIndex
CREATE INDEX "Card_offer_id_idx" ON "Card"("offer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_national_id_key" ON "Customer"("national_id");

-- CreateIndex
CREATE INDEX "Customer_name_national_id_idx" ON "Customer"("name", "national_id");

-- CreateIndex
CREATE INDEX "CustomerCard_customer_id_idx" ON "CustomerCard"("customer_id");

-- CreateIndex
CREATE INDEX "CustomerCard_card_id_idx" ON "CustomerCard"("card_id");

-- CreateIndex
CREATE INDEX "Invoice_customer_id_idx" ON "Invoice"("customer_id");

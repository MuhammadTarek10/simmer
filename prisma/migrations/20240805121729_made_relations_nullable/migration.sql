-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "card_number" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "sell_date" TEXT,
    "company_id" TEXT,
    "offer_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Card" ("card_number", "comment", "company_id", "created_at", "id", "offer_id", "sell_date", "start_date", "updated_at") SELECT "card_number", "comment", "company_id", "created_at", "id", "offer_id", "sell_date", "start_date", "updated_at" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE INDEX "Card_card_number_idx" ON "Card"("card_number");
CREATE INDEX "Card_company_id_idx" ON "Card"("company_id");
CREATE INDEX "Card_offer_id_idx" ON "Card"("offer_id");
CREATE TABLE "new_CustomerCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT,
    "card_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_CustomerCard" ("card_id", "created_at", "customer_id", "id", "updated_at") SELECT "card_id", "created_at", "customer_id", "id", "updated_at" FROM "CustomerCard";
DROP TABLE "CustomerCard";
ALTER TABLE "new_CustomerCard" RENAME TO "CustomerCard";
CREATE INDEX "CustomerCard_customer_id_idx" ON "CustomerCard"("customer_id");
CREATE INDEX "CustomerCard_card_id_idx" ON "CustomerCard"("card_id");
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT,
    "amount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Invoice" ("amount", "comment", "created_at", "customer_id", "id", "updated_at") SELECT "amount", "comment", "created_at", "customer_id", "id", "updated_at" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE INDEX "Invoice_customer_id_idx" ON "Invoice"("customer_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

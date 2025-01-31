/*
  Warnings:

  - Added the required column `start_date` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "price_before_vat" DECIMAL NOT NULL DEFAULT 0,
    "price_after_vat" DECIMAL NOT NULL DEFAULT 0,
    "start_date" DATETIME NOT NULL,
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

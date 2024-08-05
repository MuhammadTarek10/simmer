/*
  Warnings:

  - Made the column `company_id` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "card_number" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "price_before_vat" INTEGER NOT NULL DEFAULT 0,
    "price_after_vat" INTEGER NOT NULL DEFAULT 0,
    "sell_date" TEXT,
    "company_id" TEXT NOT NULL,
    "offer_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Card" ("card_number", "comment", "company_id", "created_at", "id", "offer_id", "price_after_vat", "price_before_vat", "sell_date", "start_date", "updated_at") SELECT "card_number", "comment", "company_id", "created_at", "id", "offer_id", "price_after_vat", "price_before_vat", "sell_date", "start_date", "updated_at" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE INDEX "Card_card_number_idx" ON "Card"("card_number");
CREATE INDEX "Card_company_id_idx" ON "Card"("company_id");
CREATE INDEX "Card_offer_id_idx" ON "Card"("offer_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

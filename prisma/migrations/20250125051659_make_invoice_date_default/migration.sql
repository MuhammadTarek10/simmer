-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL DEFAULT 0,
    "invoice_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT,
    "type" TEXT NOT NULL DEFAULT 'PENDING',
    "customer_id" TEXT,
    "card_id" TEXT
);
INSERT INTO "new_Invoice" ("amount", "card_id", "comment", "created_at", "customer_id", "id", "invoice_date", "type", "updated_at") SELECT "amount", "card_id", "comment", "created_at", "customer_id", "id", "invoice_date", "type", "updated_at" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE INDEX "Invoice_customer_id_idx" ON "Invoice"("customer_id");
CREATE INDEX "Invoice_card_id_idx" ON "Invoice"("card_id");
CREATE INDEX "Invoice_invoice_date_idx" ON "Invoice"("invoice_date");
CREATE UNIQUE INDEX "Invoice_card_id_invoice_date_key" ON "Invoice"("card_id", "invoice_date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

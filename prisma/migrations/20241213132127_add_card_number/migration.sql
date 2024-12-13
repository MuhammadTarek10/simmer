-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN "card_number" TEXT;

-- CreateIndex
CREATE INDEX "Invoice_card_number_idx" ON "Invoice"("card_number");

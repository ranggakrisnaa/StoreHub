-- CreateTable
CREATE TABLE "product_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_id_key" ON "product_categories"("id");

-- AlterTable
ALTER TABLE "product_categories" DROP COLUMN "name",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL;
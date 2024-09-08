/*
  Warnings:

  - You are about to drop the column `name` on the `product_categories` table. All the data in the column will be lost.
  - You are about to drop the column `product_category_id` on the `products` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `product_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_product_category_id_fkey";

-- AlterTable
ALTER TABLE "product_categories" DROP COLUMN "name",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "product_category_id";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_key" ON "categories"("id");

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

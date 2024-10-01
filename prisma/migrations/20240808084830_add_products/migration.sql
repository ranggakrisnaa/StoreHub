-- CreateEnum
CREATE TYPE "InStock" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "StatusProduct" AS ENUM ('PUBLISHED', 'INACTIVE', 'SCHEDULED');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "store_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "in_stock" "InStock" NOT NULL DEFAULT 'NO',
    "status" "StatusProduct" NOT NULL DEFAULT 'PUBLISHED',
    "publish_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "publish_date",
ADD COLUMN     "publish_Date" DATE;

-- CreateIndex
CREATE UNIQUE INDEX "products_uuid_key" ON "products"("uuid");
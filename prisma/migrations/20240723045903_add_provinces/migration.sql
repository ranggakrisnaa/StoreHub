-- DropIndex
DROP INDEX "addresses_user_id_store_id_idx";

-- CreateTable
CREATE TABLE "provinces" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "provinces_id_key" ON "provinces"("id");

-- CreateIndex
CREATE INDEX "addresses_user_id_store_id_district_id_idx" ON "addresses"("user_id", "store_id", "district_id");

-- CreateIndex
CREATE INDEX "cities_province_id_idx" ON "cities"("province_id");

-- CreateIndex
CREATE INDEX "districts_city_id_idx" ON "districts"("city_id");

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

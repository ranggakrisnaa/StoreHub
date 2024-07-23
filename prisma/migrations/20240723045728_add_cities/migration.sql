-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "province_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_id_key" ON "cities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cities_uuid_key" ON "cities"("uuid");

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "districts" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "city_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "districts_id_key" ON "districts"("id");

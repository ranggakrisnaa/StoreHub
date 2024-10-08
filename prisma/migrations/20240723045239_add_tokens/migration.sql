-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_id_key" ON "tokens"("id");

-- CreateIndex
CREATE INDEX "tokens_user_id_idx" ON "tokens"("user_id");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

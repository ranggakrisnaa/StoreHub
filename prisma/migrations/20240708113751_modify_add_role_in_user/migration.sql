-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER' AFTER `password`;
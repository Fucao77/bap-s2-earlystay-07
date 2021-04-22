/*
  Warnings:

  - You are about to drop the `air_type_price_quantities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `air_type_price_quantities` DROP FOREIGN KEY `air_type_price_quantities_ibfk_1`;

-- DropTable
DROP TABLE `air_type_price_quantities`;

-- CreateTable
CREATE TABLE `air_type_rule_quantities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `air_type_begin_id` VARCHAR(50) NOT NULL,
    `topic` VARCHAR(50) NOT NULL,
    `unit` VARCHAR(50) NOT NULL,
    `max` INTEGER NOT NULL,
    `min` INTEGER NOT NULL,
INDEX `fk_air_type_price_quantities_air_type_begin_id`(`air_type_begin_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `air_type_rule_quantities` ADD FOREIGN KEY (`air_type_begin_id`) REFERENCES `air_type_begins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

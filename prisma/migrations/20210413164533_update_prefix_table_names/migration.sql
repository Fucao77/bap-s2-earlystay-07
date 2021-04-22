/*
  Warnings:

  - You are about to drop the `segment_air_type_begins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `segment_air_type_price_quantities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `segment_air_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `segment_air_type_begins` DROP FOREIGN KEY `segment_air_type_begins_ibfk_1`;

-- DropForeignKey
ALTER TABLE `segment_air_type_price_quantities` DROP FOREIGN KEY `segment_air_type_price_quantities_ibfk_1`;

-- DropForeignKey
ALTER TABLE `segment_air_types` DROP FOREIGN KEY `segment_air_types_ibfk_1`;

-- DropTable
DROP TABLE `segment_air_type_begins`;

-- DropTable
DROP TABLE `segment_air_type_price_quantities`;

-- DropTable
DROP TABLE `segment_air_types`;

-- CreateTable
CREATE TABLE `air_type_begins` (
    `id` VARCHAR(50) NOT NULL,
    `air_type_id` VARCHAR(50) NOT NULL,
    `between_begin` DATE NOT NULL,
    `between_end` DATE NOT NULL,
    `end_moment` VARCHAR(50) NOT NULL,
    `day` INTEGER NOT NULL,
    `price_main_ref` VARCHAR(100) NOT NULL,
    `price_quantity` VARCHAR(50) NOT NULL,
    `price_code_value` VARCHAR(50) NOT NULL,
    `price_code_name` VARCHAR(50) NOT NULL,
    `price_tax_value` INTEGER NOT NULL,
    `price_value` INTEGER NOT NULL,
    `price_original_value` INTEGER,
    `ref` VARCHAR(50) NOT NULL,
    `rule_code_value` VARCHAR(50) NOT NULL,
    `rule_code_name` VARCHAR(50) NOT NULL,
    `rule_at_ref` VARCHAR(50) NOT NULL,
INDEX `fk_air_type_begins_air_type_id`(`air_type_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `air_type_price_quantities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `air_type_begin_id` VARCHAR(50) NOT NULL,
    `topic` VARCHAR(50) NOT NULL,
    `unit` VARCHAR(50) NOT NULL,
    `max` INTEGER NOT NULL,
    `min` INTEGER NOT NULL,
INDEX `fk_air_type_price_quantities_air_type_begin_id`(`air_type_begin_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `air_types` (
    `id` VARCHAR(50) NOT NULL,
    `product_code` VARCHAR(255) NOT NULL,
    `from_ref` VARCHAR(50) NOT NULL,
    `from_default` VARCHAR(50) NOT NULL,
    `to_ref` VARCHAR(50) NOT NULL,
INDEX `fk_air_types_product_code`(`product_code`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `air_type_begins` ADD FOREIGN KEY (`air_type_id`) REFERENCES `air_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `air_type_price_quantities` ADD FOREIGN KEY (`air_type_begin_id`) REFERENCES `air_type_begins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `air_types` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

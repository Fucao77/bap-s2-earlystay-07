/*
  Warnings:

  - You are about to drop the column `code_produit` on the `commercial_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `commercial_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `commentaires` on the `commercial_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `code_produit` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `ville` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the `acheminement_prestations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `commercial_les_plus_paragraph` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `formule_descriptif_paragraph` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `formule_descriptif_paragraph_objets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produits` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `info_id` to the `commercial_reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `commercial_reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `commercial_reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_code` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `destinations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `acheminement_prestations` DROP FOREIGN KEY `acheminement_prestations_ibfk_1`;

-- DropForeignKey
ALTER TABLE `commercial_les_plus_paragraph` DROP FOREIGN KEY `commercial_les_plus_paragraph_ibfk_1`;

-- DropForeignKey
ALTER TABLE `formule_descriptif_paragraph` DROP FOREIGN KEY `formule_descriptif_paragraph_ibfk_1`;

-- DropForeignKey
ALTER TABLE `formule_descriptif_paragraph_objets` DROP FOREIGN KEY `formule_descriptif_paragraph_objets_ibfk_1`;

-- DropForeignKey
ALTER TABLE `commercial_reservations` DROP FOREIGN KEY `commercial_reservations_ibfk_1`;

-- DropForeignKey
ALTER TABLE `destinations` DROP FOREIGN KEY `destinations_ibfk_1`;

-- AlterTable
ALTER TABLE `commercial_reservations` DROP COLUMN `code_produit`,
    DROP COLUMN `numero`,
    DROP COLUMN `commentaires`,
    ADD COLUMN     `info_id` VARCHAR(50) NOT NULL,
    ADD COLUMN     `comment` MEDIUMTEXT NOT NULL,
    ADD COLUMN     `number` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `destinations` DROP COLUMN `code_produit`,
    DROP COLUMN `numero`,
    DROP COLUMN `ville`,
    ADD COLUMN     `product_code` VARCHAR(255) NOT NULL,
    ADD COLUMN     `number` INTEGER NOT NULL,
    ADD COLUMN     `city` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `acheminement_prestations`;

-- DropTable
DROP TABLE `commercial_les_plus_paragraph`;

-- DropTable
DROP TABLE `formule_descriptif_paragraph`;

-- DropTable
DROP TABLE `formule_descriptif_paragraph_objets`;

-- DropTable
DROP TABLE `produits`;

-- CreateTable
CREATE TABLE `commercial_info_plus` (
    `id` VARCHAR(50) NOT NULL,
    `info_id` VARCHAR(50) NOT NULL,
    `number` INTEGER NOT NULL,
INDEX `fk_commercial_info_plus_info_id`(`info_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commercial_info_plus_paragraphs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `info_plus_id` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `text` MEDIUMTEXT NOT NULL,
    `number` INTEGER NOT NULL,
INDEX `fk_commercial_info_plus_paragraphs_info_plus_id`(`info_plus_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commercial_infos` (
    `id` VARCHAR(50) NOT NULL,
    `product_code` VARCHAR(255) NOT NULL,
    `catch_phrase` MEDIUMTEXT NOT NULL,
INDEX `fk_commercial_infos_product_code`(`product_code`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_code` VARCHAR(255) NOT NULL,
    `number` INTEGER NOT NULL,
    `direction` VARCHAR(255) NOT NULL,
    `service_type` VARCHAR(255) NOT NULL,
    `inclusion` VARCHAR(255) NOT NULL,
    `way` VARCHAR(255) NOT NULL,
    `departure_city` VARCHAR(255) NOT NULL,
INDEX `fk_delivery_services_product_code`(`product_code`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `option_description_paragraph_objects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paragraph_id` VARCHAR(50) NOT NULL,
    `number` INTEGER NOT NULL,
    `small` LONGTEXT NOT NULL,
    `big` LONGTEXT NOT NULL,
    `legende` MEDIUMTEXT NOT NULL,
    `type` VARCHAR(50) NOT NULL,
INDEX `fk_option_description_paragraph_objects_paragraph_id`(`paragraph_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `option_description_paragraphs` (
    `id` VARCHAR(50) NOT NULL,
    `description_id` VARCHAR(50) NOT NULL,
    `number` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `text` LONGTEXT NOT NULL,
INDEX `fk_option_description_paragraphs_description_id`(`description_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `option_descriptions` (
    `id` VARCHAR(50) NOT NULL,
    `option_id` VARCHAR(50) NOT NULL,
    `number` INTEGER NOT NULL,
    `small_picto` LONGTEXT NOT NULL,
    `big_picto` LONGTEXT NOT NULL,
INDEX `fk_option_descriptions_option_id`(`option_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `options` (
    `id` VARCHAR(50) NOT NULL,
    `product_code` VARCHAR(255) NOT NULL,
    `accomodation_type` VARCHAR(255) NOT NULL,
    `accomodation_name` VARCHAR(255) NOT NULL,
    `theme_to` VARCHAR(255) NOT NULL,
    `theme_ceto` VARCHAR(255) NOT NULL,
INDEX `fk_options_product_code`(`product_code`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `code` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `sale` VARCHAR(255) NOT NULL,
    `option` VARCHAR(255) NOT NULL,
    `presentable_alone` VARCHAR(255) NOT NULL,
    `with_delivery` VARCHAR(255) NOT NULL,
    `interne_to` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`interne_to`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `segment_air_type_begins` (
    `id` VARCHAR(50) NOT NULL,
    `air_type_id` VARCHAR(50) NOT NULL,
    `between_begin` DATE NOT NULL,
    `between_end` DATE NOT NULL,
    `end_moment` VARCHAR(50) NOT NULL,
INDEX `fk_segment_air_type_begins_air_type_id`(`air_type_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `segment_air_type_price_descriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price_id` VARCHAR(50) NOT NULL,
    `code_value` VARCHAR(50) NOT NULL,
    `code_name` VARCHAR(50) NOT NULL,
    `tax_value` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,
    `ref` VARCHAR(50) NOT NULL,
INDEX `fk_segment_air_type_price_descriptions_price_id`(`price_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `segment_air_type_price_quantities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `air_type_rule_id` VARCHAR(50) NOT NULL,
    `topic` VARCHAR(50) NOT NULL,
    `unit` VARCHAR(50) NOT NULL,
    `max` INTEGER NOT NULL,
    `min` INTEGER NOT NULL,
INDEX `fk_segment_air_type_price_quantities_air_type_rule_id`(`air_type_rule_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `segment_air_type_price_rules` (
    `id` VARCHAR(50) NOT NULL,
    `price_id` VARCHAR(50) NOT NULL,
    `code_value` VARCHAR(50) NOT NULL,
    `code_name` VARCHAR(50) NOT NULL,
    `at_ref` VARCHAR(50) NOT NULL,
INDEX `fk_segment_air_type_price_rules_price_id`(`price_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `segment_air_type_prices` (
    `id` VARCHAR(50) NOT NULL,
    `air_type_begin_id` VARCHAR(50) NOT NULL,
    `price_ref` VARCHAR(100) NOT NULL,
    `quantity` VARCHAR(50) NOT NULL,
INDEX `fk_segment_air_type_prices_air_type_begin_id`(`air_type_begin_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `segment_air_types` (
    `id` VARCHAR(50) NOT NULL,
    `product_code` VARCHAR(255),
    `from_ref` VARCHAR(50) NOT NULL,
    `from_default` VARCHAR(50) NOT NULL,
    `to_ref` VARCHAR(50) NOT NULL,
INDEX `fk_segment_air_types_product_code`(`product_code`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_commercial_reservations_info_id` ON `commercial_reservations`(`info_id`);

-- CreateIndex
CREATE INDEX `fk_destinations_product_code` ON `destinations`(`product_code`);

-- AddForeignKey
ALTER TABLE `commercial_info_plus` ADD FOREIGN KEY (`info_id`) REFERENCES `commercial_infos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_info_plus_paragraphs` ADD FOREIGN KEY (`info_plus_id`) REFERENCES `commercial_info_plus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_infos` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_services` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `option_description_paragraph_objects` ADD FOREIGN KEY (`paragraph_id`) REFERENCES `option_description_paragraphs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `option_description_paragraphs` ADD FOREIGN KEY (`description_id`) REFERENCES `option_descriptions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `option_descriptions` ADD FOREIGN KEY (`option_id`) REFERENCES `options`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `options` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `segment_air_type_begins` ADD FOREIGN KEY (`air_type_id`) REFERENCES `segment_air_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `segment_air_type_price_descriptions` ADD FOREIGN KEY (`price_id`) REFERENCES `segment_air_type_prices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `segment_air_type_price_quantities` ADD FOREIGN KEY (`air_type_rule_id`) REFERENCES `segment_air_type_price_rules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `segment_air_type_price_rules` ADD FOREIGN KEY (`price_id`) REFERENCES `segment_air_type_prices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `segment_air_type_prices` ADD FOREIGN KEY (`air_type_begin_id`) REFERENCES `segment_air_type_begins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `segment_air_types` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_reservations` ADD FOREIGN KEY (`info_id`) REFERENCES `commercial_infos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `destinations` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

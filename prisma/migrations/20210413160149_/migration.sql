-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
UNIQUE INDEX `users.username_unique`(`username`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `miniature` MEDIUMTEXT NOT NULL,
    `author_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE INDEX `articles.slug_unique`(`slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
CREATE TABLE `commercial_reservations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `info_id` VARCHAR(50) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `media` LONGTEXT NOT NULL,
    `comment` MEDIUMTEXT NOT NULL,
    `number` INTEGER NOT NULL,
INDEX `fk_commercial_reservations_info_id`(`info_id`),

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
CREATE TABLE `destinations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_code` VARCHAR(255) NOT NULL,
    `number` INTEGER NOT NULL,
    `city` VARCHAR(255) NOT NULL,
INDEX `fk_destinations_product_code`(`product_code`),

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
    `day` INTEGER NOT NULL,
    `price_ref` VARCHAR(100) NOT NULL,
    `price_quantity` VARCHAR(50) NOT NULL,
    `price_code_value` VARCHAR(50) NOT NULL,
    `price_code_name` VARCHAR(50) NOT NULL,
    `price_tax_value` INTEGER NOT NULL,
    `price_value` INTEGER NOT NULL,
    `ref` VARCHAR(50) NOT NULL,
    `rule_code_value` VARCHAR(50) NOT NULL,
    `rule_code_name` VARCHAR(50) NOT NULL,
    `rule_at_ref` VARCHAR(50) NOT NULL,
INDEX `fk_segment_air_type_begins_air_type_id`(`air_type_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `segment_air_type_price_quantities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `air_type_begin_id` VARCHAR(50) NOT NULL,
    `topic` VARCHAR(50) NOT NULL,
    `unit` VARCHAR(50) NOT NULL,
    `max` INTEGER NOT NULL,
    `min` INTEGER NOT NULL,
INDEX `fk_segment_air_type_price_quantities_air_type_begin_id`(`air_type_begin_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `segment_air_types` (
    `id` VARCHAR(50) NOT NULL,
    `product_code` VARCHAR(255) NOT NULL,
    `from_ref` VARCHAR(50) NOT NULL,
    `from_default` VARCHAR(50) NOT NULL,
    `to_ref` VARCHAR(50) NOT NULL,
INDEX `fk_segment_air_types_product_code`(`product_code`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `articles` ADD FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_info_plus` ADD FOREIGN KEY (`info_id`) REFERENCES `commercial_infos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_info_plus_paragraphs` ADD FOREIGN KEY (`info_plus_id`) REFERENCES `commercial_info_plus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_infos` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_reservations` ADD FOREIGN KEY (`info_id`) REFERENCES `commercial_infos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_services` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `destinations` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE `segment_air_type_price_quantities` ADD FOREIGN KEY (`air_type_begin_id`) REFERENCES `segment_air_type_begins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `segment_air_types` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

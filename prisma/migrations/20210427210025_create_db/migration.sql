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
CREATE TABLE `delivery_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_code` VARCHAR(50) NOT NULL,
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
CREATE TABLE `option_images` (
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
CREATE TABLE `option_description` (
    `id` VARCHAR(50) NOT NULL,
    `product_code` VARCHAR(50) NOT NULL,
    `number` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `text` LONGTEXT NOT NULL,
INDEX `fk_option_product_code`(`product_code`),

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
    `interne_to` VARCHAR(50) NOT NULL,
    `accomodation_type` VARCHAR(50) NOT NULL,
    `accomodation_name` VARCHAR(50) NOT NULL,
    `theme_to` VARCHAR(50) NOT NULL,
    `small_picto` LONGTEXT NOT NULL,
    `big_picto` LONGTEXT NOT NULL,
    `plus_title` VARCHAR(50) NOT NULL,
    `plus_value` VARCHAR(50) NOT NULL,
    `reservation_url` LONGTEXT NOT NULL,
    `reservation_tel` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`interne_to`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `travel_item` (
    `id` VARCHAR(50) NOT NULL,
    `travel_id` VARCHAR(50) NOT NULL,
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
    `price_ref` VARCHAR(50) NOT NULL,
    `rule_code_value` VARCHAR(50) NOT NULL,
    `rule_code_name` VARCHAR(50) NOT NULL,
    `rule_at_ref` VARCHAR(50) NOT NULL,
    `person_quantity` INTEGER NOT NULL,
    `adult_quantity` INTEGER NOT NULL,
    `child_quantity` INTEGER NOT NULL,
INDEX `fk_air_type_begins_air_type_id`(`travel_id`),
INDEX `fk_air_type_price_data_id`(`price_main_ref`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `travels` (
    `id` VARCHAR(50) NOT NULL,
    `product_code` VARCHAR(50) NOT NULL,
    `from_ref` VARCHAR(50) NOT NULL,
    `from_default` VARCHAR(50) NOT NULL,
    `to_ref` VARCHAR(50) NOT NULL,
INDEX `fk_air_types_product_code`(`product_code`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meal_plans` (
    `id` VARCHAR(50) NOT NULL,
    `code_txt` VARCHAR(50),
    `code` VARCHAR(50) NOT NULL,
    `text` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservation_data` (
    `id` VARCHAR(100) NOT NULL,
    `currency` VARCHAR(191),
    `decimals` INTEGER,
    `quantity` VARCHAR(191),
    `role` VARCHAR(191),
    `duration_night` INTEGER NOT NULL,
    `duration_day` INTEGER NOT NULL,
    `quantity_for` VARCHAR(50) NOT NULL,
    `quantity_unit` VARCHAR(50) NOT NULL,
    `meal_plan_ref` VARCHAR(50) NOT NULL,
    `room_ref` VARCHAR(50) NOT NULL,
    `traveller_type` VARCHAR(50) NOT NULL,
    `traveller_quantity` INTEGER NOT NULL,
INDEX `fk_meal_plan_ref`(`meal_plan_ref`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `articles` ADD FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_services` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `option_images` ADD FOREIGN KEY (`paragraph_id`) REFERENCES `option_description`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `option_description` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `travel_item` ADD FOREIGN KEY (`travel_id`) REFERENCES `travels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `travel_item` ADD FOREIGN KEY (`price_main_ref`) REFERENCES `reservation_data`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `travels` ADD FOREIGN KEY (`product_code`) REFERENCES `products`(`interne_to`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservation_data` ADD FOREIGN KEY (`meal_plan_ref`) REFERENCES `meal_plans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

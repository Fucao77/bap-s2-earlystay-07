-- CreateTable
CREATE TABLE `price_data` (
    `id` VARCHAR(100) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `decimals` INTEGER NOT NULL,
    `quantity` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_air_type_price_data_id` ON `air_type_begins`(`price_main_ref`);

-- AddForeignKey
ALTER TABLE `air_type_begins` ADD FOREIGN KEY (`price_main_ref`) REFERENCES `price_data`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

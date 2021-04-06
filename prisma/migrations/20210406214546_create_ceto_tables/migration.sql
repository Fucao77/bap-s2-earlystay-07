-- CreateTable
CREATE TABLE `acheminement_prestations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code_produit` VARCHAR(255) NOT NULL,
    `numero` INTEGER NOT NULL,
    `sens` VARCHAR(255) NOT NULL,
    `type_prestation` VARCHAR(255) NOT NULL,
    `inclusion` VARCHAR(255) NOT NULL,
    `moyen` VARCHAR(255) NOT NULL,
    `ville_depart` VARCHAR(255) NOT NULL,
INDEX `fk_acheminement_prestations_code_produit`(`code_produit`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commercial_les_plus_paragraph` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code_produit` VARCHAR(255) NOT NULL,
    `numero` INTEGER NOT NULL,
    `titre` VARCHAR(255),
    `texte` VARCHAR(255),
INDEX `fk_commercial_les_plus_paragraph_produit`(`code_produit`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commercial_reservations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code_produit` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `numero` INTEGER NOT NULL,
    `media` LONGTEXT NOT NULL,
    `commentaires` MEDIUMTEXT NOT NULL,
INDEX `fk_commercial_reservations_produit`(`code_produit`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destinations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code_produit` VARCHAR(255) NOT NULL,
    `numero` INTEGER NOT NULL,
    `ville` VARCHAR(255) NOT NULL,
INDEX `fk_destinations_code_produit`(`code_produit`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formule_descriptif_paragraph` (
    `id` VARCHAR(255) NOT NULL,
    `code_produit` VARCHAR(255) NOT NULL,
    `numero` INTEGER NOT NULL,
    `titre` MEDIUMTEXT NOT NULL,
    `texte` LONGTEXT NOT NULL,
INDEX `fk_formule_descriptif_paragraph_code_produit`(`code_produit`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formule_descriptif_paragraph_objets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descriptif_id` VARCHAR(255) NOT NULL,
    `petit` LONGTEXT NOT NULL,
    `grand` LONGTEXT NOT NULL,
    `legende` LONGTEXT NOT NULL,
INDEX `fk_formule_descriptif_paragraph_objets_descriptif_id`(`descriptif_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produits` (
    `code` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `vente` VARCHAR(255) NOT NULL,
    `formule` VARCHAR(255) NOT NULL,
    `presentable_seul` VARCHAR(255) NOT NULL,
    `avec_acheminement` VARCHAR(255) NOT NULL,
    `interne_to` VARCHAR(255) NOT NULL,
    `type_hebergement` VARCHAR(255) NOT NULL,
    `nom_hebergement` VARCHAR(255) NOT NULL,
    `theme_to` VARCHAR(255) NOT NULL,
    `theme_ceto` VARCHAR(255) NOT NULL,
    `picto_principal_petit` LONGTEXT NOT NULL,
    `picto_principal_grand` LONGTEXT NOT NULL,
    `accroche` LONGTEXT NOT NULL,
    `les_plus` LONGTEXT NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `acheminement_prestations` ADD FOREIGN KEY (`code_produit`) REFERENCES `produits`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_les_plus_paragraph` ADD FOREIGN KEY (`code_produit`) REFERENCES `produits`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_reservations` ADD FOREIGN KEY (`code_produit`) REFERENCES `produits`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `destinations` ADD FOREIGN KEY (`code_produit`) REFERENCES `produits`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `formule_descriptif_paragraph` ADD FOREIGN KEY (`code_produit`) REFERENCES `produits`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `formule_descriptif_paragraph_objets` ADD FOREIGN KEY (`descriptif_id`) REFERENCES `formule_descriptif_paragraph`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

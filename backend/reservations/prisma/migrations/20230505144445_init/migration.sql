-- CreateTable
CREATE TABLE `Reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_restaurant` INTEGER NOT NULL,
    `dateTime` DATETIME(3) NOT NULL,
    `n_people` INTEGER NOT NULL,

    UNIQUE INDEX `Reservation_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

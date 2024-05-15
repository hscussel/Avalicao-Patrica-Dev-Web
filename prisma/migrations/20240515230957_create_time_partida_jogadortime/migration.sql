-- CreateTable
CREATE TABLE `times` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `ano_de_fundacao` INTEGER NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `tecnico` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `times_tecnico_key`(`tecnico`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partidas` (
    `id` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NOT NULL,
    `placar` VARCHAR(191) NOT NULL,
    `timeDaCasaId` VARCHAR(191) NOT NULL,
    `timeVisitanteId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JogadorTime` (
    `jogadorId` VARCHAR(191) NOT NULL,
    `timeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`jogadorId`, `timeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `partidas` ADD CONSTRAINT `partidas_timeDaCasaId_fkey` FOREIGN KEY (`timeDaCasaId`) REFERENCES `times`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partidas` ADD CONSTRAINT `partidas_timeVisitanteId_fkey` FOREIGN KEY (`timeVisitanteId`) REFERENCES `times`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JogadorTime` ADD CONSTRAINT `JogadorTime_jogadorId_fkey` FOREIGN KEY (`jogadorId`) REFERENCES `jogadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JogadorTime` ADD CONSTRAINT `JogadorTime_timeId_fkey` FOREIGN KEY (`timeId`) REFERENCES `times`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

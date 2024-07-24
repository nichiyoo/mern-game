CREATE TABLE
    IF NOT EXISTS `client` (
        `id` TEXT PRIMARY KEY,
        `name` TEXT,
        `badge` TEXT,
        `step` INTEGER DEFAULT 0,
        `score` INTEGER DEFAULT 0,
        `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `log` (
        `id` INTEGER PRIMARY KEY,
        `clientId` TEXT NOT NULL,
        `query` TEXT,
        `step` INTEGER DEFAULT 0,
        `score` INTEGER DEFAULT 0,
        `type` TEXT,
        `initiator` TEXT,
        `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE CASCADE
    );

CREATE TRIGGER `client_updated_at` AFTER
UPDATE ON `client` BEGIN
UPDATE `client`
SET
    `updatedAt` = CURRENT_TIMESTAMP
WHERE
    `id` = OLD.`id`;

END;
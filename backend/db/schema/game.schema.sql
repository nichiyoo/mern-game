-- SQLite
CREATE TABLE
    IF NOT EXISTS `villages` (
        `id` INTEGER PRIMARY KEY,
        `name` TEXT,
        `chief` INTEGER DEFAULT NULL
    );

CREATE TABLE
    IF NOT EXISTS `inhabitants` (
        `id` INTEGER PRIMARY KEY,
        `name` TEXT,
        `gender` TEXT,
        `job` TEXT,
        `gold` INTEGER,
        `status` TEXT,
        `village` INTEGER DEFAULT NULL
    );

CREATE TABLE
    IF NOT EXISTS `items` (
        `id` INTEGER PRIMARY KEY,
        `name` TEXT,
        `owner` INTEGER DEFAULT NULL
    );

INSERT INTO
    `villages` (`id`, `name`, `chief`)
VALUES
    (1, 'Monkeycity', 1),
    (2, 'Cucumbertown', 6),
    (3, 'Onionville', 13);

INSERT INTO
    `inhabitants` (
        `id`,
        `name`,
        `gender`,
        `job`,
        `gold`,
        `status`,
        `village`
    )
VALUES
    (
        1,
        'Paul Bakerman',
        'm',
        'baker',
        850,
        'friendly',
        1
    ),
    (
        2,
        'Ernest Perry',
        'm',
        'weaponsmith',
        280,
        'friendly',
        3
    ),
    (3, 'Rita Ox', 'f', 'baker', 350, 'friendly', 1),
    (4, 'Carl Ox', 'm', 'merchant', 250, 'friendly', 3),
    (5, 'Dirty Dieter', 'm', 'smith', 650, 'evil', 6),
    (
        6,
        'Gerry Slaughterer',
        'm',
        'butcher',
        4850,
        'evil',
        2
    ),
    (
        7,
        'Peter Slaughterer',
        'm',
        'butcher',
        3250,
        'evil',
        3
    ),
    (
        8,
        'Arthur Tailor',
        'm',
        'pilot',
        490,
        'kidnapped',
        2
    ),
    (
        9,
        'Tiffany Drummer',
        'f',
        'baker',
        550,
        'evil',
        1
    ),
    (
        10,
        'Peter Drummer',
        'm',
        'smith',
        600,
        'friendly',
        3
    ),
    (11, 'Dirty Diane', 'f', 'farmer', 10, 'evil', 12);

INSERT INTO
    `items` (`id`, `name`, `owner`)
VALUES
    (1, 'teapot', NULL),
    (2, 'cane', 5),
    (3, 'hammer', 2),
    (4, 'ring', NULL),
    (5, 'coffee cup', NULL),
    (6, 'bucket', NULL),
    (7, 'rope', 17),
    (8, 'carton', NULL),
    (9, 'lightbulb', NULL);
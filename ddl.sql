
--* Tambah tabel member 
CREATE TABLE membership
(
    email          VARCHAR(100) PRIMARY KEY NOT NULL,
    first_name     VARCHAR(100) NOT NULL,
    last_name      VARCHAR(100) NOT NULL,
    password       VARCHAR(100) NOT NULL,
    balance        INT DEFAULT 0,
    profile_image  TEXT DEFAULT 'https://images.unsplash.com/photo-1709566805345-d5bf39e3c04b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
);




CREATE TABLE informasibanner
(
    banner_name VARCHAR(100) PRIMARY KEY NOT NULL,
    banner_image TEXT,
    description TEXT
);



INSERT INTO informasibanner (banner_name, banner_image, description) VALUES
('Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet');



CREATE TABLE infomasiService
(
    service_code  VARCHAR(100) PRIMARY KEY NOT NULL,
    service_name  VARCHAR(100) NOT NULL,
    service_icon  TEXT,
    service_tariff INT
);



INSERT INTO infomasiService (service_code, service_name, service_icon, service_tariff) VALUES ('PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000),
('PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000),
('VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000),
('QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000),
('ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000);

CREATE TABLE transaction (
    invoice text PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    transaction_type  VARCHAR(100) NOT NULL,
    total_amount INT,
    service_code VARCHAR(100),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES membership(email),
    FOREIGN KEY (service_code) REFERENCES infomasiService(service_code)
);



SELECT * FROM infomasiService

SELECT * FROM transaction

SELECT * FROM membership

SELECT * FROM informasibanner













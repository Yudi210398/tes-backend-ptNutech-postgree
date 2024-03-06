
--* Tambah tabel member 
create table membership
(
        id             SERIAL PRIMARY KEY,
        email          VARCHAR(100) NOT NULL,
        first_name     VARCHAR(100) NOT NULL,
        last_name      VARCHAR(100) NOT NULL,
        password       VARCHAR(100) NOT NULL,
        profile_image  TEXT DEFAULT 'https://images.unsplash.com/photo-1709566805345-d5bf39e3c04b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
); 


--* tambah data member

INSERT INTO membership (email, first_name, last_name, password) VALUES ('sasa@gmail.com', 'sasa', 'safira', 'lewat bcrypt');


-- drop table membership;

-- * ambil data semua member
select * from membership;

-- * delete data member dengan id
delete from membership where id = 5;

-- * temukan data member dengan email
SELECT * FROM membership WHERE email = 'email yg dicari';


-- * update data member dengan email
update membership
set first_name    = 'rico',
    last_name = 'manalu'
where id = 1;



-- ********* Tambah informations


CREATE TABLE informations (
    id SERIAL PRIMARY KEY,
    banner JSONB[],
    service JSONB[]
);


-- * ambil data semua infromation
select * from informations;

CREATE TABLE informations (
    id SERIAL PRIMARY KEY,
    banner JSONB[],
    service JSONB[]
);

drop table informations;

INSERT INTO informations (banner, service)
VALUES 
(
    ARRAY[
        '{"banner_name": "Banner 1", "banner_image": "https://nutech-integrasi.app/dummy.jpg", "description": "Lerem Ipsum Dolor sit amet"}'::JSONB,
        '{"banner_name": "Banner 2", "banner_image": "image2.jpg", "description": "Description 2"}'::JSONB,
        '{"banner_name": "Banner 3", "banner_image": "image3.jpg", "description": "Description 3"}'::JSONB,
        '{"banner_name": "Banner 4", "banner_image": "image4.jpg", "description": "Description 4"}'::JSONB,
        '{"banner_name": "Banner 5", "banner_image": "image5.jpg", "description": "Description 5"}'::JSONB,
        '{"banner_name": "Banner 6", "banner_image": "image6.jpg", "description": "Description 6"}'::JSONB,
        '{"banner_name": "Banner 7", "banner_image": "image7.jpg", "description": "Description 7"}'::JSONB,
        '{"banner_name": "Banner 8", "banner_image": "image8.jpg", "description": "Description 8"}'::JSONB,
        '{"banner_name": "Banner 9", "banner_image": "image9.jpg", "description": "Description 9"}'::JSONB,
        '{"banner_name": "Banner 10", "banner_image": "image10.jpg", "description": "Description 10"}'::JSONB
    ],
    ARRAY[
        '{"service_code": "Code 1", "service_name": "Service 1", "service_icon": "icon1.png", "service_tariff": 100}'::JSONB,
        '{"service_code": "Code 2", "service_name": "Service 2", "service_icon": "icon2.png", "service_tariff": 200}'::JSONB,
        '{"service_code": "Code 3", "service_name": "Service 3", "service_icon": "icon3.png", "service_tariff": 300}'::JSONB,
        '{"service_code": "Code 4", "service_name": "Service 4", "service_icon": "icon4.png", "service_tariff": 400}'::JSONB,
        '{"service_code": "Code 5", "service_name": "Service 5", "service_icon": "icon5.png", "service_tariff": 500}'::JSONB,
        '{"service_code": "Code 6", "service_name": "Service 6", "service_icon": "icon6.png", "service_tariff": 600}'::JSONB,
        '{"service_code": "Code 7", "service_name": "Service 7", "service_icon": "icon7.png", "service_tariff": 700}'::JSONB,
        '{"service_code": "Code 8", "service_name": "Service 8", "service_icon": "icon8.png", "service_tariff": 800}'::JSONB,
        '{"service_code": "Code 9", "service_name": "Service 9", "service_icon": "icon9.png", "service_tariff": 900}'::JSONB,
        '{"service_code": "Code 10", "service_name": "Service 10", "service_icon": "icon10.png", "service_tariff": 1000}'::JSONB
    ]
);



UPDATE informations
SET banner = array_append(
    banner,
    '{"banner_name": "Banner 11", "banner_image": "image11.jpg", "description": "Description 11"}'::JSONB
)
WHERE id = 1;

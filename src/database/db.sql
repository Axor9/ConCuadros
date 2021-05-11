CREATE DATABASE database_concuadros;

USE database_concuadros;

-- Users Table -----

CREATE TABLE users(
    id INT(11) NOT NULL PRIMARY KEY,
    name VARCHAR(16) NOT NULL,
    surname VARCHAR(60) NOT NULL,
    email VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    postal_code INT(10) ,
    phone  INT(10) ,
    address VARCHAR(100) ,
    province VARCHAR(50)
);


ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 1;


CREATE TABLE categories(
    id_categories INT(11) NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE sizes(
    id_sizes INT(11) NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE products (
    id_products INT(11) NOT NULL,
    name VARCHAR(30) NOT NULL,
    price FLOAT(11) NOT NULL,
    description TEXT ,
    id_categories INT NOT NULL,
    id_sizes INT NOT NULL,
    PRIMARY KEY (id_products),
    FOREIGN KEY (id_categories) REFERENCES categories(id_categories),
    FOREIGN KEY (id_sizes) REFERENCES sizes(id_sizes)
);

ALTER TABLE products
    MODIFY id_products INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 1;


CREATE DATABASE concuadros_db;

USE concuadros_db;

-- Users Table -----

CREATE TABLE users(
    id INT(11) NOT NULL PRIMARY KEY,
    name VARCHAR(16) NOT NULL,
    surname VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
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

ALTER TABLE categories
    MODIFY id_categories INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 1;

CREATE TABLE sizes(
    id_sizes INT(11) NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

ALTER TABLE sizes
    MODIFY id_sizes INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 1;

CREATE TABLE products (
    id_products INT(11) NOT NULL,
    name VARCHAR(30) NOT NULL,
    price FLOAT(11) NOT NULL,
    description TEXT ,
    id_categories INT NOT NULL,
    PRIMARY KEY (id_products),
    FOREIGN KEY (id_categories) REFERENCES categories(id_categories),
    FOREIGN KEY (id_sizes) REFERENCES sizes(id_sizes)
);

ALTER TABLE products
    MODIFY id_products INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 1;

CREATE TABLE images (
 id int(11) NOT NULL AUTO_INCREMENT,
 id_products int (11) NOT NULL,
 image VARCHAR(160) NOT NULL,
 created datetime NOT NULL,
 PRIMARY KEY (id),
 FOREIGN KEY (id_products) REFERENCES products(id_products)
);

CREATE TABLE cart (
 id int(11) NOT NULL AUTO_INCREMENT,
 id_products int (11) NOT NULL,
 id_user int(11) NOT NULL,
 id_sizes int(11),
 PRIMARY KEY (id),
 FOREIGN KEY (id_products) REFERENCES products(id_products),
 FOREIGN KEY (id_user) REFERENCES users(id),
 FOREIGN KEY (id_sizes) REFERENCES sizes(id_sizes)
);



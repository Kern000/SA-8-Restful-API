CREATE DATABASE Products;

USE Products;

CREATE TABLE Categories (
    categoryId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
) ENGINE = innodb;

CREATE TABLE Suppliers (
    supplierId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
) ENGINE = innodb;

CREATE TABLE Products (
    productId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    launchDate DATE DEFAULT (CURRENT_DATE),
    srp INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL
) ENGINE = innodb;

ALTER TABLE products ADD COLUMN supplier_id INT UNSIGNED NOT NULL;

ALTER TABLE Products ADD CONSTRAINT fk_products_categories
    FOREIGN KEY (category_id) REFERENCES Categories(categoryId);

ALTER TABLE Products ADD CONSTRAINT fk_products_supppliers
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplierId);



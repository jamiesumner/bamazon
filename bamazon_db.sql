DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    department_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES
("Dress", 1, 49.00, 13),
("Shirt", 1, 39.00, 15),
("Jeans", 1, 79.00, 7),
("Shoes", 2, 79.00, 24),
("Bag", 2, 398.00, 6),
("Sunglasses", 2, 15.00, 12),
("Blanket", 3, 59.00, 8),
("Candle", 3, 12.00, 29),
("Lipstick", 4, 19.00, 15),
("Face mask", 4, 10.00, 12);
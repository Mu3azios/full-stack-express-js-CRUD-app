CREATE DATABASE muaz_crud_app; 

USE muaz_crud_app; 

CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(100) NOT NULL,        
    description VARCHAR(500),         
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0), 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

INSERT INTO items (name, description, price)
VALUES
('item 1', 'this is item 1', 6),
('item 2', 'this is item 2', 7);
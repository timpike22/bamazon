drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
item_id int auto_increment not null,
product_name varchar(45) null,
department_name varchar(45) null,
price decimal(10,2) null,
stock_quantity int null,
primary key (item_id)
);

select * from bamazon.products;

insert into products (product_name, department_name, price, stock_quantity)
values ("nikes", "shoes", 99.99, 150);

select * from bamazon.products;

insert into products (product_name, department_name, price, stock_quantity)
values ("300 lb bench press set", "exercise equipment", 499.99, 29), ("hanes white t's", "men's clothing", 14.99, 101),
("balance board", "exercise equipment", 99.99, 15), ("kids playground set", "toys", 299.99, 49), ("levis denim (men)", "men's clothing", 69.99, 89),
("fender guitar", "musical instruments", 499.99, 57), ("levis demin (women)", "women's clothing", 59.99, 108), ("tama drumset", "musical instruments", 999.99, 10),
("iPhone X", "electronics", 999.99, 1029), ("bose speakers", "electronics", 499.99, 106), ("alligator skin boots", "shoes", 1299.99, 99), ("piano", "musical instruments", 12999.99, 10),
("dish washer", "appliances", 899.99, 11), ("mac book pro", "electronics", 1799.99, 99);


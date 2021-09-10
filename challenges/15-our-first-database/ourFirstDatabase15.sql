# 1
create database ourFirstDatabase15;
use ourFirstDatabase15;

# 2
create table Item(id int auto_increment primary key not null, name varchar(12) not null, category varchar(15) not null, stock int unsigned);

# 3
insert into Item (name, category, stock)
values 
("Noodles", "Flour", 20),
("Milk", "Dairy", 30),
("Cream", "Dairy", 15);

# 4
select * from Item;

# 5
delete from Item where id = "1";

# 6
update Item set stock = 45 where id = "2";

# 7
select * from Item;


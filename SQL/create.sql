
create database manager;
use manager;

create table product
(
    id          int primary key auto_increment,
    price       int,
    name        varchar(100),
    description varchar(225),
    image       text
);




use manager;
create table category(
    id int not null primary key auto_increment,
    name varchar(100) not null

);
alter table product add  idCategory int not null;
alter table product add foreign key (idCategory) references category(id)
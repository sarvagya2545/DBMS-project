-- create database 
create database restaurant;

-- create employee table
create table employees(
    eid int primary key auto_increment not null, 
    name varchar(20), 
    salary int, 
    contact varchar(10), 
    password varchar(100), 
    email varchar(40) unique not null
);

-- insert employees
insert into employees (eid, name, salary, contact, password, email) values (1, 'John', 12000, '9876543210', 'kckldnfcjkdsnfkvjdnfvkjdvkjd', 'A@b.com');
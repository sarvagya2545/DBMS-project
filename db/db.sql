-- create database 
create database restaurant;

-- create employee table
create table employees(
    eid int primary key, 
    name varchar(20), 
    salary int, 
    contact varchar(10), 
    password varchar(100), 
    email varchar(40) unique not null
);
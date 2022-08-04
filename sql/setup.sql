-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

drop table if exists dogs;
drop table if exists snakes;
drop table if exists candy;
drop table if exists lizards;
drop table if exists fish;


create table dogs (
    id bigint generated always as identity primary key,
    name varchar not null,
    age int not null,
    is_cool boolean not null
);

create table snakes (
    id bigint generated always as identity primary key,
    common_name varchar not null,
    avg_lifespan int not null,
    is_danger_noodle boolean not null
);

create table candy (
    id bigint generated always as identity primary key,
    name varchar not null,
    type varchar not null,
    consistency varchar not null
);

create table lizards (
    id bigint generated always as identity primary key,
    name varchar not null,
    avg_size varchar not null,
    handleable boolean not null
);

create table fish (
    id bigint generated always as identity primary key,
    name varchar not null,
    size varchar not null,
    catch_difficulty varchar not null
);

insert into dogs (name, age, is_cool) values
('Sully', 4, true),
('Homer', 12, true),
('Francis', 5, true),
('Phoebe', 2, true);

insert into snakes (common_name, avg_lifespan, is_danger_noodle) values
('Garter Snake', 8, false),
('Timber Rattlesnake', 18, true),
('Ball Python', 26, false),
('King Cobra', 20, true);

insert into candy (name, type, consistency) values
('Jolly Ranchers', 'Sucker', 'Hard'),
('Laffy Taffy', 'Taffy', 'Chewy'),
('Albanese Gummy Bears', 'Gummy', 'Chewy'),
('Cotton Candy', 'Special', 'Dissolvy'),
('Life Savers Gummies', 'Gummy', 'Chewy');

insert into lizards(name, avg_size, handleable) values
('Bearded Dragon','16-24 inches' , true),
('Komodo Dragon', '8.5 feet', false),
('Bengal Monitor', '24-69 inches', false),
('Common Basilisk', '2.5 feet', true);

insert into fish (name, size, catch_difficulty) values 
('Largemouth Bass', '16-24 Inches', 'Easy'),
('Goliath Grouper', '8.2 feet', 'Extreme'),
('Blue marlin', '12+ feet', 'Extreme'),
('Blue Catfish', '1-5 feet', 'Medium');


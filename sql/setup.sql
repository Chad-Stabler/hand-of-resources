-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

drop table if exists dogs;


create table dogs (
    id bigint generated always as identity primary key,
    name varchar not null,
    age int not null,
    is_cool boolean not null
);

insert into dogs (name, age, is_cool) values
('Sully', 4, true),
('Homer', 12, true),
('Francis', 5, true),
('Phoebe', 2, true);

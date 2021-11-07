create table mentors (
mentor_id				SERIAL PRIMARY key,
name	      			varchar(30) not null,
time_in_Glasgow			varchar(10),
address					varchar(120),	
fav_programming_lang	varchar(30) not null
);

create table students (
student_id		SERIAL PRIMARY KEY
name			varchar(30) not null,
address			varchar(120) not null,
grad_from_CYF	boolean
)

create table classes (
class_id 	serial primary key,
mentors		varchar(30) not null,
topic		varchar(30) not null, 
date		date not null,
location	varchar(120) not null
)

create table class (
class_id	serial primary key references classes(class_id)
student		varchar(30) references students(student_id)
)

insert into mentors (name, time_in_glasgow, address, fav_programming_lang) values ('John', 3, 'Some road', 'Javascript');
insert into mentors (name, time_in_glasgow, address, fav_programming_lang) values ('Lara', 2, 'Another road', 'Javascript');
insert into mentors (name, time_in_glasgow, address, fav_programming_lang) values ('Matt', 3, 'False street', 'React');
insert into mentors (name, time_in_glasgow, address, fav_programming_lang) values ('Maria', 7, 'Sesame street', 'Nodejs');
insert into mentors (name, time_in_glasgow, address, fav_programming_lang) values ('Ada', 9, 'Abbey road', 'Angular');

insert into students (name, address, grad_from_CYF) values ('Luke', 'This street', true);
insert into students (name, address, grad_from_CYF) values ('Sue', 'That street', false);
insert into students (name, address, grad_from_CYF) values ('Alex', 'One street', true);
insert into students (name, address, grad_from_CYF) values ('Mohammed', 'The street', false);
insert into students (name, address, grad_from_CYF) values ('Steven', 'Somewhere street', true);
insert into students (name, address, grad_from_CYF) values ('Nadia', 'Big street', false);
insert into students (name, address, grad_from_CYF) values ('Melinda', 'Small street', true);
insert into students (name, address, grad_from_CYF) values ('Marta', 'Pretty street', true);
insert into students (name, address, grad_from_CYF) values ('Paco', 'Ugly street', false);
insert into students (name, address, grad_from_CYF) values ('Tito', 'A street', false);

insert into classes (mentors, topic, date, location) values ('John', 'Javascript', '2021-03-10', 'location1');
insert into classes (mentors, topic, date, location) values ('Lara', 'Nodejs', '2021-03-12', 'location3');
insert into classes (mentors, topic, date, location) values ('Matt', 'Angular', '2021-04-10', 'location2');
insert into classes (mentors, topic, date, location) values ('Matt', 'Javascript', '2021-06-10', 'location4');
insert into classes (mentors, topic, date, location) values ('Ada', 'React', '2021-09-10', 'location5');

select * from mentors 
select * from students

select * from mentors where time_in_glasgow > 5
select * from mentors where fav_programming_lang = 'Javascript'
select * from students where grad_from_CYF = true 
select * from classes where date < '2021-06-01'

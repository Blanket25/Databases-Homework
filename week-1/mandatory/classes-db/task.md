# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.

```sql

create table mentors (
id						   SERIAL PRIMARY key,
name	      			varchar(30) not null,
time_in_Glasgow		int not null,
address					varchar(120),
fav_programming_lang	varchar(30)
);

```

3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).

```sql

insert into mentors (name, time_in_glasgow, address, fav_programming_lang) values ('John', 3, 'Some road', 'Javascript');
insert into mentors (name, time_in_glasgow, address, fav_programming_lang) values ('Lara', 2, 'Another road', 'Javascript');
insert into mentors (name, time_in_glasgow, address, fav_programming_lang) values ('Matt', 3, 'False street', 'React');
insert into mentors (name, time_in_glasgow, address, fav_programming_lang) values ('Maria', 7, 'Sesame street', 'Nodejs');
insert into mentors (name, time_in_glasgow, address, fav_programming_lang) values ('Ada', 9, 'Abbey road', 'Angular');

```

4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.

```sql

create table students (
id				   serial primary key,
name			   varchar(30) not null,
address			varchar(120) not null,
grad_from_CYF	boolean
);

```

5. Insert 10 students in the `students` table.

```sql
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

```

6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).

```sql
select * from mentors
select * from students

```

7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

```sql

create table classes (
id 			serial primary key,
mentor		int references mentors(id),
topic		   varchar(30) not null,
date		   date not null,
location	   varchar(120) not null
);

```

8. Insert a few classes in the `classes` table

```sql
insert into classes (mentor, topic, date, location) values (1, 'Javascript', '2021-03-10', 'location1');
insert into classes (mentor, topic, date, location) values (2, 'Nodejs', '2021-03-12', 'location1');
insert into classes (mentor, topic, date, location) values (3, 'Angular', '2021-04-10', 'location2');
insert into classes (mentor, topic, date, location) values (4, 'Javascript', '2021-06-10', 'location1');
insert into classes (mentor, topic, date, location) values (5, 'React', '2021-09-10', 'location2');

```

9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.

```sql

create table student_classes (
id				   serial primary key,
student_id		int references students(id),
class_id		   int references classes(id)
);

insert into student_classes (student_id, class_id) values (1,2);
insert into student_classes (student_id, class_id) values (2,3);
insert into student_classes (student_id, class_id) values (3,4);
insert into student_classes (student_id, class_id) values (4,5);
insert into student_classes (student_id, class_id) values (5,1);
insert into student_classes (student_id, class_id) values (6,2);
insert into student_classes (student_id, class_id) values (7,3);
insert into student_classes (student_id, class_id) values (8,4);
insert into student_classes (student_id, class_id) values (9,5);
insert into student_classes (student_id, class_id) values (10,1);


```

10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
    - Retrieve all the mentors whose favourite language is Javascript
    - Retrieve all the students who are CYF graduates
    - Retrieve all the classes taught before June this year
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).

```sql
select * from mentors where time_in_glasgow > 5
select * from mentors where fav_programming_lang = 'Javascript'
select * from students where grad_from_CYF = true
select * from classes where date < '2021-06-01'
select student_id from student_classes where class_id = 1 or class_id = 2

```

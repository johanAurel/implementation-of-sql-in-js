DROP DATABASE IF EXISTS harry_potter;
CREATE DATABASE harry_potter;

\c harry_potter;

CREATE TABLE houses (
  house_id SERIAL PRIMARY KEY,
  house_name VARCHAR(40) NOT NULL,
  founder VARCHAR(40),
  animal VARCHAR(40)
);

CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  student_name VARCHAR(40),
  house_id INT,
  FOREIGN KEY (house_id) REFERENCES houses(house_id) ON DELETE CASCADE
);

INSERT INTO houses
  (house_name, founder, animal)
VALUES
  ('Anatfindor', 'Gemma Anatfindor', 'Lion'),
  ('Alexclaw', 'Clive Alexclaw', 'Eagle'),
  ('Shaqlepuff', 'Tina Shaqlepuff', 'Badger');

INSERT INTO students
  (student_name, house_id)
VALUES
  ('Cillian Potter', 1),
  ('Paolina Granger', 1),
  ('Jonno Longbottom', 1),
  ('James Weasley', 1),
  ('Daniel Weasley', 1),
  ('Troy Riddle', 2),
  ('Idris Riddle', 2),
  ('Samuel T Whiddon', 2),
  ('Stephen Chang', 3),
  ('Will Li', 3),
  ('Mohamed Wroxton', 3),
  ('Sam H Diggory', 1),
  ('Sam M Abbott', 2),
  ('Bram Bones', 3),
  ('Tomas Singh', 1),
  ('Matthew Krum', 2);

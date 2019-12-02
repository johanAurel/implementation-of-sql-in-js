DROP DATABASE IF EXISTS harry_potter_test;
CREATE DATABASE harry_potter_test;

\c harry_potter_test;

CREATE TABLE houses (
  house_id SERIAL PRIMARY KEY,
  house_name VARCHAR(40),
  founder VARCHAR(40),
  animal VARCHAR(40)
);

CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  student_name VARCHAR(40),
  house_id INT,
  FOREIGN KEY (house_id) REFERENCES houses(house_id)
);

CREATE TABLE classes (
  class_id SERIAL PRIMARY KEY,
  class_name VARCHAR(40),
  teacher VARCHAR(40)
);

CREATE TABLE spells (
  spell_id SERIAL PRIMARY KEY,
  spell_name VARCHAR(40)
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

INSERT INTO classes
  (class_name, teacher)
VALUES
  ('FUN spells', 'Anat'),
  ('BEND spells', 'Shaq'),
  ('FEND spells', 'Alex'),
  ('Project spells', 'Umbridge'),
  ('Imposter Syndrome Spells', 'Haz');

INSERT INTO spells
  (spell_name)
VALUES
  ('Googleiarmus'),
  ('Stack Overflowtia'),
  ('Ask a Friendio'),
  ('Nc Helpify'),
  ('Array Methoducto'),
  ('Destructurefy'),
  ('Testingdio'),
  ('Reactuendo'),
  ('Promisify'),
  ('Callbackio'),
  ('Nodeiarmus'),
  ('Api-ify');
CREATE DATABASE randomquestions;
-- \x on ---> diplay on

-- If you want to generate a UUID value solely based on 
-- random numbers, you can use the uuid_generate_v4() function.
-- uuid datatype: 
-- UUID stands for Universal Unique Identifier defined 
-- by RFC 4122 and other related standards. 
-- A UUID value is 128-bit quantity generated by an algorithm 
-- that make it unique in the known universe using the same algorithm. 
-- The following shows some examples of the UUID values:
-- 40e6215d-b5c6-4896-987c-f30f3678f608
-- 6ecd8c99-4036-403d-bf84-cf8400f67836
-- 3f333df6-90a4-4fda-8dd3-9485d27cee36

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE question(
question_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
question_text VARCHAR(255) NOT NULL,
answer_text VARCHAR(255) NOT NULL,
is_answered BOOL NOT NULL DEFAULT 'f'

);

INSERT INTO question (question_text,answer_text, is_answered) VALUES ('What is your favourite color?','Blue','f');
INSERT INTO question (question_text,answer_text, is_answered) VALUES ('What is your favourite car?','Benz','f');
INSERT INTO question (question_text,answer_text, is_answered) VALUES ('What is your favourite blood group?','O+','f');
INSERT INTO question (question_text,answer_text, is_answered) VALUES ('How old are you','40','f');
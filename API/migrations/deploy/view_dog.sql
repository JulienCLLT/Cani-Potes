-- Deploy canipotes:view_dog to pg

BEGIN;


CREATE VIEW dogs_with_all_informations AS
SELECT d.id, surname, weight, d.birthday, sterilization, description, 
breed.id AS breed_id, breed.label AS breed_label, 
b.id AS behavior_id, b.label AS behavior_label, b.emoji AS behavior_emoji,
g.id AS gender_id, g.label AS gender_label,
m.id AS owner_id, m.first_name AS owner_fistt_name, m.last_name AS owner_last_name, m.photo AS owner_photo,
array_agg(ph.file_name)
FROM dog AS d
JOIN behavior AS b
	ON d.behavior_id = b.id
JOIN breed 
	ON d.breed_id = breed.id 
JOIN gender AS g
	ON d.gender_id = g.id
JOIN member AS m
	ON d.dog_owner_id = m.id
LEFT JOIN photo AS ph
	ON d.id = ph.dog_id 
GROUP BY d.id, surname, weight, d.birthday, sterilization, description, breed.id, breed.label, b.id, b.label , b.emoji, g.id , g.label, m.id , m.first_name , m.last_name , m.photo;

COMMIT;

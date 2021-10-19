-- Deploy canipotes:funct_insert_user to pg

BEGIN;

CREATE OR REPLACE FUNCTION insert_user (data json) RETURNS int AS $$
INSERT INTO member (
	email,
	first_name, 
	last_name, 
	zip_code, 
	password, 
	birthday,
	photo
) 
VALUES (
	data->>'email',
	data->>'first_name', 
	data->>'last_name', 
	data->>'zip_code', 
    data->>'password',
	(data->>'birthday')::date,
	CASE
		WHEN char_length(data->>'photo')<2 THEN 'avatar.jpg'
		WHEN (data->>'photo')IS NULL  then 'avatar.jpg'
		ELSE data->>'photo'
	END

   )RETURNING id
$$ LANGUAGE SQL STRICT ;

COMMIT;

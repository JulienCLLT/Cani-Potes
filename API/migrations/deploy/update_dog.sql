-- Deploy canipotes:update_dog to pg

BEGIN;


-- check if now() ok
CREATE FUNCTION update_dog(TEXT, TEXT, NUMERIC(4,2), DATE, BOOLEAN, INT, INT, INT, TIMESTAMPTZ) RETURNS void AS $$
    UPDATE dog SET surname=$1, description=$2, weight=$3, birthday=$4, breed_id=$5, gender_id=$6, behavior_id=$7, updated_at=NOW() WHERE id=$8;
$$ LANGUAGE SQL STRICT;

-- a changer
CREATE OR REPLACE FUNCTION update_user(data json) RETURNS void AS $$
	UPDATE "user" SET 
        email=COALESCE(data->>'email', email),
        user_name=COALESCE(data->>'username', username),
        "password"=COALESCE(data->>'password', password),
        updateat=(now())::TIMESTAMPTZ
    WHERE id=(data->>'id')::INT
$$ LANGUAGE SQL STRICT;



COMMIT;

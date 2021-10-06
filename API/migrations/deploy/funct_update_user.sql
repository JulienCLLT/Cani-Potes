-- Deploy canipotes:funct_update_user to pg

BEGIN;

CREATE OR REPLACE FUNCTION update_user(data json) RETURNS void AS $$
	UPDATE member SET 
        email=COALESCE(data->>'email', email),
		first_name=COALESCE(data->>'first_name', first_name),
        last_name=COALESCE(data->>'last_name', last_name),
       	zip_code=COALESCE(data->>'zip_code', zip_code),
		birthday=COALESCE((data->>'birthday')::date, birthday),
        photo=COALESCE(data->>'photo', photo),
        updated_at=(now())
    WHERE id=(data->>'id')::INT
$$ LANGUAGE SQL STRICT;

COMMIT;

-- Deploy canipotes:update_dog to pg

BEGIN;

CREATE OR REPLACE FUNCTION update_dog(data json) RETURNS void AS $$
	UPDATE dog SET 
        surname=COALESCE(data->>'surname', surname),
        description=COALESCE(data->>'description', description),
        weight=COALESCE((data->>'weight')::numeric, weight),
        birthday=COALESCE((data->>'birthday')::date, birthday),
        sterilization=COALESCE((data->>'sterilization')::boolean, sterilization),
        breed_id=COALESCE((data->>'breed_id')::int, breed_id),
        gender_id=COALESCE((data->>'gender_id')::int, gender_id),
        behavior_id=COALESCE((data->>'behavior_id')::int, behavior_id),
        updated_at=(now())
    WHERE id=(data->>'id')::INT
$$ LANGUAGE SQL STRICT;



COMMIT;

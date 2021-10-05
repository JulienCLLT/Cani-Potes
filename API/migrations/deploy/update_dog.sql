-- Deploy canipotes:update_dog to pg

BEGIN;

CREATE OR REPLACE FUNCTION update_dog(data json) RETURNS void AS $$
	UPDATE dog SET 
        surname=COALESCE(data->>'surname', surname),
        description=COALESCE(data->>'description', description),
        --weight=COALESCE(data->>'weight', weight),
        --birthday=COALESCE(data->>'birthday', birthday),
        --sterilization=COALESCE(data->>'sterilization', sterilization),
        --breed_id=COALESCE(data->>'breed_id', breed_id),
        --gender_id=COALESCE(data->>'gender_id', gender_id),
        --behavior_id=COALESCE(data->>'behavior_id', behavior_id),
        updated_at=(now())
    WHERE id=(data->>'id')::INT
$$ LANGUAGE SQL STRICT;



COMMIT;

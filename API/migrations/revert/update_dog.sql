-- Revert canipotes:update_dog from pg

BEGIN;

DROP FUNCTION update_dog(data json);

COMMIT;

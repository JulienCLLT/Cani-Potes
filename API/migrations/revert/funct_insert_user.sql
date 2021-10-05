-- Revert canipotes:funct_insert_user from pg

BEGIN;

DROP FUNCTION insert_user;

COMMIT;

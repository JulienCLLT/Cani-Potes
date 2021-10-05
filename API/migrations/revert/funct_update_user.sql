-- Revert canipotes:funct_update_user from pg

BEGIN;

DROP FUNCTION update_user;

COMMIT;

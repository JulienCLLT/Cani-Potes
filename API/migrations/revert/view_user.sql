-- Revert canipotes:view_user from pg

BEGIN;

DROP VIEW  user_basic_information;

COMMIT;

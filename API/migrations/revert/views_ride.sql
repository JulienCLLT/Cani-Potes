-- Revert canipotes:views_ride from pg

BEGIN;

-- XXX Add DDLs here.
DROP VIEW rides_with_all_informations;

COMMIT;

-- Revert canipotes:view_dog from pg

BEGIN;

-- XXX Add DDLs here.
DROP VIEW dogs_with_all_informations;

COMMIT;

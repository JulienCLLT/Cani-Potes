-- Verify canipotes:view_dog on pg

BEGIN;

-- XXX Add verifications here.

SELECT * FROM dogs_with_all_informations WHERE false;

ROLLBACK;

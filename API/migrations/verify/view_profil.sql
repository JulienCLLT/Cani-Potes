-- Verify canipotes:view_profil on pg

BEGIN;

SELECT * FROM full_profile WHERE false;

ROLLBACK;

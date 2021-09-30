-- Revert canipotes:view_profil from pg

BEGIN;

DROP VIEW full_profile;

COMMIT;

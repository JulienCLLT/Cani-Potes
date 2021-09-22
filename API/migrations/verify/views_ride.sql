-- Verify canipotes:views_ride on pg

BEGIN;


SELECT * FROM rides_with_all_informations WHERE false;

ROLLBACK;

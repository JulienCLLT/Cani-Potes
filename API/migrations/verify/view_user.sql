-- Verify canipotes:view_user on pg

BEGIN;

SELECT * FROM user_basic_information WHERE false;

ROLLBACK;

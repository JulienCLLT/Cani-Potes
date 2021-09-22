-- Verify canipotes:init on pg

BEGIN;

SELECT id FROM breed WHERE false;
SELECT id FROM gender WHERE false;
SELECT id FROM behavior WHERE false;
SELECT id FROM tag WHERE false;
SELECT id FROM member WHERE false;
SELECT id FROM dog WHERE false;
SELECT id FROM photo WHERE false;
SELECT id FROM ride WHERE false;

-- DROP TABLE member_participate_ride, member_write_ride, 


ROLLBACK;

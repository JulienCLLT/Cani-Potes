-- Revert canipotes:init from pg

BEGIN;

DROP TABLE member_participate_ride, member_write_ride, ride, photo, dog, member, tag, behavior, gender, breed;    

COMMIT;

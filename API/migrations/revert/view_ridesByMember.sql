-- Revert canipotes:view_ridesByMember from pg

BEGIN;

DROP VIEW rides_by_member ;
COMMIT;

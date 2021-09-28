-- Deploy canipotes:view_user to pg

BEGIN;

CREATE view user_basic_information AS
SELECT  member.id,
		member.first_name,
		member.zip_code,
		array((SELECT ride.id FROM ride WHERE member.id = ride.host_id
				UNION
				SELECT member_participate_ride.ride_id FROM member_participate_ride WHERE member.id = member_participate_ride.member_id
				)) as ride_id
FROM member
GROUP BYy member.id

COMMIT;

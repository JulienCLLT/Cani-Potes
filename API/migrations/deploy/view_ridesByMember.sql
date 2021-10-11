-- Deploy canipotes:view_ridesByMember to pg

BEGIN;

CREATE VIEW rides_by_member AS

SELECT 
    ride.id, 
    host_id, 
    title,
    to_char(starting_time + interval '2 hours', 'TMDay DD TMMonth YYYY "à" HH "h" MI') AS starting_time,
    max_number_dogs,
    ARRAY(
        SELECT d.id
        FROM dog AS d
        LEFT JOIN member_participate_ride AS mpr 
            ON mpr.ride_id = ride.id
        WHERE d.dog_owner_id = ride.host_id OR d.dog_owner_id = mpr.member_id 
        GROUP BY d.id
    ) AS dogs_enrolled
FROM ride;

COMMIT;

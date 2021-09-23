-- Deploy canipotes:views_ride to pg

BEGIN;

CREATE VIEW rides_with_all_informations AS
SELECT 
    ride.id AS ride_id, title, ride.description, start_coordinate, end_coordinate, starting_time, duration, max_number_dogs, 
    tag.label AS tag_label, 
    host.id AS host_id, host.first_name AS host_first_name,   
    array_agg(DISTINCT
        jsonb_build_object(				
            'sender_id', sender.id,
            'sender_first_name', sender.first_name,
            'sender_last_name', sender.last_name,
            'sender_photo', sender.photo,       
            'message', message.message,                    
            'sent', message.created_at
        )) AS messages,
    array_agg(DISTINCT
        jsonb_build_object(
            'participant_id', participant.id,
            'participant_first_name', participant.first_name,
            'participant_last_name', participant.last_name,
            'participant_photo', participant.photo,
            'dogs',  (SELECT array_agg(DISTINCT                            
                            jsonb_build_object(
                                'dog_id', dog.id,
                                'dog_surname', dog.surname,
								'dog_photo_id', photo.id,
								'dog_photo', photo.file_name 
                            ))  
                        FROM dog 
                        JOIN photo ON dog.id = photo.dog_id
                        WHERE dog.dog_owner_id = participant.id)
        )) AS participants
FROM ride
JOIN tag ON tag.id = tag_id   
JOIN member AS host ON host.id = host_id  
LEFT JOIN member_write_ride AS message ON message.ride_id = ride.id 
LEFT JOIN member AS sender ON sender.id = message.member_id  
LEFT JOIN member_participate_ride ON member_participate_ride.ride_id = ride.id AND member_participate_ride.member_id = sender.id          
LEFT JOIN member AS participant ON participant.id = member_participate_ride.member_id OR participant.id = host.id
LEFT JOIN dog ON dog.dog_owner_id = member_participate_ride.member_id
GROUP BY ride.id, tag.label, host.id, host.first_name; 

COMMIT;



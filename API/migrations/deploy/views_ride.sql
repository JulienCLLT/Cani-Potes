-- Deploy canipotes:views_ride to pg

BEGIN;

CREATE VIEW rides_with_all_informations AS
SELECT 
    ride.id AS ride_id, title, ride.description, start_coordinate, end_coordinate, 
    to_char(starting_time, 'TMDay DD TMMonth YYYY "à" HH "h" MI') AS starting_time, 
    duration, max_number_dogs, 
    tag.label AS tag_label, 
    host.id AS host_id, host.first_name AS host_first_name,   
    array_agg(DISTINCT
        jsonb_build_object(				
            'sender_id', sender.id,
            'sender_first_name', sender.first_name,
            'sender_photo', sender.photo,
            'message_id', message.id,       
            'message', message.message,                    
            'sent', to_char(message.created_at, 'TMDay DD TMMonth YYYY "à" HH "h" MI')
        )) FILTER (WHERE sender.id IS NOT NULL) AS messages,
    array_agg(DISTINCT
        jsonb_build_object(
            'participant_id', participant.id,
            'participant_first_name', participant.first_name,
            'participant_photo', participant.photo,
            'dogs',  (SELECT array_agg(DISTINCT                            
                            jsonb_build_object(
                                'dog_id', dog.id,
                                'dog_photo', (SELECT ARRAY_AGG(
                                                        jsonb_build_object(
                                                        'photo_id', photo.id,
                                                        'photo_url', photo.file_name
                                                        )
                                                    ) 
                                            FROM photo WHERE photo.dog_id = dog.id GROUP BY photo.dog_id),
                                'dog_surname', dog.surname,
								'dog_behavior', (SELECT label FROM behavior WHERE dog.behavior_id = behavior.id),
								'dog_breed', (SELECT label FROM breed WHERE dog.breed_id = breed.id),
                                'dog_gender', (SELECT label FROM gender WHERE dog.gender_id = gender.id),
                                'dog_weight', dog.weight,
                                'dog_sterilization', dog.sterilization,
                                'dog_description', dog.description,
                                'dog_age',  CASE 
                                                    WHEN ((NOW()::DATE - dog.birthday)/365) < 1 THEN ((NOW()::DATE - dog.birthday)/30)::varchar || ' mois' 
                                                    WHEN ((NOW()::DATE - dog.birthday)/365) = 1 THEN ((NOW()::DATE - dog.birthday)/30)::varchar || ' an'
                                                    ELSE ((NOW()::DATE - dog.birthday)/365)::varchar || ' ans'
                                            END 
                            ))  
                        FROM dog                        
                        WHERE dog.dog_owner_id = participant.id)
        )) AS participants
FROM ride
JOIN tag ON tag.id = tag_id   
JOIN member AS host ON host.id = host_id  
LEFT JOIN member_write_ride AS message ON message.ride_id = ride.id 
LEFT JOIN member_participate_ride ON member_participate_ride.ride_id = ride.id         
LEFT JOIN member AS sender ON sender.id = message.member_id AND member_participate_ride.member_id = sender.id   
LEFT JOIN member AS participant ON participant.id = member_participate_ride.member_id OR participant.id = host.id
LEFT JOIN dog ON dog.dog_owner_id = member_participate_ride.member_id
GROUP BY ride.id, tag.label, host.id, host.first_name; 

COMMIT;



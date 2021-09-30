-- Deploy canipotes:view_profil to pg

BEGIN;

CREATE VIEW full_profile AS
SELECT  member.id AS member_id,
		member.email,
		member.first_name,
		member.last_name,
		member.photo,
		member.zip_code,
		CASE 
                 WHEN ((NOW()::DATE - member.birthday)/365) < 1 THEN ((NOW()::DATE - member.birthday)/30)::varchar || ' mois' 
                 WHEN ((NOW()::DATE - member.birthday)/365) = 1 THEN ((NOW()::DATE - member.birthday)/30)::varchar || ' an'
                 ELSE ((NOW()::DATE - member.birthday)/365)::varchar || ' ans'
         END AS birthday,
 
			ARRAY_AGG(DISTINCT jsonb_build_object(
					 'dog_id', dog.id,
					 'dog_surname', dog.surname,
					 'dog_behavior', behavior.label,
					 'dog_breed', breed.label,
					 'dog_gender', gender.label,
					 'dog_weight', dog.weight,
					 'dog_age', CASE 
                                       WHEN ((NOW()::DATE - dog.birthday)/365) < 1 THEN ((NOW()::DATE - dog.birthday)/30)::varchar || ' mois' 
                                       WHEN ((NOW()::DATE - dog.birthday)/365) = 1 THEN ((NOW()::DATE - dog.birthday)/30)::varchar || ' an'
                                       ELSE ((NOW()::DATE - dog.birthday)/365)::varchar || ' ans'
                               END ,
					 'dog_sterilization', dog.sterilization,
					 'dog_description', dog.description,
					 'dog_photo', (SELECT ARRAY_AGG(DISTINCT jsonb_build_object(
                                                        'photo_id', photo.id,
                                                        'photo_url', photo.file_name
                                                        )) 
                                    FROM photo WHERE photo.dog_id = dog.id GROUP BY photo.dog_id)
					))FILTER (WHERE dog_owner_id IS NOT NULL)AS dogs
FROM member 
LEFT JOIN dog ON dog_owner_id = member.id
LEFT JOIN behavior ON dog.behavior_id = behavior.id
LEFT JOIN breed ON dog.breed_id = breed.id
LEFT JOIN gender ON dog.gender_id = gender.id
LEFT JOIN photo ON photo.dog_id = dog.id
GROUP BY member.id;




COMMIT;

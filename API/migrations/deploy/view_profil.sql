-- Deploy canipotes:view_profil to pg

BEGIN;

SELECT  member.id as member_id,
		member.email,
		member.first_name,
		member.last_name,
		member.photo,
		member.zip_code,
		member.birthday,
 
			array_agg(distinct jsonb_build_object(
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
					 'dog_photo', jsonb_build_object(
												'photo_id', photo.id,
												'photo_url', photo.file_name)
							
					))filter (where dog_owner_id is not null)as dogs
FROM member 
left join dog on dog_owner_id = member.id
left join behavior on dog.behavior_id = behavior.id
left join breed on dog.breed_id = breed.id
left join gender on dog.gender_id = gender.id
left join photo on photo.dog_id = dog.id

group by member.id




COMMIT;

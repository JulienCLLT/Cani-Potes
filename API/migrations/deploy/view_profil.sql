-- Deploy canipotes:view_profil to pg

BEGIN;

SELECT  member.id,
		member.email,
		member.first_name,
		member.last_name,
		member.photo,
		member.zip_code,
		member.birthday,
 
			array_agg(jsonb_build_object(
					 'dog_id', dog.id,
					 'dog_surname', dog.surname,
					 'dog_behavior', behavior.label,
					 'dog_breed', breed.label,
					 'dog_gender', gender.label,
					 'dog_weight', dog.weight,
					 'dog_age', dog.birthday,
					 'dog_sterilization', dog.sterilization,
					 'dog_description', dog.description
					))filter (where dog_owner_id is not null)as dogs
FROM member
left join dog on dog_owner_id = member.id
left join behavior on dog.behavior_id = behavior.id
left join breed on dog.breed_id = breed.id
left join gender on dog.gender_id = gender.id
group by member.id




COMMIT;

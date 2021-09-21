-- Deploy canipotes:constraint to pg

BEGIN;


------------------
-- ZIP CODE MEMBER

CREATE DOMAIN zip_code AS TEXT CHECK(
	VALUE ~ '^(?!00|96|99)\d{5}$'
    --exception générale
	AND VALUE !~ '[12]80$'
    --on ajoute la Corse
	AND VALUE !~ '^20' OR (VALUE ~ '20000|23000' OR VALUE !~ '^20[3-57-9]' )
);

ALTER TABLE member
    ALTER COLUMN zip_code TYPE zip_code;

------------------
-- FILE_NAME PHOTO

CREATE DOMAIN name_file_format AS TEXT CHECK(
    -- lettre avant et après un point
    VALUE ~ '^.+\..+$'
    -- todo absence de caractères spéciaux interdit par windows: > < : " / | ? *
    -- AND VALUE !~ ''
);

ALTER TABLE member
    ALTER COLUMN photo TYPE name_file_format;

ALTER TABLE photo   
    ALTER COLUMN file_name TYPE name_file_format;


-----------------
-- EMOJI BEHAVIOR

CREATE DOMAIN emoji_format AS TEXT CHECK (
    -- suite de 4 à 5 caractères : A à F ou 1 à 9
    VALUE ~ '[A-F0-9]{4,5}'
);

ALTER TABLE behavior 
    ALTER COLUMN emoji TYPE emoji_format; 



COMMIT;

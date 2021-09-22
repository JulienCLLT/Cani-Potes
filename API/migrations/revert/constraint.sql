-- Revert canipotes:constraint from pg

BEGIN;

ALTER TABLE behavior 
    ALTER COLUMN emoji TYPE TEXT;

ALTER TABLE member
    ALTER COLUMN photo TYPE TEXT;

ALTER TABLE photo   
    ALTER COLUMN file_name TYPE TEXT;

ALTER TABLE member
    ALTER COLUMN zip_code TYPE TEXT;

DROP DOMAIN emoji_format, name_file_format, zip_code;    

COMMIT;

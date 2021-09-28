-- Deploy canipotes:init to pg

BEGIN;

CREATE TABLE breed (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE gender (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE behavior (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE, 
    emoji TEXT NOT NULL UNIQUE, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE tag(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE member(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    photo TEXT DEFAULT 'avatar.jpg',
    zip_code TEXT NOT NULL, 
    password TEXT NOT NULL,
    birthday DATE NOT NULL, -- + check date - 18 ans ? 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);


CREATE TABLE dog (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    surname TEXT NOT NULL , -- v CHECK (char_length(surname) < 30)
    description TEXT, -- v  CHECK (char_length(value) < 200)
    weight NUMERIC(4,2), -- v 
    birthday DATE NOT NULL, 
    sterilization BOOLEAN NOT NULL, 
    breed_id INT REFERENCES breed(id) NOT NULL DEFAULT 1,
    gender_id INT REFERENCES gender(id) NOT NULL,
    behavior_id INT REFERENCES behavior(id) NOT NULL,
    dog_owner_id INT REFERENCES member(id) NOT NULL, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE photo (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    file_name TEXT,
    dog_id INT REFERENCES dog(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE ride (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL , -- v CHECK (char_length(surname) < 50)
    description TEXT NOT NULL , -- v CHECK (char_length(surname) < 200)
    start_coordinate NUMERIC(9,2) [] NOT NULL, -- v
    end_coordinate NUMERIC(9,6) [] NOT NULL, -- v
    starting_time TIMESTAMPTZ NOT NULL,
    duration INTERVAL, --todo CHECK mniute 
    max_number_dogs INT NOT NULL, --todo mini 2? 
    tag_id INT REFERENCES tag(id) NOT NULL, 
    host_id INT REFERENCES member(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE member_write_ride (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id INT REFERENCES member(id), 
    ride_id INT REFERENCES ride(id), 
    message TEXT NOT NULL, -- v  CHECK (char_length(surname) < 200)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE member_participate_ride (
    member_id INT REFERENCES member(id), 
    ride_id INT REFERENCES ride(id), 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (member_id, ride_id)
);

COMMIT;

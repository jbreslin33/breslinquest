DROP TABLE armor;
DROP TABLE weapons;
DROP TABLE characters;
DROP TABLE race;
DROP TABLE class;
DROP TABLE parties;
DROP TABLE users;
DROP TABLE world_directions;
DROP TABLE world_points;
DROP TABLE pictures;

--USERS
CREATE TABLE users (
        id SERIAL,
        username text UNIQUE,
        password text,
        first_name text,
        last_name text,
	email text,
	socket_id text,
        banned_id integer NOT NULL default 0,
        PRIMARY KEY (id)
);

--PARTIES
CREATE TABLE parties (
        id SERIAL,
        name text UNIQUE,
        x integer DEFAULT 0,
        y integer DEFAULT 0,
        z integer DEFAULT 0,
        d integer DEFAULT 0,
	user_id integer, -- null for npcs
	FOREIGN KEY (user_id) REFERENCES users(id),
        PRIMARY KEY (id)
);

CREATE TABLE race (
        id SERIAL,
        name text UNIQUE,
        PRIMARY KEY (id)
);

CREATE TABLE class (
        id SERIAL,
        name text UNIQUE,
        PRIMARY KEY (id)
);

CREATE TABLE weapons (
        id SERIAL,
        name text UNIQUE,
        damage integer,
        PRIMARY KEY (id)
);

CREATE TABLE armor (
        id SERIAL,
        name text UNIQUE,
        protection integer,
        PRIMARY KEY (id)
);

--CHARACTERS
CREATE TABLE characters (
        id SERIAL,
        name text UNIQUE,
	user_id integer, 
	race_id integer, --human,elf,dwarf,halfling,kobold,goblin,orc,dragon,demon,wraith,stone_golem
	class_id integer, --wizard,thief,fighter,cleric
	full_hitpoints integer, 
	current_hitpoints integer, 
	level integer DEFAULT 1, 
	experience integer DEFAULT 0, 
	party_id integer, --can monsters be in parties???? can parties be bigger than 6??? hordes???? of parties and monsters???? economies of scale the bigger the party the less the share of experience points so you want to find a balance.
	action integer, --default action to perform 
        PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (party_id) REFERENCES parties(id),
	FOREIGN KEY (race_id) REFERENCES race(id),
	FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE pictures (
        id SERIAL,
        name text,
        url text,
        PRIMARY KEY (id)
);
	
CREATE TABLE world_points (
        id SERIAL,
        x integer,
        y integer,
        z integer,
        PRIMARY KEY (id),
	UNIQUE (x,y,z)
);

CREATE TABLE world_directions (
        id SERIAL,
        d integer,
        picture_id integer,
        world_point_id integer,
        passable integer,
        PRIMARY KEY (id),
	FOREIGN KEY (world_point_id) REFERENCES world_points(id),
	FOREIGN KEY (picture_id) REFERENCES pictures(id)
);

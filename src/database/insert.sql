--worldnavigation

--pictures
insert into pictures (name,url) values ('dungeon door','/images/dungeondoor.jpg');
insert into pictures (name,url) values ('dungeon wall','/images/wall.jpg');
insert into pictures (name,url) values ('open field','/images/openfield.jpg');
insert into pictures (name,url) values ('river side','/images/riverside.jpg');
insert into pictures (name,url) values ('hallway','/images/hallway.jpg');


--0,0,0
insert into world_points (x,y,z) values (0,0,0);

insert into world_directions (passable,picture_id,d,world_point_id) values (0,1,0,1);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,1,1);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,2,1);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,3,1);

insert into world_points (x,y,z) values (0,1,0);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,3,0,2);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,1,2);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,1,2,2);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,3,2);

insert into world_points (x,y,z) values (0,2,0);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,3,0,3);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,1,3);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,3,2,3);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,3,3);

insert into world_points (x,y,z) values (0,3,0);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,3,0,4);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,1,4);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,3,2,4);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,3,4);

insert into world_points (x,y,z) values (0,4,0);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,1,0,5);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,1,5);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,3,2,5);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,3,5);

insert into world_points (x,y,z) values (0,5,0);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,5,0,6);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,1,6);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,1,2,6);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,3,6);

insert into world_points (x,y,z) values (0,6,0);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,5,0,7);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,1,7);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,5,2,7);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,3,7);

insert into world_points (x,y,z) values (0,7,0);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,5,0,8);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,1,8);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,5,2,8);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,3,8);

insert into world_points (x,y,z) values (0,8,0);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,5,0,9);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,1,9);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,5,2,9);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,3,9);

insert into world_points (x,y,z) values (0,9,0);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,5,0,10);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,1,10);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,5,2,10);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,3,10);

insert into world_points (x,y,z) values (0,10,0);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,0,11);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,1,11);
insert into world_directions (passable,picture_id,d,world_point_id) values (0,5,2,11);
insert into world_directions (passable,picture_id,d,world_point_id) values (1,2,3,11);

--users
insert into users (username,password,first_name,last_name) values ('j','j','Jim','Breslin');
insert into users (username,password) values ('bbreslin','soccer12');

--race
insert into race (name) values ('Human');
insert into race (name) values ('Elf');
insert into race (name) values ('Dwarf');
insert into race (name) values ('Orc');
insert into race (name) values ('Halfling');
insert into race (name) values ('Kobold');

insert into class (name) values ('Fighter');
insert into class (name) values ('Wizard');
insert into class (name) values ('Thief');
insert into class (name) values ('Assassin');
insert into class (name) values ('Cleric');
insert into class (name) values ('Palidan');
insert into class (name) values ('Ranger');
insert into class (name) values ('Illusionist');

--weapons
insert into weapons (name,damage) values ('Two-handed Sword',12);
insert into weapons (name,damage) values ('Long Sword',10);
insert into weapons (name,damage) values ('Bastard Sword',8);
insert into weapons (name,damage) values ('Short Sword',6);
insert into weapons (name,damage) values ('Dagger',4);
insert into weapons (name,damage) values ('Mace',7);
insert into weapons (name,damage) values ('Long Bow',6);
insert into weapons (name,damage) values ('Crossbow',4);

insert into armor (name,protection) values ('Platinum',-8); --I think you should need to do 9 points of damage to even damage player 1 point.
insert into armor (name,protection) values ('Bronze',-6);
insert into armor (name,protection) values ('Chain Mail',-4);
insert into armor (name,protection) values ('Leather',-2);
insert into armor (name,protection) values ('Shield',-2);

--party
insert into parties (name,user_id) values ('Classic',1);
insert into parties (name,user_id) values ('Modern',1);
insert into parties (name,user_id) values ('The Lightning',2);
insert into parties (name,user_id) values ('The Vikings',2);

--monster party!
insert into parties(name,x,y) values ('kobold and orc party of two',0,7);

--characters
--jim
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id,action) values ('Julius',1,1,1,13,13,1,0,1,1);
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id,action) values ('Ren Blackis',1,4,4,13,13,1,0,1,1);
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id,action) values ('Phantazar',1,1,8,13,13,1,0,1,2);
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id,action) values ('Midget Man',1,5,3,13,13,1,0,1,2);
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id,action) values ('Barton',1,1,5,13,13,1,0,1,2);

--brian
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id,action) values ('Legolas',2,1,5,13,13,1,0,3,1);

--monsters
insert into characters (name,race_id,full_hitpoints,current_hitpoints,level,experience,party_id,action) values ('Abog',6,3,13,1,0,5,1);
insert into characters (name,race_id,full_hitpoints,current_hitpoints,level,experience,party_id,action) values ('Brghlu',4,15,5,1,0,5,1);




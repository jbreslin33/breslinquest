--users
insert into users (username,password,first_name,last_name) values ('jbreslin','Iggles_13','Jim','Breslin');
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

--party
insert into parties (name,user_id) values ('Classic',1);
insert into parties (name,user_id) values ('Modern',1);
insert into parties (name,user_id) values ('Classic',2);
insert into parties (name,user_id) values ('Modern',2);

--monster party!
insert into parties(name,x,y) values ('kobold party of one',1,1);

--characters
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id) values ('Julius',1,1,1,13,13,1,0,1);
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id) values ('Ren Blackis',1,4,4,13,13,1,0,1);
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id) values ('Phantazar',1,1,8,13,13,1,0,1);
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id) values ('Midget Man',1,5,3,13,13,1,0,1);
insert into characters (name,user_id,race_id,class_id,full_hitpoints,current_hitpoints,level,experience,party_id) values ('Barton',1,1,5,13,13,1,0,1);

--monsters
insert into characters (race_id,full_hitpoints,current_hitpoints,level,experience,party_id) values (6,3,3,1,0,5);




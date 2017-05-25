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

--characters
insert into characters (name,user_id,race_id,class_id,x,y,z,d,full_hitpoints,current_hitpoints,level,experience) values ('Julius',1,1,1,0,0,0,0,13,13,1,0);

--monsters
insert into characters (race_id,x,y,z,d,full_hitpoints,current_hitpoints,level,experience) values (2,2,0,0,0,3,3,1,0);

--party
insert into parties (name,user_id) values ('Classic',1);
insert into parties (name,user_id) values ('Modern',1);




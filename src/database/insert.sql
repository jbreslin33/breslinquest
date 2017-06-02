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
insert into parties(name,x,y) values ('kobold and orc party of two',1,1);

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




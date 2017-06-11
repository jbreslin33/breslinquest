#!/bin/bash
# A shell script to print each number five times.

#rm sql file
rm src/database/make_world_points.sql 

#create sql file

((i = 1))

for (( x = 0; x <= 10; x++ ))      ### Outer x loop ###
do
    for (( y = 0 ; y <= 10; y++ )) ### Inner y  loop ###
    do
    	for (( z = 0 ; z <= 10; z++ )) ### Inner z  loop ###
	do
		echo "insert into world_points (x,y,z) values (" $x "," $y ","  $z ");" >> src/database/make_world_points.sql
		echo "insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,0,$i);" >> src/database/make_world_points.sql
		echo "insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,1,$i);" >> src/database/make_world_points.sql
		echo "insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,2,$i);" >> src/database/make_world_points.sql
		echo "insert into world_directions (passable,picture_id,d,world_point_id) values (1,4,3," $i ");" >> src/database/make_world_points.sql
		((i++))
	done
    done
done

#execute file
sudo -u postgres psql -d openrpg -f src/database/make_world_points.sql
  

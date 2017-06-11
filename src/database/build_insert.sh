sudo -u postgres psql -d openrpg -f src/database/build.sql
sudo -u postgres psql -d openrpg -f src/database/insert.sql
./src/database/make_world_points.sh
sudo node index.js

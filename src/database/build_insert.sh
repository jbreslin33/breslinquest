sudo -u postgres psql -d openrpg -f src/database/build.sql
sudo -u postgres psql -d openrpg -f src/database/insert.sql
sudo -u postgres psql -d openrpg -f src/database/make_world_points.sql
sudo node index.js

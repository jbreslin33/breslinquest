sudo -u postgres pg_dump -Fc openrpg > src/database/backup/full
split -b 40m src/database/backup/full src/database/backup/partial
git add src/database/backup/partial*

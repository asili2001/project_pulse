password=|PASSWORD|
cd /db_files
mariadb -uroot -p"$password" < reset.sql
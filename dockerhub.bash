CHARACTER_SET="A-Za-z0-9"
LENGTH=10

# Generate the random string. this will be used as a password for the database.
export random_string=$(cat /dev/urandom | tr -dc "$CHARACTER_SET" | fold -w $LENGTH | head -n 1)

db_import_location=db/db_import.sh
my_env_prod=server/.env.prod

cp db_import.sh "$db_import_location"

sed -i "s/password=|PASSWORD|/password=${random_string}/" "$db_import_location"
sed -i "s/DB_PASS = .*/DB_PASS = '$random_string'/" "$my_env_prod"

docker network create project_pulse

echo "---------------- Building and running mariadb -------------------"
docker run --rm -e MYSQL_ROOT_PASSWORD="$random_string" -v $(pwd)/db:/db_files --name project_pulse_db -d --network project_pulse mariadb:latest

cd client && npm run build && cd ../ && cp .htaccess dist/.htaccess

echo "---------------- Building server -------------------"
docker build -t asili2001/project_pulse_server_img server/.
echo "---------------- Building Client -------------------"
docker build -t asili2001/project_pulse_client_img client/.

# docker run --rm -d --name project_pulse_client -p 8080:5173 --network project_pulse asili2001/project_pulse_client_img
echo "---------------- Running client -------------------"
docker rm project_pulse_client
docker run --rm -d --name project_pulse_client -p 80:80 asili2001/project_pulse_client_img
echo "---------------- Building server -------------------"
docker rm project_pulse_server
docker run --rm -d -e DB_PASSWORD="$random_string" --network project_pulse --name project_pulse_server -p 1337:1337 asili2001/project_pulse_server_img


echo "---------------- Importing database -------------------"
docker exec project_pulse_db bash /db_files/db_import.sh


# Remove all dangling images
docker image prune -f
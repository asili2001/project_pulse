# project_pulse

## Kursen Individuella projekt

### Requirements
- Node
- NPM
- MariaDB

### MariaDB Setup
1. Follow the tutorial from dbwebb.se for MariaDB setup: [MySQL with Workbench Tutorial](https://dbwebb.se/labbmiljo/mysql-med-workbench).

2. After installation, navigate to the `db` directory and run the following command to create the database:

```bash
mariadb -h $(hostname).local -u [YOUR_USERNAME] -p [YOUR_PASSWORD] < reset_dev.sql
```
Replace [YOUR_USERNAME] with your MariaDB username and [YOUR_PASSWORD] with your MariaDB password.

3. Update the .env.prod file with your database credentials:

```
...
DB_HOST = project_pulse_db
DB_PORT = 3306
DB_USER = root
DB_PASS = '3bAXLSewku'
DB_NAME_MAIN = project_pulse
...
```
## Backend Setup

1. In the server directory, configure the email setup for your project.

2. Generate a unique Gmail password for the application:

        * Go to Google App Passwords.
        * Create a new password and name it 'project_pulse'.
        * Copy the generated password.

3. Update the .env.prod file in the server directory with your email and password:

```
...
MAIL_USER = "YOUR_EMAIL"
MAIL_PASS = "YOUR_EMAIL_PASS"
...
```
4. Install the required dependencies:
```bash
cd server && npm install

```

4. Start the backend server:
```
npm run dev
```

## Client Setup

1. In the client directory, install the required dependencies:
```bash
cd client && npm install
```

2. Start the client server:
```bash
npm run dev
```

## Running with Docker
1. To start the application using Docker, run the dockerhub.bash script:
```bash
bash dockerhub.bash
```
"Ops, Please make sure to fill out the required data to the .env.prod"

### Default client port: 5173
### Default server port: 1337
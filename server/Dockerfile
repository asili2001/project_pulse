FROM node:14

WORKDIR /server

# Copy your application code and files
COPY __tests__ ./__tests__
COPY docs ./docs
COPY mail_templates ./mail_templates
COPY src ./src
COPY .env* *.json *.ts ./


# Install MariaDB client and other dependencies
RUN apt update && apt install -y mariadb-client

# WORKDIR /server/db
# RUN mariadb -h database -uroot -ppassword < reset.sql
RUN npm install

# Set the working directory for your Node.js application
WORKDIR /server/src

# Define the command to run your Node.js application
CMD ["npm", "run", "dev"]

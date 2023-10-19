# FROM node:20

# WORKDIR /client

# COPY src ./src
# COPY public ./public
# COPY .env index.html *.json *.js *.ts ./

# RUN apt update && npm install

# EXPOSE 5173

# WORKDIR /client/src
# CMD ["npm", "run", "dev"]

FROM ubuntu:22.04

RUN apt update && apt install -y apache2

COPY .htaccess /var/www/html
COPY dist/. /var/www/html

RUN a2enmod rewrite
EXPOSE 80

RUN echo "ServerName 127.0.0.1" >> /etc/apache2/apache2.conf

# Start the NGINX server
CMD ["apachectl", "-D", "FOREGROUND"]
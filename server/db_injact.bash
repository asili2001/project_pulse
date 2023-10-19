#!/bin/bash

# Wait for the database server to be ready (adjust the timeout as needed)
timeout=30
while ! mysqladmin ping -h project_pulse_db --silent; do
    sleep 1
    timeout=$((timeout-1))
    if [ "$timeout" -eq 0 ]; then
        echo "Database server is not ready. Exiting."
        exit 1
    fi
done

# Run the SQL script to initialize the database
mariadb -h project_pulse_db < reset.sql

# Run your Node.js application
npm run dev
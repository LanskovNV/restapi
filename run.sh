#!/bin/bash

echo "AUTH_SECRET=123 HOST=0.0.0.0 PORT=5000 PAGE_SIZE=5 DB_URL=mongodb://api_db:27017/employeeDb" | tr " " "\n" > .env

git pull
docker-compose rm -fs
docker-compose up -d --build

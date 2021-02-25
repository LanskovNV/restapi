#!/bin/bash

name=crud_api

echo "HOST=0.0.0.0 PORT=5000 DB_URL=mongodb://localhost:27017/employee-db" | tr " " "\n" > .env

git pull
docker stop $name || true
docker rm $name || true
docker build -t $name .
docker run -d \
    --restart=unless-stopped \
    --name $name \
    -p 5001:5000 \
    $name

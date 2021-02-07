#!/bin/bash

name=crud_api

docker stop $name || true
docker rm $name || true
docker build -t $name .
docker run -d \
    --restart=unless-stopped \
    --name $name \
    -p 5001:8080 \
    $name

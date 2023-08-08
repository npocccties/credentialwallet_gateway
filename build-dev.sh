#!/bin/sh
echo $0
DIR=$(cd $(dirname $0); pwd)
echo $DIR
cd $DIR

docker compose -f docker-compose.build.yml build --no-cache 
docker container stop gateway 2>&1 || true
docker run --rm -p 3000:3000 --name gateway --net app_network --detach gateway
docker rmi deps bundler
docker compose up -d
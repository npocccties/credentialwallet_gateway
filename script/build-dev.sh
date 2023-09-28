#!/bin/sh
echo $0
DIR=$(cd $(dirname $0)/..; pwd)
echo $DIR
cd $DIR

docker compose -f docker-compose.dev-server.yml build --no-cache 
docker container stop chilowallet 2>&1 || true
docker rmi deps bundler
docker -f docker-compose.dev-server.yml up -d
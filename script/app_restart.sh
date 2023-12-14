#!/bin/sh
echo $0
DIR=$(cd $(dirname $0)/..; pwd)
echo $DIR
cd $DIR
source ./.env
/bin/sh script/app_stop.sh
/bin/sh script/app_start.sh
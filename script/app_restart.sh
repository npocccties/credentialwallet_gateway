#!/bin/sh
echo $0
DIR=$(cd $(dirname $0); pwd)
echo $DIR
cd $DIR
source ./.env
/bin/sh server_stop.sh
/bin/sh server_start.sh
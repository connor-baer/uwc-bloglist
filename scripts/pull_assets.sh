#!/bin/bash

# Craft-Scripts
# @author    nystudio107
# @copyright Copyright (c) 2016 nystudio107
# @link      https://nystudio107.com/
# @package   craft-scripts
# @since     1.0.1
# @license   MIT

cd "${0%/*}"

# Make sure the `.env.sh` exists
if [[ ! -f ".env.sh" ]] ; then
  echo 'File ".env.sh" is missing, aborting.'
  exit
fi

source ".env.sh"

for DIR in "${LOCAL_ASSETS_DIRS[@]}"
do
  rsync -a -z -e "ssh -p $REMOTE_SSH_PORT" "$REMOTE_SSH_LOGIN:$REMOTE_ASSETS_PATH$DIR" $LOCAL_ASSETS_PATH --progress
  echo "*** Synced assets from $DIR"
done

#!/bin/bash -e

NAME="cons"
VERSION="1.0.0"
PORT="3000"
OLDIMAGE="$(docker images --filter=reference=$NAME --format "{{.ID}}")"


if [ -e $NAME.zip ];
then
  rm -rf fe/ &&
  mkdir fe &&
  cp $NAME.zip  fe/$NAME.zip &&
  cd fe/ &&
  unzip -qo $NAME.zip &&
  docker build --no-cache -t $NAME:$VERSION . &&
  docker rm -f $NAME &&
  docker run --name $NAME --restart unless-stopped --network host -d $NAME:$VERSION &&
  docker rmi $OLDIMAGE &&
  rm $NAME.zip &&
  echo "done"
else
  disp_error "Please make sure that '$NAME.zip' is available under $PWD" &&
  disp_error "Going to stop the script! " &&
  disp_success "Dont worry no change was made. Place '$NAME.zip' under $PWD and re-run the script." &&
  exit 1
fi

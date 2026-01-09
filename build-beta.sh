#!/bin/bash -e

NAME="cons"
IP="92.205.182.35"
BRANCH="beta"

# Check if the .kt file exists in the same directory as the script
if [ -f "$(dirname "\$0")/.kt" ]; then
    USER="khaled.altimany"
else
    USER="ali.ab"
fi

rm $NAME.zip

yes | cp .env .env.example &&
yes | cp .env.prod .env &&
yes | cp Dockerfile.manual Dockerfile &&

git archive --format zip --output ./$NAME.zip $BRANCH &&
zip ./$NAME.zip .env &&
zip ./$NAME.zip Dockerfile &&

yes | mv .env.example .env &&
yes | mv Dockerfile Dockerfile.manual &&

scp $NAME.zip deploy-fe.sh $USER@$IP: &&
ssh -t $USER@$IP "sh -x deploy-fe.sh" &&

rm -f ./$NAME.zip &&

echo "done"
#!bin/bash
CONTAINER_NAME=minio-restaurants
BACKUP_PATH=//$(PWD):/embeddings #Uncomment this for Windows
#BACKUP_PATH=$(pwd):/embeddings #Uncomment this for Linux or Macos

docker run --rm --volumes-from $CONTAINER_NAME -v "$BACKUP_PATH" ubuntu bash -c "cd /data && tar xvf /embeddings/embeddings.tar --strip 1"
# docker run --rm --volumes-from $CONTAINER_NAME -v $BACKUP_PATH ubuntu bash -c "cd /data && tar xvf /embeddings/embeddings.tar --strip 1" # original

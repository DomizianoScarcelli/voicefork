#!bin/bash
CONTAINER_NAME=minio-restaurants
BACKUP_PATH=$(pwd):/embeddings

docker run --rm --volumes-from $CONTAINER_NAME -v $BACKUP_PATH ubuntu tar cvf /embeddings/embeddings.tar /data

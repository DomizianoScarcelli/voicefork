#!bin/bash
container_name = minio-restaurants
backup_path = $(pwd):/backup

docker run --rm --volumes-from $container_name -v $backup_path ubuntu bash -c "cd /data && tar xvf /backup/backup.tar --strip 1"

#otti mc scaricando il binario con curl, cambiandono in eseguibile e spostandolo in bin
docker exec embeddings sh -c 'mc config host add minio http://localhost:9002 2yt0sIR2x0iSu58E CWPZu7c3DIJM6RT9jTqZQkE7KkyqFvmU && mc mirror --overwrite minio/embeddings /home/dov/voicefork/backend/restaurants/db/embeddings > export.log'
#!bin/bash
container_name = minio-restaurants
backup_path = $(pwd):/backup

docker run --rm --volumes-from $container_name -v $backup_path ubuntu tar cvf /backup/backup.tar /data

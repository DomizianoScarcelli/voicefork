# Embeddings service

In order to upload the embeddings into the minio bucket, you have to download the `embeddings.tar` from the shared Google drive folder, place it inside of restaurants/db/minio-backup and from there run

```
sh ./minio-restore.sh
```

Wait a few minutes and all the embeddings will be uploaded!

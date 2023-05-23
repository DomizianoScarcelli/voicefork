# Embeddings service

How to make this service work:

In order to upload the embeddings into the minio bucket, you have to download the `embeddings.tar` from the shared Google drive folder, place it inside of restaurants/db/minio-backup and from there run

```
sh ./minio-restore.sh
```

Wait a few minutes and all the embeddings will be uploaded!

Then make sure that you import the new database (guide in the `restaurants/readme.md`)

Regarding the .env files, you just have to copy the content in the .env.template and replace it with your credentials.

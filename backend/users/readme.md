# Users microservice

First you have to create a .env file in the root directory with the current content:

```
DATABASE_URL="mysql://root:root@localhost:3307/usersDB"
PORT = 3001
API_KEY = "8c9c59ff99f358710262c503c158f4a4"

USE_MINIO_LOCAL='true' #true if you want to use MINIO locally, exclude this if you are deploying on AWS or if you want to use S3 bucket
AWS_ACCESS_KEY= your aws access key,
AWS_SECRET_KEY= your aws secret key,
AWS_SESSION_TOKEN= your aws session token

MINIO_ACCESS_KEY= your minio access key
MINIO_SECRET_KEY= your minio secret key
```

Download the users stock images from the drive folder, unzip it and execute the python script `minio-dump.py` inside the `script/` folder, replacing the correct path.

Then you can run the database along with the app by doing

```
docker compose up
```

Everything should be working, if you have some problems, try running the containers with:

```
docker compose up --build
```

If you change the schema.prisma, you can update it by executing the command:

```
npx prisma migrate dev --name init
```

-   The app is running on localhost:3001
-   The mysql database is running on the 3307 port.

To use postman, you can import the collection that is in the `/postman-collection` folder
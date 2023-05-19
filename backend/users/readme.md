# Users microservice

First you have to create a .env file in the root directory, follwing the content inside the env.template file.

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

```

```

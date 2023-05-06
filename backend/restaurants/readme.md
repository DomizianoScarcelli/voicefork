# Restaurants microservice

First you have to create a .env file in the root directory with the current content:

```
DATABASE_URL="postgresql://admin:admin@localhost:3308/restaurantsDB"
PORT = 3002
API_KEY = "8c9c59ff99f358710262c503c158f4a4"

USE_MINIO_LOCAL='true' #true if you want to use MINIO locally, exclude this if you are deploying on AWS or if you want to use S3 bucket
AWS_ACCESS_KEY= your aws access key,
AWS_SECRET_KEY= your aws secret key,
AWS_SESSION_TOKEN= your aws session token

MINIO_ACCESS_KEY= your minio access key
MINIO_SECRET_KEY= your minio secret key
```

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

-   The app is running on localhost:3000
-   The adminer (database manager) is running on localhost:8080. You can use it to have a GUI to manage the database such as phpMyAdmin.
-   The mysql database is running on the 3306 port.

To use postman, you can import the collection that is in the `/postman-collection` folder

## Import and Export the DB

### Export

To export the database, put yourself into the /db folder and just do:

```
docker exec postgres_restaurants pg_dump --data-only -U admin -Fc restaurantsDB > backup.sql
```

### Import

To import the database, put yourself into the /db folder and just do:

```
docker exec -i postgres_restaurants pg_restore -U admin -d restaurantsDB < backup.sql
```

IMPORTANT: In Windows put cmd /c "command" to execute them:

```
cmd /c "docker exec -i postgres_restaurants pg_restore -U admin -d restaurantsDB < backup.sql"
```

## Note

If you get any errors about prisma raw query not working, try the magic command and try restarting the containers with the --build tags

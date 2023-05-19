# Restaurants microservice

First you have to create a .env file in the root directory, follwing the content inside the env.template file.

Download the restaurant stock images from the drive folder, unzip it and execute the python script `minio-dump.py` inside the `script/` folder, replacing the correct path.

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

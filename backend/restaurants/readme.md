# Restaurants microservice

First you have to create a .env file in the root directory with the current content:

```
DATABASE_URL="mysql://root:root@localhost:3306/restaurantsDB"
PORT = 3000
```

Then you can run the database along with the app by doing

```
docker compose up
```

Everything should be working, if you have some problems, try running the containers with:

```
docker compose up --remove-orphans --force-recreate
```

If you change the prisma.schema, you can update it by executing the command:

```
npx prisma migrate dev --name init
```

-   The app is running on localhost:3000
-   The adminer (database manager) is running on localhost:8080. You can use it to have a GUI to manage the database such as phpMyAdmin.
-   The mysql database is running on the 3306 port.

To use postman, you can import the collection that is in the `/postman-collection` folder

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

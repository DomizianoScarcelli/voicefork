# Restaurants microservice

First you have to create a .env file in the root directory with the current content:

```
DATABASE_URL="mysql://root:root@localhost:3306/restaurantsDB"
PORT = 3000
```

Then install the npm dependencies with `npm install`

Until we can't publish the DB to AWS, run it in a docker container doing `docker compose up`

Then create the database along with the schema with the command:

```
npx prisma migrate dev --name init
```

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersAPI from "./users-api";

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
// app.use(cors) #This causes some problems
// app.use(express.static(__dirname + "/public"))

usersAPI(app)

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server (Updated)")
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
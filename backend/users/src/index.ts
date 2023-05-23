import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import usersAPI from './api/users-api'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

app.use(express.json())
// app.use(cors) #This causes some problems
// app.use(express.static(__dirname + "/public"))

usersAPI(app)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Users Service!')
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

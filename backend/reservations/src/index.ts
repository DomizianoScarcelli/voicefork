import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import reservationsAPI from './reservations-api'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
// app.use(cors) #This causes some problems
// app.use(express.static(__dirname + "/public"))

reservationsAPI(app)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Reservations Service!')
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

import express, {Express, Request, Response} from 'express'
import cors from 'cors'
import proxy from 'express-http-proxy'

const app = express()

//Cors not used for now..
//app.use(cors());

app.use(express.json())

app.use('/users', proxy('http://users:3001'))
app.use('/restaurants', proxy('http://restaurants:3002'))

app.get('/', (req: Request, res: Response) => {
    res.send('Gateway index')
})

app.listen(3000, () => {
    console.log('Gateway is listening to port 3000')
})

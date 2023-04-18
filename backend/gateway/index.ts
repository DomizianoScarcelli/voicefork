import express from 'express';
import cors from "cors";
import proxy from 'express-http-proxy';

const app = express();

//Cors not used for now..
//app.use(cors());

app.use(express.json());

app.use('/users', proxy('http://localhost:3001'));
app.use('/restaurants', proxy('http://localhost:3002'));

app.listen(3000, () => {
    console.log('Gateway is listening to port 3000')
})
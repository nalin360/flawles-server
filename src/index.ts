import express, { Router } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression' ;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router';
// import userRoutes from './router';


dotenv.config();

const app =  express();
// * using cores
app.use(cors({
credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const PORT = process.env.PORT;
const MONGO_URL: string = process.env.DATABASE_URL || ' ';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL, {
    dbName: 'flawlessTestDB',
    tls: true 
})
.then( () => {
    console.log("connection succesfull");
})
mongoose.connection.on('error',(error:Error) => {
    console.log(error);
    
},)

try {
    app.use('/',router());
} catch (error) {
    console.log(error);
    
}
const server = http.createServer(app)

server.listen(PORT, ()=> {
console.log(`Server running on http://localhost:${PORT}/`);
})

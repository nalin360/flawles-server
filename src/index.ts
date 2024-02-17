import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression' ;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app =  express();
// * using cores
app.use(cors({
credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app)

const PORT = process.env.PORT;
const MONGO_URL: string = process.env.DATABASE_URL || ' ';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
.then( () => {
    console.log("connection succesfull");
})
mongoose.connection.on('error',(error:Error) => {
    console.log(error);
    
},)


server.listen(PORT, ()=> {
console.log(`Server running on http://localhost:${PORT}/`);
})

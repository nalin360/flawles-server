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

try {
    app.use('/',router());
} catch (error) {
    console.log(error);
    
}
const PORT = process.env.PORT;
const MONGO_URL: string = process.env.LOCAL_DB_URL || ' ';
console.log(MONGO_URL);

// mongoose.Promise = Promise;
mongoose.connect(MONGO_URL, {
    // tls: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // retryWrites: true,
    // socketTimeoutMS: 1000,
    // serverSelectionTimeoutMS: 5000
    // retryAttempts: 5,
    // retryDelay: 5000,
})
.then(() => {
    console.log("Connection successful");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});



const server = http.createServer(app)

server.listen(PORT, ()=> {
console.log(`Server running on http://localhost:${PORT}/`);
})

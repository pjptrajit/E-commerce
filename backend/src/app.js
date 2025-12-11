import express from 'express';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import userRouter from './routes/userRoute.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// configure environment variables  
dotenv.config();

const app = express();
const PORT = process.env.PORT;




//connecting with database
connectDB(process.env.MONGODB_URL);

//setting
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));    
app.use(express.json());
app.use(cookieParser());

//API Root Routes
app.use('/api/user/v1', userRouter);





app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port number ${PORT}.`);
})
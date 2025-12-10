import express from 'express';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import userRouter from './routes/userRoute.js';



const app = express();
const PORT = 9000;

//connecting with database
connectDB();

//setting
app.use(cors());    
app.use(express.json());

//API Root Routes
app.use('/api/user/v1', userRouter);





app.listen(PORT,()=>{
    console.log(`Server is running at port number ${PORT}.`);
})
import express from 'express';
import { register, login } from '../controllers/userController.js';


const userRouter = express.Router();

// create user route
// api/user/v1/register
userRouter.post('/register', register);

//read user route
userRouter.get("/login",login);

// //delete user route
// userRouter.delete();

// //update user route
// userRouter.put();

export default userRouter;

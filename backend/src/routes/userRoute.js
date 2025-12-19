import express from 'express';
import { register, login, userProfile, logout } from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js';


const userRouter = express.Router();

// create user route
// api/user/v1/register
userRouter.post('/register', register);

//read user route
userRouter.post("/login",login);
userRouter.get("/userProfile",verifyToken ,userProfile);
userRouter.post("/userLogout",logout);

// //delete user route
// userRouter.delete();

// //update user route
// userRouter.put();

export default userRouter;

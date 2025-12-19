import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

async function verifyToken(req, res, next) {

    const{userToken} = req.cookies;
    const token = jwt.verify(userToken, process.env.JWT_SECRET);
    // console.log(token);

    req.userInfo = {id: token.id}
    next()


    
}
export default verifyToken;
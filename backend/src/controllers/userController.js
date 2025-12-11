import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'



export async function register(req, res) {
  //Todo
  //get all user data
  // check user are empty
  //check user exist or not (email, phone)
  // hash password
  //save user
  // try catch
  //new User(req.body);

  const { name, phone, email, password, image, role } = req.body;

  if (!name || !phone || !email || !password || !image) {
    return res
      .status(400)
      .json({ status: 400, message: "All fields are required" });
  }



  const isExistEmail = await User.findOne({ email: email });
  const isExistPhone = await User.findOne({ phone: phone });

  if (isExistEmail && isExistPhone) {
    return res
      .status(409)
      .json({
        status: 409,
        message: `User email and phone number already exist: ${email}, ${phone}`,
      });
  } else if (isExistEmail) {
    return res
      .status(409)
      .json({ status: 409, message: `User email already exist: ${email}` });
  } else if (isExistPhone) {
    return res.status(409).json({
      status: 409,
      message: `User phone number already exist: ${phone}`,
    });
  } else {
    try {
    //   let userInfo = await new User(req.body);
    //   userInfo = await userInfo.save();
    //  const hashPassword = await dcrypt.hash(password, 10);

    let userInfo = await new User({
      name,
      phone,
      email,
      password : await bcrypt.hash(password, 10),
      image,
      role
    }).save();

    if(!userInfo){
      res.status(500).json({status:500, message:"Error while saving user info.."});
    }
      res.status(200).json({status: 201,message: "User registered successfully",user: userInfo,});
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `User registration failed: ${error.message}`,
      });
    }
  }
}

export async function login(req, res) {

  dotenv.config();
  const{email, password} = req.body;
   if (!email || !password) {
    return res
      .status(400)
      .json({ status: 400, message: "All fields are required" });
  }

  const userInfo = await User.findOne({email:email});

  if(!userInfo){
    res.status(400).json({status:400, error: "Email not Exist"});
  }

  const isPasswordMatchawait = await  bcrypt.compare(password, userInfo.password);
  console.log(isPasswordMatchawait);

  if(!isPasswordMatchawait){
    res.status(400).json({status:400, error: "Invalid credential"});
  }



  const userToken = jwt.sign(
    {
      id:userInfo._id,
      role:userInfo.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn:"1d"
    }
  )
  console.log(userToken);

  // verify token
  //  let verifiedToken  = jwt.verify(userToken,"uiuiuiuiuiuiuiuiuiuuffjejfejjjefjnejfejfejnfjefjenffe");
  //  console.log(verifiedToken);

  res.cookie("userToken",userToken,{
    httpOnly:true,
  });

  res.status(200).json({status:200, message:"User Login Successfully."});
  
}

export async function logout(req, res) {}

export async function updateUserById(req, res) {}

export async function getAllUser(req, res) {}

export async function getUserById(req, res) {}

export async function deleteUserById(req, res) {}

// export {register, login, logout, updateUserById, getAllUser, getUserById, deleteUserById};

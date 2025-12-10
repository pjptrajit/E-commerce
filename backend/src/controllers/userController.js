import User from "../models/userModel.js";

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

    let userInfo = await new User(req.body).save();
      console.log(req.body);
      res
        .status(200)
        .json({
          status: 201,
          message: "User registered successfully",
          user: userInfo,
        });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `User registration failed: ${error.message}`,
      });
    }
  }
}

export async function login(req, res) {}

export async function logout(req, res) {}

export async function updateUserById(req, res) {}

export async function getAllUser(req, res) {}

export async function getUserById(req, res) {}

export async function deleteUserById(req, res) {}

// export {register, login, logout, updateUserById, getAllUser, getUserById, deleteUserById};

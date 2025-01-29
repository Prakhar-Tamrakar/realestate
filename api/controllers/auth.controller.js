import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully",statusCode: 200 });
  } catch (error) {
    next(error)
  }
};

export const signin = async(req ,res,next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(401).json({ message: "Invalid email or password" });
    const isMatch = bcryptjs.compareSync(password, validUser.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });
    const token = jwt.sign({id : validUser.id},process.env.JWT_SECRET);
    const{password : pass , ...restInfo} = validUser._doc;

   
    res
    .cookie('access_token' , token , {httpOnly : true})
    .status(200)
    .json(restInfo);
  }catch{
    next(error)
  }
};

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import { Resend } from "resend";

import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import Otp from "../models/otp.model.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", statusCode: 200 });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Sign out successful");
  } catch (error) {
    next(error);
  }
};



export const sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
  });

  try {
    // Save OTP to DB
    await Otp.create({ email, otp });

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "ankittamrakar3091@gmail.com",
        pass: "xcsi bypu dant kgpj", // 🔐 Use env in production!
      },
    });

    // Email options
    const mailOptions = {
      from: "ankittamrakar3091@gmail.com",
      to: email,
      subject: "One Time Password",
      text: `Hi, your one time password is: ${otp}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP",
          error: error.message,
        });
      }

      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        otp, // ❗Only for testing. Remove in production
        messageId: info.messageId,
        sendTo : email
      });
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

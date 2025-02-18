import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

export const root = (req, res) => {
  res.status(200).json({ message: "Backend is running" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server erorr", error: error.message });
  }
};

export const register = async (req, res) => {
  const { fullName, email, username, password } = req.body;
  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      res
        .status(400)
        .json({ message: "Username already used, please change username" });
    }

    const newUser = new User({
      fullName,
      email,
      username,
      password,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration Error", error: error.message });
  }
};

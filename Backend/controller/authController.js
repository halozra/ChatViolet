import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

// Load environment variables dari file .env
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

// ✔️ Endpoint: root (untuk cek apakah server hidup)
export const root = (req, res) => {
  res.status(200).json({ message: "Backend is running" });
};

// ✔️ Endpoint: login
// Proses autentikasi user dan generate JWT token
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari user berdasarkan username
    const user = await User.findOne({ username });

    // Kalau user tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cek apakah password yang dimasukkan cocok dengan yang tersimpan di database
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Jika password cocok, generate JWT token untuk user tersebut
    const token = jwt.sign(
      {
        id: user._id, // ID user
        username: user.username, // Username
        role: user.role, // Role user (opsional, kalau sistem pakai role-based access)
      },
      secretKey, // Secret key untuk sign JWT
      { expiresIn: "1h" } // Token berlaku selama 1 jam
    );

    // Kirim token kembali ke client
    res.json({ message: "Login successful", token });
  } catch (error) {
    // Kalau ada error dari server (misal koneksi DB)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✔️ Endpoint: register
// Proses membuat user baru ke database
export const register = async (req, res) => {
  const { fullName, email, username, password } = req.body;

  try {
    // Cek apakah username sudah dipakai
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "Username already used, please change username" });
    }

    // Buat object user baru berdasarkan data yang dikirim
    const newUser = new User({
      fullName,
      email,
      username,
      password, // Jangan lupa schema user kamu harus hash password-nya sebelum save (pakai pre-save hook)
    });

    // Simpan user ke database
    await newUser.save();

    // Kirim response sukses ke client
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Tangani error dari server
    res
      .status(500)
      .json({ message: "Registration Error", error: error.message });
  }
};

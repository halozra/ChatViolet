import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables dari file .env
dotenv.config();

// Ambil secret key untuk JWT dari env
const secretKey = process.env.JWT_SECRET_KEY;

// Kalau secret key tidak ditemukan, langsung hentikan aplikasi
if (!secretKey) {
  throw new Error("❌ JWT_SECRET_KEY is missing in environment variables!");
}

// Middleware untuk memverifikasi token JWT
const verifyToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const authHeader = req.headers["authorization"];

  // Kalau tidak ada Authorization header, tolak akses
  if (!authHeader) {
    return res.status(403).json({ message: "Token is required" });
  }

  // Token harus dalam format: "Bearer <token>"
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(400).json({ message: "Invalid token format" });
  }

  // Ambil token-nya dari bagian kedua
  const token = tokenParts[1];

  // Verifikasi token menggunakan secret key
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // Kalau token tidak valid atau kadaluarsa
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Simpan data user hasil decode ke dalam request
    req.user = decoded;

    // Lanjut ke middleware/route berikutnya
    next();
  });
};

// Ekspor middleware supaya bisa dipakai di route lain
export default verifyToken;

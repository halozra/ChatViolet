import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

if (!secretKey) {
    throw new Error("❌ JWT_SECRET_KEY is missing in environment variables!");
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({ message: "Token is required" });
    }

    // Pastikan formatnya "Bearer <token>"
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(400).json({ message: "Invalid token format" });
    }

    const token = tokenParts[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        req.user = decoded;
        next();
    });
};

export default verifyToken;

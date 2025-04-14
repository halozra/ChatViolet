import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const key = process.env.HASH_SECRET_KEY;

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    sex: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    profilImg: { type: String, default: "" },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "users",
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password + key, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password + key, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

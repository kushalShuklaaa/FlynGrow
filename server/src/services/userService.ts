import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const register = async ({ email, password, name, phone }: any) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, name, phone });
  return await newUser.save();
};

const login = async ({ email, password }: any) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
  return token;
};

// ✅ Default export
const userService = {
  register,
  login,
};

export default userService;

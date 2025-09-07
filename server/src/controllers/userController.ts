import { Request, Response } from "express";
import User from "../models/User";
import Order from "../models/Order";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail";

// Send OTP
export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  const user = await User.findOneAndUpdate(
    { email },
    { email, otp, otpExpiry },
    { upsert: true, new: true }
  );

  await sendEmail(email, "Your OTP", `Your OTP is ${otp}`);
  res.json({ message: "OTP sent to email." });
};

// Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (
    !user ||
    user.otp !== otp ||
    !user.otpExpiry ||
    user.otpExpiry < new Date()
  ) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }

  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  await Order.updateMany({ email, user: null }, { user: user._id });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.json({ token, user: { id: user._id, email: user.email } });
};

// User Orders
export const getUserOrders = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const orders = await Order.find({ user: userId }).populate("product");
  res.json(orders);
};

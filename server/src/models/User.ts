import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name?: string;
  email: string;
  otp?: string;
  otpExpiry?: Date;
  role?: string; // Add this line
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: String,
    otpExpiry: Date,
    role: {
      type: String,
      enum: ["USER", "SUPER_ADMIN", "MANAGER", "SUPPORT_STAFF"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;

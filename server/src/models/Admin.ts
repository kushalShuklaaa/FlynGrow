// models/Admin.ts
import mongoose, { Schema, Document } from "mongoose";

export type AdminRole = "SUPER_ADMIN" | "MANAGER" | "SUPPORT_STAFF";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "MANAGER", "SUPPORT_STAFF"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAdmin>("Admin", AdminSchema);

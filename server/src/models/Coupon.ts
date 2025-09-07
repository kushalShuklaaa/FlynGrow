import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discount: number;
  usageLimit: number;
  usedBy: string[];
  expiresAt: Date;
}

const couponSchema: Schema<ICoupon> = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    usageLimit: { type: Number, required: true },
    usedBy: [{ type: String }],
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Coupon: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", couponSchema);

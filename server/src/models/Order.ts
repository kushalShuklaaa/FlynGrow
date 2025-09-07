import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  userEmail: string;
  fileUrl: string;
  fileName: string;
  amount: number;
  isGuest: boolean;
  couponCode?: string;
  couponDiscount?: number;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
  paytmOrderId: string;
  createdAt: Date;
}

const orderSchema: Schema<IOrder> = new Schema(
  {
    userEmail: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    amount: { type: Number, required: true },
    isGuest: { type: Boolean, default: false },
    couponCode: { type: String },
    couponDiscount: { type: Number },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    paytmOrderId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

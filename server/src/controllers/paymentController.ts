// src/controllers/paymentController.ts
import { Request, Response } from "express";
import { verifyChecksum } from "../utils/paytmUtils";
import Order from "../models/Order";

export const paytmCallback = async (req: Request, res: Response) => {
  try {
    const { CHECKSUMHASH, ...receivedData } = req.body;

    const isValidChecksum = verifyChecksum(
      receivedData,
      process.env.PAYTM_KEY!,
      CHECKSUMHASH
    );

    if (!isValidChecksum) {
      return res.status(400).send("Invalid checksum");
    }

    const orderId = receivedData.ORDERID;
    await Order.findOneAndUpdate({ orderId }, { status: "PAID" });

    res.status(200).send("Payment verified successfully");
  } catch (err) {
    console.error("Paytm callback error:", err);
    res.status(500).send("Callback processing failed");
  }
};

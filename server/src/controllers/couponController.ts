import { Request, Response } from "express";
import Coupon from "../models/Coupon";
import { logAdminActivity } from "../utils/logAdminActivity";

// Create Coupon (SUPER_ADMIN)
export const createCoupon = async (req: Request, res: Response) => {
  try {
    const { code, discountType, discountValue, expiryDate, usageLimit } =
      req.body;

    if (
      !code ||
      !discountType ||
      !discountValue ||
      !expiryDate ||
      !usageLimit
    ) {
      return res.status(400).json({ error: "All coupon fields are required." });
    }

    const existing = await Coupon.findOne({ code });
    if (existing)
      return res.status(400).json({ error: "Coupon code already exists" });

    const coupon = await Coupon.create({
      code,
      discountType,
      discountValue,
      expiryDate,
      usageLimit,
    });

    await logAdminActivity(req, `Created coupon ${code}`);
    res.status(201).json({ message: "Coupon created", coupon });
  } catch (err) {
    res.status(500).json({ error: "Server error creating coupon" });
  }
};

// Get All Coupons
export const getAllCoupons = async (_req: Request, res: Response) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ coupons });
  } catch {
    res.status(500).json({ error: "Error fetching coupons" });
  }
};

// Update Coupon (SUPER_ADMIN)
export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Coupon.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ error: "Coupon not found" });

    await logAdminActivity(req, `Updated coupon ${updated.code}`);
    res.json({ message: "Coupon updated", coupon: updated });
  } catch {
    res.status(500).json({ error: "Error updating coupon" });
  }
};

// Delete Coupon (SUPER_ADMIN)
export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Coupon.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Coupon not found" });

    await logAdminActivity(req, `Deleted coupon ${deleted.code}`);
    res.json({ message: "Coupon deleted" });
  } catch {
    res.status(500).json({ error: "Error deleting coupon" });
  }
};

// Validate Coupon (for frontend before order)
export const validateCoupon = async (req: Request, res: Response) => {
  try {
    const { code, email } = req.body;

    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(400).json({ error: "Invalid coupon code" });

    const now = new Date();
    if (coupon.expiryDate < now)
      return res.status(400).json({ error: "Coupon expired" });

    if (coupon.usedBy.includes(email))
      return res
        .status(400)
        .json({ error: "Coupon already used by this email" });

    if (coupon.usedBy.length >= coupon.usageLimit)
      return res.status(400).json({ error: "Coupon usage limit reached" });

    res.json({ message: "Coupon valid", coupon });
  } catch {
    res.status(500).json({ error: "Error validating coupon" });
  }
};

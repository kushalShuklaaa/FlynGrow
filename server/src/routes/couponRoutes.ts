import express from "express";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon,
  validateCoupon,
} from "../controllers/couponController";
import { authAdmin, requireAdminRole } from "../middleware/authAdminMiddleware";

const router = express.Router();

// Admin-only routes
router.post("/", authAdmin, requireAdminRole("SUPER_ADMIN"), createCoupon);
router.put("/:id", authAdmin, requireAdminRole("SUPER_ADMIN"), updateCoupon);
router.delete("/:id", authAdmin, requireAdminRole("SUPER_ADMIN"), deleteCoupon);

// View all coupons (admin only for now)
router.get("/", authAdmin, getAllCoupons);

// Public (used during checkout)
router.post("/validate", validateCoupon);

export default router;

// src/routes/userRoutes.ts
import express from "express";
import {
  sendOtp,
  verifyOtp,
  getUserOrders,
} from "../controllers/userController";
import { authUser } from "../middleware/authUserMiddleware";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/orders/me", authUser, getUserOrders);

export default router;

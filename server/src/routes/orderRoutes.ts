import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
} from "../controllers/orderController";
import { authUser } from "../middleware/authUserMiddleware";
import { authAdmin, requireAdminRole } from "../middleware/authAdminMiddleware";

const router = express.Router();

router.post("/", authUser, createOrder);
router.get("/me", authUser, getMyOrders);
router.get(
  "/",
  authAdmin,
  requireAdminRole("SUPER_ADMIN", "MANAGER"),
  getAllOrders
);

export default router;

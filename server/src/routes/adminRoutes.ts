// src/routes/adminRoutes.ts
import express from "express";
import { loginAdmin } from "../controllers/adminController";
import { authAdmin, requireAdminRole } from "../middleware/authAdminMiddleware";

const router = express.Router();

router.post("/login", loginAdmin);

router.get(
  "/dashboard",
  authAdmin,
  requireAdminRole("SUPER_ADMIN", "MANAGER"),
  (req, res) => {
    res.send("Welcome to Admin Dashboard");
  }
);

export default router;

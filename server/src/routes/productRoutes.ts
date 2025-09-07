import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController";
import { authAdmin, requireAdminRole } from "../middleware/authAdminMiddleware";

const router = express.Router();

// Routes (admin required)
router.get("/", authAdmin, getAllProducts);
router.get("/:id", authAdmin, getProductById);

// SUPER_ADMIN-only routes
router.post("/", authAdmin, requireAdminRole("SUPER_ADMIN"), createProduct);
router.put("/:id", authAdmin, requireAdminRole("SUPER_ADMIN"), updateProduct);
router.delete(
  "/:id",
  authAdmin,
  requireAdminRole("SUPER_ADMIN"),
  deleteProduct
);

export default router;

// src/routes/paymentRoutes.ts
import express from "express";
import { paytmCallback } from "../controllers/paymentController";

const router = express.Router();

router.post("/callback", paytmCallback);

export default router;

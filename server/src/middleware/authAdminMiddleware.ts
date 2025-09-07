import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

// Middleware to authenticate admin using JWT
export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Admin token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ error: "Unauthorized admin" });

    (req as any).admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized admin" });
  }
};

// Middleware to enforce role-based access
export const requireAdminRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const admin = (req as any).admin;
    if (!admin || !roles.includes(admin.role)) {
      return res
        .status(403)
        .json({ error: "Access denied: insufficient role" });
    }
    next();
  };
};

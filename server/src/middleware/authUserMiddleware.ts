import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// Auth middleware to verify token and attach user to req
export const authUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          id: string;
        };

        const user = await User.findById(decoded.id).select("-otp -otpExpiry");
        if (!user) {
          res.status(401);
          throw new Error("User not found");
        }

        req.user = user;
        next();
      } catch (error) {
        console.error("JWT Error:", error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

// Authorization middleware based on role
export const authorizeUserRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user.role) {
      res.status(403);
      throw new Error("Access denied. User role missing.");
    }

    if (!allowedRoles.includes(user.role)) {
      res.status(403);
      throw new Error("Access denied. Insufficient role.");
    }

    next();
  };
};

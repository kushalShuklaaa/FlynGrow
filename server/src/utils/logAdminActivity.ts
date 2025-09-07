import { Request } from "express";
import AdminLog from "../models/AdminLog";

export const logAdminActivity = async (req: Request, action: string) => {
  const adminId = (req as any).admin?._id;
  const adminEmail = (req as any).admin?.email;

  if (!adminId || !adminEmail) return;

  await AdminLog.create({
    adminId,
    adminEmail,
    action,
    timestamp: new Date(),
  });
};

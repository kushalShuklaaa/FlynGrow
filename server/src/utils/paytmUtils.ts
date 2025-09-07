// src/utils/paytmUtils.ts
import * as crypto from "crypto";

export const verifyChecksum = (
  body: Record<string, any>,
  key: string,
  checksum: string
): boolean => {
  const data = Object.keys(body)
    .sort()
    .map((k) => `${k}${body[k]}`)
    .join("");

  const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
  return hash === checksum;
};

import crypto from "crypto";
import qs from "querystring";

const PAYTM_MID = process.env.PAYTM_MID!;
const PAYTM_KEY = process.env.PAYTM_KEY!;
const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE || "WEBSTAGING";
const PAYTM_CALLBACK_URL =
  process.env.PAYTM_CALLBACK_URL || "http://localhost:5000/api/paytm/callback";
const PAYTM_TXN_URL =
  process.env.PAYTM_TXN_URL ||
  "https://securegw-stage.paytm.in/theia/processTransaction";

interface InitiatePaytmParams {
  orderId: string;
  amount: number;
  email: string;
  productId: string;
}

export const initiatePaytmPayment = async ({
  orderId,
  amount,
  email,
  productId,
}: InitiatePaytmParams) => {
  const paytmParams: any = {
    MID: PAYTM_MID,
    WEBSITE: PAYTM_WEBSITE,
    INDUSTRY_TYPE_ID: "Retail",
    CHANNEL_ID: "WEB",
    ORDER_ID: orderId,
    CUST_ID: email,
    TXN_AMOUNT: amount.toFixed(2),
    CALLBACK_URL: PAYTM_CALLBACK_URL,
  };

  const checksum = generateChecksum(paytmParams, PAYTM_KEY);
  return {
    ...paytmParams,
    CHECKSUMHASH: checksum,
    txnUrl: PAYTM_TXN_URL,
  };
};

function generateChecksum(params: any, key: string): string {
  const data = Object.keys(params)
    .sort()
    .map((k) => `${k}${params[k]}`)
    .join("");

  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

export default {
  initiatePaytmPayment,
};

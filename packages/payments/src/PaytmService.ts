import crypto from 'crypto';
import axios from 'axios';
import { PaymentRequest, PaymentResponse, PaymentStatus } from '@studyhub/types';
import config from '@studyhub/config';

export class PaytmService {
  private readonly baseUrl: string;
  private readonly merchantId: string;
  private readonly merchantKey: string;
  private readonly website: string;
  private readonly channelId: string;
  private readonly industryTypeId: string;
  private readonly callbackUrl: string;

  constructor() {
    this.baseUrl = config.NODE_ENV === 'production' 
      ? 'https://securegw.paytm.in' 
      : 'https://securegw-stage.paytm.in';
    this.merchantId = config.PAYTM_MERCHANT_ID;
    this.merchantKey = config.PAYTM_MERCHANT_KEY;
    this.website = config.PAYTM_WEBSITE;
    this.channelId = config.PAYTM_CHANNEL_ID;
    this.industryTypeId = config.PAYTM_INDUSTRY_TYPE_ID;
    this.callbackUrl = config.PAYTM_CALLBACK_URL;
  }

  /**
   * Generate checksum for Paytm API
   */
  private generateChecksum(params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    return crypto
      .createHmac('sha256', this.merchantKey)
      .update(sortedParams)
      .digest('hex');
  }

  /**
   * Verify checksum from Paytm response
   */
  private verifyChecksum(params: Record<string, any>, checksum: string): boolean {
    const generatedChecksum = this.generateChecksum(params);
    return generatedChecksum === checksum;
  }

  /**
   * Create payment request
   */
  async createPaymentRequest(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const params = {
        MID: this.merchantId,
        ORDER_ID: paymentData.orderId,
        CUST_ID: paymentData.customerId,
        MOBILE_NO: paymentData.customerPhone,
        EMAIL: paymentData.customerEmail,
        TXN_AMOUNT: paymentData.amount.toString(),
        CHANNEL_ID: this.channelId,
        WEBSITE: this.website,
        INDUSTRY_TYPE_ID: this.industryTypeId,
        CALLBACK_URL: paymentData.callbackUrl,
        PAYMENT_MODE_ONLY: 'YES',
        AUTH_MODE: 'USRPWD',
        PAYMENT_TYPE_ID: 'UPI'
      };

      const checksum = this.generateChecksum(params);
      params['CHECKSUMHASH'] = checksum;

      const response = await axios.post(
        `${this.baseUrl}/theia/api/v1/initiateTransaction?mid=${this.merchantId}&orderId=${paymentData.orderId}`,
        params,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.STATUS === 'TXN_SUCCESS') {
        return {
          orderId: paymentData.orderId,
          transactionId: response.data.TXNID,
          amount: paymentData.amount,
          status: PaymentStatus.COMPLETED,
          paymentUrl: response.data.paytmResponse,
          createdAt: new Date()
        };
      } else {
        return {
          orderId: paymentData.orderId,
          transactionId: '',
          amount: paymentData.amount,
          status: PaymentStatus.FAILED,
          createdAt: new Date()
        };
      }
    } catch (error) {
      console.error('Paytm payment creation error:', error);
      throw new Error('Failed to create payment request');
    }
  }

  /**
   * Verify payment callback
   */
  async verifyPaymentCallback(callbackData: Record<string, any>): Promise<{
    isValid: boolean;
    transactionId?: string;
    amount?: number;
    status?: PaymentStatus;
  }> {
    try {
      const checksum = callbackData.CHECKSUMHASH;
      delete callbackData.CHECKSUMHASH;

      const isValidChecksum = this.verifyChecksum(callbackData, checksum);
      
      if (!isValidChecksum) {
        return { isValid: false };
      }

      const status = callbackData.STATUS === 'TXN_SUCCESS' 
        ? PaymentStatus.COMPLETED 
        : PaymentStatus.FAILED;

      return {
        isValid: true,
        transactionId: callbackData.TXNID,
        amount: parseFloat(callbackData.TXN_AMOUNT),
        status
      };
    } catch (error) {
      console.error('Paytm callback verification error:', error);
      return { isValid: false };
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(orderId: string): Promise<PaymentResponse> {
    try {
      const params = {
        MID: this.merchantId,
        ORDERID: orderId
      };

      const checksum = this.generateChecksum(params);
      params['CHECKSUMHASH'] = checksum;

      const response = await axios.post(
        `${this.baseUrl}/v3/order/status`,
        params,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const status = response.data.STATUS === 'TXN_SUCCESS' 
        ? PaymentStatus.COMPLETED 
        : PaymentStatus.FAILED;

      return {
        orderId,
        transactionId: response.data.TXNID || '',
        amount: parseFloat(response.data.TXN_AMOUNT || '0'),
        status,
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Paytm status check error:', error);
      throw new Error('Failed to check payment status');
    }
  }

  /**
   * Process refund
   */
  async processRefund(
    orderId: string,
    transactionId: string,
    refundAmount: number,
    refundReason: string
  ): Promise<{
    success: boolean;
    refundId?: string;
    message?: string;
  }> {
    try {
      const params = {
        MID: this.merchantId,
        TXNID: transactionId,
        ORDERID: orderId,
        REFUNDAMOUNT: refundAmount.toString(),
        TXNTYPE: 'REFUND',
        REFUNDREASON: refundReason
      };

      const checksum = this.generateChecksum(params);
      params['CHECKSUMHASH'] = checksum;

      const response = await axios.post(
        `${this.baseUrl}/refund/HANDLER_INTERNAL/REFUND`,
        params,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.STATUS === 'TXN_SUCCESS') {
        return {
          success: true,
          refundId: response.data.REFUNDID,
          message: 'Refund processed successfully'
        };
      } else {
        return {
          success: false,
          message: response.data.RESPMSG || 'Refund failed'
        };
      }
    } catch (error) {
      console.error('Paytm refund error:', error);
      return {
        success: false,
        message: 'Failed to process refund'
      };
    }
  }
}

export const paytmService = new PaytmService();
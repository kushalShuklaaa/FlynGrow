import dotenv from 'dotenv';
import { Environment } from '@studyhub/types';

// Load environment variables
dotenv.config();

const config: Environment = {
  NODE_ENV: (process.env.NODE_ENV as Environment['NODE_ENV']) || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/studyhub',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  PAYTM_MERCHANT_ID: process.env.PAYTM_MERCHANT_ID || '',
  PAYTM_MERCHANT_KEY: process.env.PAYTM_MERCHANT_KEY || '',
  PAYTM_WEBSITE: process.env.PAYTM_WEBSITE || 'WEBSTAGING',
  PAYTM_CHANNEL_ID: process.env.PAYTM_CHANNEL_ID || 'WEB',
  PAYTM_INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE_ID || 'Retail',
  PAYTM_CALLBACK_URL: process.env.PAYTM_CALLBACK_URL || 'http://localhost:5000/api/payments/callback',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || '',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  ADMIN_URL: process.env.ADMIN_URL || 'http://localhost:3001'
};

export default config;
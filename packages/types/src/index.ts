// User Types
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isEmailVerified: boolean;
  avatar?: string;
  phone?: string;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// Product Types
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subcategory?: string;
  tags: string[];
  images: string[];
  files: ProductFile[];
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export enum ProductCategory {
  IELTS = 'ielts',
  GRE = 'gre',
  TOEFL = 'toefl',
  GMAT = 'gmat',
  PROGRAMMING = 'programming',
  CAREER = 'career',
  ROADMAPS = 'roadmaps'
}

export interface ProductFile {
  name: string;
  url: string;
  type: FileType;
  size: number;
  isPreview: boolean;
}

export enum FileType {
  PDF = 'pdf',
  ZIP = 'zip',
  DOC = 'doc',
  DOCX = 'docx',
  PPT = 'ppt',
  PPTX = 'pptx'
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Coupon Types
export interface Coupon {
  _id: string;
  code: string;
  description: string;
  type: CouponType;
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  validFrom: Date;
  validUntil: Date;
  applicableCategories?: ProductCategory[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export enum CouponType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed'
}

// Order Types
export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  user: User;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  coupon?: Coupon;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentId?: string;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  totalPrice: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum PaymentMethod {
  PAYTM = 'paytm',
  UPI = 'upi',
  CARD = 'card',
  NET_BANKING = 'net_banking'
}

// Payment Types
export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  customerId: string;
  customerEmail: string;
  customerPhone: string;
  callbackUrl: string;
}

export interface PaymentResponse {
  orderId: string;
  transactionId: string;
  amount: number;
  status: PaymentStatus;
  paymentUrl?: string;
  createdAt: Date;
}

// Review Types
export interface Review {
  _id: string;
  userId: string;
  user: User;
  productId: string;
  product: Product;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Types
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  monthlyRevenue: number;
  monthlyOrders: number;
  topSellingProducts: ProductSales[];
  recentOrders: Order[];
  revenueChart: ChartData[];
  ordersChart: ChartData[];
}

export interface ProductSales {
  product: Product;
  totalSales: number;
  totalRevenue: number;
  orderCount: number;
}

export interface ChartData {
  date: string;
  value: number;
  label?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Filter Types
export interface ProductFilters {
  category?: ProductCategory;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  tags?: string[];
  search?: string;
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
}

export enum ProductSortBy {
  PRICE = 'price',
  RATING = 'rating',
  CREATED_AT = 'createdAt',
  DOWNLOAD_COUNT = 'downloadCount',
  REVIEW_COUNT = 'reviewCount'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

// File Upload Types
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

// Email Types
export interface EmailTemplate {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

export interface OrderConfirmationEmail {
  user: User;
  order: Order;
  downloadLinks: string[];
}

// Environment Types
export interface Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  MONGODB_URI: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  PAYTM_MERCHANT_ID: string;
  PAYTM_MERCHANT_KEY: string;
  PAYTM_WEBSITE: string;
  PAYTM_CHANNEL_ID: string;
  PAYTM_INDUSTRY_TYPE_ID: string;
  PAYTM_CALLBACK_URL: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  AWS_S3_BUCKET: string;
  FRONTEND_URL: string;
  ADMIN_URL: string;
}
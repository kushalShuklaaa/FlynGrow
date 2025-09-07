import mongoose, { Schema, Document } from 'mongoose';
import { Coupon, CouponType, ProductCategory } from '@studyhub/types';

export interface ICoupon extends Coupon, Document {}

const CouponSchema = new Schema<ICoupon>({
  code: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true,
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: Object.values(CouponType), 
    required: true 
  },
  value: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  minOrderAmount: { 
    type: Number, 
    min: 0 
  },
  maxDiscountAmount: { 
    type: Number, 
    min: 0 
  },
  usageLimit: { 
    type: Number, 
    min: 1 
  },
  usedCount: { 
    type: Number, 
    default: 0, 
    min: 0 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  validFrom: { 
    type: Date, 
    required: true 
  },
  validUntil: { 
    type: Date, 
    required: true 
  },
  applicableCategories: [{ 
    type: String, 
    enum: Object.values(ProductCategory) 
  }],
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true
});

// Indexes
CouponSchema.index({ code: 1 });
CouponSchema.index({ isActive: 1 });
CouponSchema.index({ validFrom: 1, validUntil: 1 });
CouponSchema.index({ createdAt: -1 });

export const CouponModel = mongoose.model<ICoupon>('Coupon', CouponSchema);
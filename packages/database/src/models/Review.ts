import mongoose, { Schema, Document } from 'mongoose';
import { Review } from '@studyhub/types';

export interface IReview extends Review, Document {}

const ReviewSchema = new Schema<IReview>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  productId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  comment: { 
    type: String, 
    required: true 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  helpfulCount: { 
    type: Number, 
    default: 0, 
    min: 0 
  }
}, {
  timestamps: true
});

// Indexes
ReviewSchema.index({ productId: 1 });
ReviewSchema.index({ userId: 1 });
ReviewSchema.index({ rating: 1 });
ReviewSchema.index({ createdAt: -1 });

// Ensure one review per user per product
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);
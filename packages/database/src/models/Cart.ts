import mongoose, { Schema, Document } from 'mongoose';
import { Cart, CartItem } from '@studyhub/types';

export interface ICart extends Cart, Document {}

const CartItemSchema = new Schema<CartItem>({
  product: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  addedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { _id: false });

const CartSchema = new Schema<ICart>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  items: [CartItemSchema],
  totalAmount: { 
    type: Number, 
    default: 0, 
    min: 0 
  }
}, {
  timestamps: true
});

// Indexes
CartSchema.index({ userId: 1 });

export const CartModel = mongoose.model<ICart>('Cart', CartSchema);
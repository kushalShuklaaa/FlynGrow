import mongoose, { Schema, Document } from 'mongoose';
import { Product, ProductCategory, ProductFile, FileType } from '@studyhub/types';

export interface IProduct extends Product, Document {}

const ProductFileSchema = new Schema<ProductFile>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { 
    type: String, 
    enum: Object.values(FileType), 
    required: true 
  },
  size: { type: Number, required: true },
  isPreview: { type: Boolean, default: false }
}, { _id: false });

const ProductSchema = new Schema<IProduct>({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  originalPrice: { 
    type: Number, 
    min: 0 
  },
  category: { 
    type: String, 
    enum: Object.values(ProductCategory), 
    required: true 
  },
  subcategory: { 
    type: String, 
    trim: true 
  },
  tags: [{ 
    type: String, 
    trim: true 
  }],
  images: [{ 
    type: String 
  }],
  files: [ProductFileSchema],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  isFeatured: { 
    type: Boolean, 
    default: false 
  },
  rating: { 
    type: Number, 
    default: 0, 
    min: 0, 
    max: 5 
  },
  reviewCount: { 
    type: Number, 
    default: 0 
  },
  downloadCount: { 
    type: Number, 
    default: 0 
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true
});

// Indexes
ProductSchema.index({ title: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ subcategory: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: -1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ createdAt: -1 });

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
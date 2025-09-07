import mongoose, { Schema, Document } from 'mongoose';
import { Order, OrderItem, OrderStatus, PaymentStatus, PaymentMethod, Address } from '@studyhub/types';

export interface IOrder extends Order, Document {}

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

const OrderItemSchema = new Schema<OrderItem>({
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
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  totalPrice: { 
    type: Number, 
    required: true, 
    min: 0 
  }
}, { _id: false });

const OrderSchema = new Schema<IOrder>({
  orderNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [OrderItemSchema],
  subtotal: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  discount: { 
    type: Number, 
    default: 0, 
    min: 0 
  },
  totalAmount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  coupon: { 
    type: Schema.Types.ObjectId, 
    ref: 'Coupon' 
  },
  status: { 
    type: String, 
    enum: Object.values(OrderStatus), 
    default: OrderStatus.PENDING 
  },
  paymentStatus: { 
    type: String, 
    enum: Object.values(PaymentStatus), 
    default: PaymentStatus.PENDING 
  },
  paymentMethod: { 
    type: String, 
    enum: Object.values(PaymentMethod), 
    required: true 
  },
  paymentId: { 
    type: String 
  },
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema,
  notes: { 
    type: String 
  }
}, {
  timestamps: true
});

// Indexes
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ createdAt: -1 });

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
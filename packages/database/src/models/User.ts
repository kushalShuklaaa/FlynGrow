import mongoose, { Schema, Document } from 'mongoose';
import { User, UserRole, Address } from '@studyhub/types';

export interface IUser extends User, Document {}

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

const UserSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true 
  },
  firstName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  lastName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: Object.values(UserRole), 
    default: UserRole.USER 
  },
  isEmailVerified: { 
    type: Boolean, 
    default: false 
  },
  avatar: { 
    type: String 
  },
  phone: { 
    type: String 
  },
  address: AddressSchema,
  refreshTokens: [{ 
    type: String 
  }],
  emailVerificationToken: { 
    type: String 
  },
  passwordResetToken: { 
    type: String 
  },
  passwordResetExpires: { 
    type: Date 
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.refreshTokens;
      delete ret.emailVerificationToken;
      delete ret.passwordResetToken;
      delete ret.passwordResetExpires;
      return ret;
    }
  }
});

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: -1 });

export const UserModel = mongoose.model<IUser>('User', UserSchema);
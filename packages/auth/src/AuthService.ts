import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User, AuthResponse } from '@studyhub/types';
import config from '@studyhub/config';

export class AuthService {
  /**
   * Hash password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare password with hash
   */
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate JWT access token
   */
  static generateAccessToken(user: User): string {
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
      issuer: 'studyhub',
      audience: 'studyhub-users'
    });
  }

  /**
   * Generate JWT refresh token
   */
  static generateRefreshToken(user: User): string {
    const payload = {
      userId: user._id,
      type: 'refresh'
    };

    return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
      issuer: 'studyhub',
      audience: 'studyhub-users'
    });
  }

  /**
   * Verify JWT access token
   */
  static verifyAccessToken(token: string): any {
    try {
      return jwt.verify(token, config.JWT_SECRET, {
        issuer: 'studyhub',
        audience: 'studyhub-users'
      });
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  /**
   * Verify JWT refresh token
   */
  static verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, config.JWT_REFRESH_SECRET, {
        issuer: 'studyhub',
        audience: 'studyhub-users'
      });
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Generate email verification token
   */
  static generateEmailVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Generate password reset token
   */
  static generatePasswordResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Generate random coupon code
   */
  static generateCouponCode(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate order number
   */
  static generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SH${timestamp.slice(-6)}${random}`;
  }

  /**
   * Create auth response with tokens
   */
  static createAuthResponse(user: User): AuthResponse {
    return {
      user,
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user)
    };
  }

  /**
   * Extract token from Authorization header
   */
  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  /**
   * Validate password strength
   */
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
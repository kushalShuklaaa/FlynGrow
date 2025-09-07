import express from 'express';
import { body, validationResult } from 'express-validator';
import { UserModel } from '@studyhub/database';
import { AuthService } from '@studyhub/auth';
import { emailService } from '@studyhub/email';
import { ApiResponse, LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from '@studyhub/types';

const router = express.Router();

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('firstName').trim().isLength({ min: 2 }),
  body('lastName').trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, firstName, lastName }: RegisterRequest = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Validate password strength
    const passwordValidation = AuthService.validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet requirements',
        errors: passwordValidation.errors
      });
    }

    // Hash password
    const hashedPassword = await AuthService.hashPassword(password);

    // Generate email verification token
    const emailVerificationToken = AuthService.generateEmailVerificationToken();

    // Create user
    const user = new UserModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      emailVerificationToken
    });

    await user.save();

    // Send verification email
    await emailService.sendEmailVerification(user, emailVerificationToken);

    const response: ApiResponse = {
      success: true,
      message: 'User registered successfully. Please check your email for verification.',
      data: {
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isEmailVerified
        }
      }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password }: LoginRequest = req.body;

    // Find user
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await AuthService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate tokens
    const authResponse = AuthService.createAuthResponse(user);

    // Store refresh token
    user.refreshTokens.push(authResponse.refreshToken);
    await user.save();

    const response: ApiResponse = {
      success: true,
      message: 'Login successful',
      data: authResponse
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Verify email
router.post('/verify-email', [
  body('token').notEmpty()
], async (req, res) => {
  try {
    const { token } = req.body;

    const user = await UserModel.findOne({ emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    const response: ApiResponse = {
      success: true,
      message: 'Email verified successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Email verification failed'
    });
  }
});

// Forgot password
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const { email }: ForgotPasswordRequest = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not
      return res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      });
    }

    // Generate reset token
    const resetToken = AuthService.generatePasswordResetToken();
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send reset email
    await emailService.sendPasswordResetEmail(user, resetToken);

    const response: ApiResponse = {
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent'
    };

    res.json(response);
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset request failed'
    });
  }
});

// Reset password
router.post('/reset-password', [
  body('token').notEmpty(),
  body('password').isLength({ min: 8 })
], async (req, res) => {
  try {
    const { token, password }: ResetPasswordRequest = req.body;

    const user = await UserModel.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Validate password strength
    const passwordValidation = AuthService.validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet requirements',
        errors: passwordValidation.errors
      });
    }

    // Hash new password
    const hashedPassword = await AuthService.hashPassword(password);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokens = []; // Invalidate all refresh tokens
    await user.save();

    const response: ApiResponse = {
      success: true,
      message: 'Password reset successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed'
    });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    const decoded = AuthService.verifyRefreshToken(refreshToken);
    const user = await UserModel.findById(decoded.userId);

    if (!user || !user.refreshTokens.includes(refreshToken)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const authResponse = AuthService.createAuthResponse(user);

    // Update refresh tokens
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    user.refreshTokens.push(authResponse.refreshToken);
    await user.save();

    const response: ApiResponse = {
      success: true,
      message: 'Token refreshed successfully',
      data: authResponse
    };

    res.json(response);
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      const decoded = AuthService.verifyRefreshToken(refreshToken);
      const user = await UserModel.findById(decoded.userId);
      
      if (user) {
        user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
        await user.save();
      }
    }

    const response: ApiResponse = {
      success: true,
      message: 'Logged out successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

export default router;
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { EmailTemplate, OrderConfirmationEmail, User } from '@studyhub/types';
import config from '@studyhub/config';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_PORT === 465,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS
      }
    });
  }

  /**
   * Send email using template
   */
  async sendEmail(template: EmailTemplate): Promise<boolean> {
    try {
      const templatePath = path.join(__dirname, 'templates', `${template.template}.hbs`);
      const templateContent = fs.readFileSync(templatePath, 'utf8');
      const compiledTemplate = handlebars.compile(templateContent);
      const html = compiledTemplate(template.data);

      const mailOptions = {
        from: `StudyHub <${config.SMTP_USER}>`,
        to: template.to,
        subject: template.subject,
        html
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(user: User, verificationToken: string): Promise<boolean> {
    const verificationUrl = `${config.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    return this.sendEmail({
      to: user.email,
      subject: 'Welcome to StudyHub - Verify Your Email',
      template: 'welcome',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        verificationUrl
      }
    });
  }

  /**
   * Send email verification
   */
  async sendEmailVerification(user: User, verificationToken: string): Promise<boolean> {
    const verificationUrl = `${config.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    return this.sendEmail({
      to: user.email,
      subject: 'Verify Your Email Address - StudyHub',
      template: 'email-verification',
      data: {
        firstName: user.firstName,
        verificationUrl
      }
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(user: User, resetToken: string): Promise<boolean> {
    const resetUrl = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    return this.sendEmail({
      to: user.email,
      subject: 'Reset Your Password - StudyHub',
      template: 'password-reset',
      data: {
        firstName: user.firstName,
        resetUrl
      }
    });
  }

  /**
   * Send order confirmation email with download links
   */
  async sendOrderConfirmationEmail(emailData: OrderConfirmationEmail): Promise<boolean> {
    return this.sendEmail({
      to: emailData.user.email,
      subject: `Order Confirmation - ${emailData.order.orderNumber}`,
      template: 'order-confirmation',
      data: {
        user: emailData.user,
        order: emailData.order,
        downloadLinks: emailData.downloadLinks,
        orderUrl: `${config.FRONTEND_URL}/orders/${emailData.order._id}`
      }
    });
  }

  /**
   * Send order status update email
   */
  async sendOrderStatusUpdateEmail(
    user: User,
    orderNumber: string,
    status: string,
    trackingInfo?: string
  ): Promise<boolean> {
    return this.sendEmail({
      to: user.email,
      subject: `Order Update - ${orderNumber}`,
      template: 'order-status-update',
      data: {
        firstName: user.firstName,
        orderNumber,
        status,
        trackingInfo,
        orderUrl: `${config.FRONTEND_URL}/orders`
      }
    });
  }

  /**
   * Send coupon notification email
   */
  async sendCouponNotificationEmail(
    user: User,
    couponCode: string,
    discountValue: string,
    validUntil: string
  ): Promise<boolean> {
    return this.sendEmail({
      to: user.email,
      subject: 'Special Discount Coupon - StudyHub',
      template: 'coupon-notification',
      data: {
        firstName: user.firstName,
        couponCode,
        discountValue,
        validUntil,
        shopUrl: config.FRONTEND_URL
      }
    });
  }

  /**
   * Send admin notification email
   */
  async sendAdminNotificationEmail(
    subject: string,
    message: string,
    data?: Record<string, any>
  ): Promise<boolean> {
    return this.sendEmail({
      to: config.SMTP_USER, // Admin email
      subject: `StudyHub Admin: ${subject}`,
      template: 'admin-notification',
      data: {
        message,
        timestamp: new Date().toISOString(),
        ...data
      }
    });
  }

  /**
   * Send bulk email to multiple users
   */
  async sendBulkEmail(
    recipients: string[],
    subject: string,
    template: string,
    data: Record<string, any>
  ): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const recipient of recipients) {
      const result = await this.sendEmail({
        to: recipient,
        subject,
        template,
        data
      });

      if (result) {
        success++;
      } else {
        failed++;
      }
    }

    return { success, failed };
  }

  /**
   * Test email configuration
   */
  async testEmailConfiguration(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email configuration is valid');
      return true;
    } catch (error) {
      console.error('Email configuration test failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
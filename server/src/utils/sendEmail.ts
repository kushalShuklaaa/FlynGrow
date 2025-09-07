// src/utils/sendEmail.ts
import nodemailer from "nodemailer";

const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"FlynGrow" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;

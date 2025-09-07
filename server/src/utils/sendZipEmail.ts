import nodemailer from "nodemailer";

export const sendZipEmail = async (
  toEmail: string,
  productTitle: string,
  downloadUrl: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"FlynGrow" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Your Product: ${productTitle}`,
    html: `
      <p>Hi,</p>
      <p>Thank you for your order!</p>
      <p><strong>Product:</strong> ${productTitle}</p>
      <p>You can download your ZIP file here:</p>
      <p><a href="${downloadUrl}">${downloadUrl}</a></p>
      <p>Regards,<br>FlynGrow Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

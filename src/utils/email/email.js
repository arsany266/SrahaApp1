import nodemailer from "nodemailer";
import { SMTP_PASS, SMTP_USER } from "../../../config/confi.service.js";

export async function sendEmail({
  to = "",
  subject = "",
  text = "",
  html = "",
  attachments = [],
  cc = "",
  bcc = "",
}) {

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_USER, //real_email
      pass: SMTP_PASS, // not real_password previous using real password  // using app_password //Password wahmi
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Arsanycompany" <${SMTP_USER}>`, // sender address
      to, // list of recipients
      subject, // subject line
      text, // plain text body
      html, // HTML body
      attachments,
      cc,
      bcc,
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

export const emailSubject = {
  confirmEmail: "Confirm Your Email",
  resetPassword: "Rest Your Password",
  welcome: "Welcome to Route Academy",
  contactUs: "contactUs",
};

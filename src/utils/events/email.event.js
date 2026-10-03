import { EventEmitter, listenerCount } from "node:events";
import { emailSubject, sendEmail } from "../email/email.js";
import { ForgetPasswordEmailTemplate, template } from "../email/generateHtml.js";

export const emailEvent = new EventEmitter();

emailEvent.on("confirmEmail", async (data) => {
  await sendEmail({
    to: data.to,
    subject: emailSubject.confirmEmail,
    html: template(data.firstName , data.otp),
  }).catch((error) => {
    console.log("Error sending confirl email", error);
  });
});


emailEvent.on("ForgetPassword", async (data) => {
  await sendEmail({
    to: data.to,
    subject: emailSubject.resetPassword, 
    html: ForgetPasswordEmailTemplate(data.firstName , data.otp),    
  }).catch((error) => {
    console.log("Error sending reset password email", error);
  });
});

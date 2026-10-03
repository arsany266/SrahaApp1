export const template=(firstName , otp) => {
return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>رمز التحقق الخاص بك</title>
<style>
body {
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
background-color: #f4f6f9;
margin: 0;
padding: 0;
direction: rtl;
}
.container {
max-width: 550px;
margin: 30px auto;
background-color: #ffffff;
border-radius: 12px;
overflow: hidden;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
border: 1px solid #e1e8ed;
}
.header {
background: linear-gradient(135deg, #4f46e5, #6366f1);
color: #ffffff;
padding: 25px;
text-align: center;
}
.header h1 {
margin: 0;
font-size: 22px;
font-weight: 600;
}
.content {
padding: 30px;
color: #333333;
line-height: 1.6;
}
.greeting {
font-size: 18px;
font-weight: bold;
color: #1f2937;
margin-bottom: 10px;
}
.otp-card {
background-color: #f3f4f6;
border-radius: 8px;
padding: 20px;
text-align: center;
margin: 25px 0;
border: 1px dashed #cbd5e1;
}
.otp-code {
font-size: 32px;
font-weight: 800;
letter-spacing: 6px;
color: #4f46e5;
margin: 10px 0;
font-family: 'Courier New', Courier, monospace;
}
.expiry {
font-size: 13px;
color: #6b7280;
margin-top: 5px;
}
.footer {
background-color: #f9fafb;
padding: 15px;
text-align: center;
font-size: 12px;
color: #9ca3af;
border-top: 1px solid #f1f5f9;
}
</style>
</head>
<body>

<div class="container">
<!-- Header -->
<div class="header">
<h1>مرحباً بك معنا! 👋</h1>
</div>

<!-- Content -->
<div class="content">
<div class="greeting">أهلاً ${firstName}،</div>
<p>شكراً لتسجيلك في حسابك الجديد. يُرجى استخدام رمز التحقق (OTP) التالي لتأكيد بريدك الإلكتروني وإتمام عملية التسجيل:</p>

<!-- OTP Box -->
<div class="otp-card">
<div style="font-size: 14px; color: #4b5563;">رمز التحقق الخاص بك هو:</div>
<div class="otp-code">${otp}</div>
<div class="expiry">⏱️ هذا الرمز صالِح لمدة 10 دقائق فقط.</div>
</div>

<p style="font-size: 14px; color: #6b7280;">إذا لم تقم بطلب هذا الرمز، يمكنك العبود وتجاهل هذا البريد الإلكتروني بصفة آمنة.</p>
</div>

<!-- Footer -->
<div class="footer">
&copy; 2026 جميع الحقوق محفوظة لشركتك.
</div>
</div>

</body>
</html>
`
}

export const ForgetPasswordEmailTemplate = (firstName, otp ) => {
  return `
  <!DOCTYPE html>
  <html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إعادة ضبط كلمة المرور</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f6f9;
        margin: 0;
        padding: 0;
        direction: rtl;
      }
      .container {
        max-width: 550px;
        margin: 30px auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        border: 1px solid #e1e8ed;
      }
      .header {
        background: linear-gradient(135deg, #dc2626, #ef4444);
        color: #ffffff;
        padding: 25px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
      }
      .content {
        padding: 30px;
        color: #333333;
        line-height: 1.6;
      }
      .greeting {
        font-size: 18px;
        font-weight: bold;
        color: #1f2937;
        margin-bottom: 10px;
      }
      .otp-card {
        background-color: #fef2f2;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        margin: 25px 0;
        border: 1px dashed #fca5a5;
      }
      .otp-code {
        font-size: 32px;
        font-weight: 800;
        letter-spacing: 6px;
        color: #dc2626;
        margin: 10px 0;
        font-family: 'Courier New', Courier, monospace;
      }
      .expiry {
        font-size: 13px;
        color: #991b1b;
        margin-top: 5px;
      }
      .warning {
        background-color: #fffbe3;
        border-right: 4px solid #f59e0b;
        padding: 12px 15px;
        font-size: 13px;
        color: #b45309;
        border-radius: 4px;
        margin-top: 20px;
      }
      .footer {
        background-color: #f9fafb;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #9ca3af;
        border-top: 1px solid #f1f5f9;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>إعادة ضبط كلمة المرور 🔐</h1>
      </div>

      <!-- Content -->
      <div class="content">
        <div class="greeting">أهلاً ${firstName}،</div>
        <p>لقد تلقينا طلباً لإعادة ضبط كلمة المرور الخاصة بحسابك. استخدم كود التحقق التالي لإكمال العملية:</p>
        
        <!-- OTP Box -->
        <div class="otp-card">
          <div style="font-size: 14px; color: #7f1d1d;">رمز إعادة الضبط هو:</div>
          <div class="otp-code">${otp}</div>
          <div class="expiry">⏱️ هذا الرمز صالِح لمدة 10 دقائق فقط.</div>
        </div>

        <!-- Security Warning -->
        <div class="warning">
          <strong>تنبيه أمني:</strong> إذا لم تطلب إعادة ضبط كلمة المرور، يرجى تجاهل هذا البريد الإلكتروني. حسابك آمن ولم يتم إجراء أي تغيير عليه.
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        &copy; ${new Date().getFullYear()} جميع الحقوق محفوظة.
      </div>
    </div>
  </body>
  </html>
  `;
};

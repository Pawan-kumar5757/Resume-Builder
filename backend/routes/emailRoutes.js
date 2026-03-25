import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { toEmail, pdfBase64, password } = req.body;

  if (!toEmail || !pdfBase64) {
    return res.status(400).json({ success: false, error: 'Email and PDF are required' });
  }

  try {
    let transporter;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      let testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: testAccount.user, 
          pass: testAccount.pass, 
        },
      });
      console.warn("Using Ethereal email for testing. Set EMAIL_USER and EMAIL_PASS in .env to send real emails.");
    }

    const pdfBuffer = Buffer.from(pdfBase64.split('base64,')[1] || pdfBase64, 'base64');

    const info = await transporter.sendMail({
      from: '"Dynamic Resume Builder" <no-reply@resumebuilder.local>',
      to: toEmail,
      subject: "Your Encrypted Resume PDF is Here",
      text: `Hello,\n\nPlease find attached your newly generated Resume.\n\nIMPORTANT: The PDF is password protected.\nYour password format is UserName-DOB. Example: JohnDoe-15081995\nActual expected password: ${password}\n\nThank you for using our builder!`,
      attachments: [
        {
          filename: 'resume.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    res.json({ success: true, message: 'Email sent successfully', previewUrl: nodemailer.getTestMessageUrl(info) });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send email' });
  }
});

export default router;

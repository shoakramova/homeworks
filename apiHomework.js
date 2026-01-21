const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());


function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env: NAME`);
  }
  if (typeof value !== 'string') {
    throw new Error(`bo'lsa qiymatni qaytarsin (string)`);
  }
  return value;
}

let GMAIL_USER, GMAIL_PASS, MAIL_FROM;

try {
  GMAIL_USER = requireEnv('GMAIL_USER');
  GMAIL_PASS = requireEnv('GMAIL_PASS');
  MAIL_FROM = process.env.MAIL_FROM || 'CodingCamp IT Academy <yourgmail@gmail.com>';
} catch (error) {
  console.error('Server ishga tushishda GMAIL_USER va GMAIL_PASS majburiy tekshirilsin.');
  console.error('ENV yetishmaso — server start bo\'lmasin (requireEnv error).');
  process.exit(1);
}


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  }
});


async function sendWithLogging(to, subject, text, html) {
  try {

    if (!to || !subject) {
      throw new Error('to va subject majburiy');
    }

    if (!text && !html) {
      throw new Error('text yoki html dan kamida bittasi bo\'lsin');
    }

    const info = await transporter.sendMail({
      from: MAIL_FROM,
      to: to,
      subject: subject,
      text: text,
      html: html
    });

    console.log('Email yuborildi:');
    console.log('messageId:', info.messageId);
    console.log('accepted:', info.accepted);
    console.log('rejected:', info.rejected);

    return {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    };

  } catch (error) {
    console.error('Email yuborishda xatolik:', error.message);
    throw error;
  }
}


app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ error: 'to va subject majburiy' });
    }

    if (!text && !html) {
      return res.status(400).json({ error: 'text yoki html dan kamida bittasi bo\'lsin' });
    }

    const result = await sendWithLogging(to, subject, text, html);
    
    res.status(200).json({
      success: true,
      ...result
    });

  } catch (error) {
    res.status(500).json({
      error: 'Email yuborishda xatolik',
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlamoqda`);
});

module.exports = { sendWithLogging };
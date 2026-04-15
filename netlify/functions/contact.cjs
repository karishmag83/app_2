const nodemailer = require('nodemailer')

const buildCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
})

const createTransporter = () => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
  } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Missing SMTP configuration in environment variables.')
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: buildCorsHeaders(),
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: buildCorsHeaders(),
      body: JSON.stringify({ error: 'Method not allowed.' }),
    }
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch (error) {
    return {
      statusCode: 400,
      headers: buildCorsHeaders(),
      body: JSON.stringify({ error: 'Invalid JSON payload.' }),
    }
  }

  const { name, email, subject, message } = payload || {}

  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      headers: buildCorsHeaders(),
      body: JSON.stringify({ error: 'Missing required fields.' }),
    }
  }

  try {
    const transporter = createTransporter()
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Karishma Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || 'karishmaworks08@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br />')}</p>
      `,
    })

    return {
      statusCode: 200,
      headers: buildCorsHeaders(),
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    console.error('Contact email failed', error)
    return {
      statusCode: 500,
      headers: buildCorsHeaders(),
      body: JSON.stringify({ error: 'Email failed to send.' }),
    }
  }
}

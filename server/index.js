import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  methods: ['POST', 'OPTIONS'],
}))
app.use(express.json({ limit: '1mb' }))

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  CONTACT_TO,
} = process.env

const createTransporter = () => {
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

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {}

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  try {
    const transporter = createTransporter()
    await transporter.sendMail({
      from: SMTP_FROM || `"Karishma Portfolio" <${SMTP_USER}>`,
      to: CONTACT_TO || 'karishmaworks08@gmail.com',
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

    return res.json({ ok: true })
  } catch (error) {
    console.error('Contact email failed', error)
    return res.status(500).json({ error: 'Email failed to send.' })
  }
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`)
})

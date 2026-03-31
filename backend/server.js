const express    = require('express')
const nodemailer = require('nodemailer')
const cors       = require('cors')
const dotenv     = require('dotenv')
const axios      = require('axios')
const QRCode     = require('qrcode')
const fs         = require('fs') 
const path       = require('path')  

dotenv.config()

const app = express()
app.use(cors({
  origin: [
    'http://localhost:5173',                      // for local development
    'https://roast-and-ritual-mu.vercel.app',          // for live website
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}))


app.use(express.json())

// ───── DATA FILE PATHS ─────
// These JSON files store your orders and messages
const ORDERS_FILE   = path.join(__dirname, 'data', 'orders.json')
const MESSAGES_FILE = path.join(__dirname, 'data', 'messages.json')

const ensureDataFiles = () => {
  const dataDir = path.join(__dirname, 'data')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
  if (!fs.existsSync(ORDERS_FILE))   fs.writeFileSync(ORDERS_FILE,   '[]')
  if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]')
}
ensureDataFiles()

// ───── HELPER: read and write JSON ─────
const readJSON  = (file)        => JSON.parse(fs.readFileSync(file, 'utf8'))
const writeJSON = (file, data)  => fs.writeFileSync(file, JSON.stringify(data, null, 2))

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,  // your brevo login email
    pass: process.env.BREVO_PASS,  // your brevo SMTP key
  },
})

// ───── ROUTE 1: PLACE ORDER ─────
app.post('/api/order', async (req, res) => {
  const { cart, total, paymentMethod } = req.body

  // Save order to orders.json
  try {
    const orders = readJSON(ORDERS_FILE)
    const newOrder = {
      id:            Date.now(),
      date:          new Date().toLocaleString('en-KE'),
      items:         cart,
      total,
      paymentMethod,
      status: paymentMethod.startsWith('Bitcoin') ? 'Pending BTC Verification' : 'Confirmed'
    }
    orders.push(newOrder)
    writeJSON(ORDERS_FILE, orders)
  } catch (err) {
    console.error('Could not save order:', err.message)
  }

  // Send email separately — don't let email failure break the order
  const itemList = cart.map(item =>
    `• ${item.name} x${item.qty} — KES ${(item.price * item.qty).toFixed(2)}`
  ).join('\n')

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to:   process.env.EMAIL_USER,
    subject: `☕ New Order — KES ${total.toFixed(2)}`,
    text: `
You have a new order!

━━━━━━━━━━━━━━━━━━━━━━
ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━
${itemList}

━━━━━━━━━━━━━━━━━━━━━━
TOTAL:          KES ${total.toFixed(2)}
PAYMENT METHOD: ${paymentMethod}
━━━━━━━━━━━━━━━━━━━━━━
    `,
  }


  try {
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (err) {
    console.error('Email error:', err.message)
  }

  res.json({ success: true, message: 'Order received!' })
})


// ───── ROUTE 2: CONTACT FORM ─────
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body

  // Save message
  try {
    const messages = readJSON(MESSAGES_FILE)
    const newMessage = {
      id:        Date.now(),
      date:      new Date().toLocaleString('en-KE'),
      firstName,
      lastName,
      email,
      subject,
      message,
      read: false
    }
    messages.push(newMessage)
    writeJSON(MESSAGES_FILE, messages)
  } catch (err) {
    console.error('Could not save message:', err.message)
  }

  // Send email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to:   process.env.EMAIL_USER,
    subject: `📩 Contact Form — ${subject}`,
    text: `
New message from your website!

━━━━━━━━━━━━━━━━━━━━━━
FROM
━━━━━━━━━━━━━━━━━━━━━━
Name:    ${firstName} ${lastName}
Email:   ${email}
Subject: ${subject}

━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━
${message}
    `,
  }

  
  try {
    await transporter.sendMail(mailOptions)
    console.log('Contact email sent successfully')
  } catch (err) {
    console.error('Contact email error:', err.message)
  }

  res.json({ success: true, message: 'Message sent!' })
})

// ───── ROUTE 3: LIVE BTC/KES RATE ─────
app.get('/api/btc-rate', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=kes',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'RoastAndRitual/1.0'
        },
        timeout: 10000  // 10 second timeout
      }
    )
    const rate = response.data.bitcoin.kes
    res.json({ rate })
  } catch (err) {
    console.error('BTC rate error:', err.message)
    // fallback rate if CoinGecko is down
    res.json({ rate: 8500000 })
  }
})

// ───── ROUTE 4: BITCOIN QR CODE ─────
app.get('/api/btc-qr', async (req, res) => {
  const BTC_ADDRESS = 'bc1qvnqecredevffcsq0v952sd3szqhxx76rwkefsj'
  try {
    const qrDataUrl = await QRCode.toDataURL(BTC_ADDRESS, {
      width: 200,
      margin: 2,
      color: { dark: '#1a0e07', light: '#f5ede0' },
    })
    res.json({ qr: qrDataUrl })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not generate QR code' })
  }
})

// ───── ROUTE 5: DASHBOARD LOGIN ─────
// Simple password check — no database needed
app.post('/api/dashboard/login', (req, res) => {
  const { password } = req.body
  if (password === process.env.DASHBOARD_PASS) {
    res.json({ success: true })
  } else {
    res.status(401).json({ success: false, message: 'Wrong password' })
  }
})

// ───── ROUTE 6: GET ALL ORDERS ─────
app.get('/api/dashboard/orders', (req, res) => {
  const orders = readJSON(ORDERS_FILE)
  res.json(orders.reverse()) // newest first
})

// ───── ROUTE 7: GET ALL MESSAGES ─────
app.get('/api/dashboard/messages', (req, res) => {
  const messages = readJSON(MESSAGES_FILE)
  res.json(messages.reverse()) // newest first
})

// ───── ROUTE 8: MARK MESSAGE AS READ ─────
app.post('/api/dashboard/messages/:id/read', (req, res) => {
  const messages = readJSON(MESSAGES_FILE)
  const updated  = messages.map(m =>
    m.id === parseInt(req.params.id) ? { ...m, read: true } : m
  )
  writeJSON(MESSAGES_FILE, updated)
  res.json({ success: true })
})


// ───── TEST ROUTE ─────
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Backend is working!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
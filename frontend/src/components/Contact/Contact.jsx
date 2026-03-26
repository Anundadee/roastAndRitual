import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [subject,   setSubject]   = useState('General Enquiry')
  const [message,   setMessage]   = useState('')
  const [sent,      setSent]      = useState(false)
  const [sending,   setSending]   = useState(false)

  const handleSubmit = async () => {
    if (!firstName || !email || !message) {
      alert('Please fill in your name, email and message.')
      return
    }
    setSending(true)
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, subject, message })
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (err) {
       console.error('Order failed:', err)
      alert('Could not connect to server. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="page">
      <div className="page-hero">
        <div className="section-label" style={{ color: 'var(--latte)' }}>
          We'd Love to Hear From You
        </div>
        <h1>Contact Us</h1>
        <p>Questions, wholesale enquiries, or just a coffee chat — we're here</p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <div className="section-label">Get In Touch</div>
          <h2>Let's talk coffee.</h2>
          {[
            { icon: '✉️', label: 'Email',        value: 'hello@roastandritual.co.ke' },
            { icon: '📞', label: 'Phone',        value: '+254 712 345 678' },
            { icon: '📍', label: 'Head Office',  value: '12 Kimathi Street, Nairobi CBD' },
            { icon: '⏰', label: 'Office Hours', value: 'Mon–Fri, 8am–5pm EAT' },
          ].map(item => (
            <div className="contact-item" key={item.label}>
              <div className="contact-item-icon">{item.icon}</div>
              <div className="contact-item-text">
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-form-card">
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>
            Send a Message
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Jane"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Doe"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="jane@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <select value={subject} onChange={e => setSubject(e.target.value)}>
              <option>General Enquiry</option>
              <option>Wholesale / B2B</option>
              <option>Order Support</option>
              <option>Feedback</option>
              <option>Press &amp; Media</option>
            </select>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              placeholder="Tell us what's on your mind..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>

          <button
            className="btn-send"
            onClick={handleSubmit}
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send Message →'}
          </button>

          {sent && (
            <div className="success-msg">
              ✓ Message sent! We'll get back to you within 24 hours.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
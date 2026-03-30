import API_URL from '../../config'
import React, { useState } from 'react'
import './Dashboard.css'

const Dashboard = ({ onExit }) => {
  const [authed,   setAuthed]   = useState(false)
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [tab,      setTab]      = useState('orders')
  const [orders,   setOrders]   = useState([])
  const [messages, setMessages] = useState([])
  const [loading,  setLoading]  = useState(false)

  // ── LOGIN ──
  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/dashboard/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) {
        setAuthed(true)
        setError('')
        fetchData()
      } else {
        setError('Wrong password. Please try again.')
      }
    } catch (err) {
      setError('Could not connect to server.', err)
    }
  }

  // ── FETCH ORDERS AND MESSAGES ──
  const fetchData = async () => {
    setLoading(true)
    try {
      const [ordersRes, messagesRes] = await Promise.all([
        fetch(`${API_URL}/api/dashboard/orders`),
        fetch(`${API_URL}/api/dashboard/messages`)
      ])
      setOrders(await ordersRes.json())
      setMessages(await messagesRes.json())
    } catch (err) {
      console.error('Could not fetch dashboard data', err)
    } finally {
      setLoading(false)
    }
  }

  // ── MARK MESSAGE AS READ ──
  const markAsRead = async (id) => {
    await fetch(`${API_URL}/api/dashboard/messages/${id}/read`, {
      method: 'POST'
    })
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }

  // ── STATS ──
  const totalRevenue    = orders.reduce((s, o) => s + o.total, 0)
  const btcOrders       = orders.filter(o => o.paymentMethod.startsWith('Bitcoin'))
  const standardOrders  = orders.filter(o => !o.paymentMethod.startsWith('Bitcoin'))
  const unreadMessages  = messages.filter(m => !m.read).length

  // ── LOGIN SCREEN ──
  if (!authed) {
    return (
      <div className="dash-login-overlay">
        <div className="dash-login-box">
          <div className="dash-login-logo">☕</div>
          <h2>Owner Dashboard</h2>
          <p>Roast &amp; Ritual Coffee Co.</p>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {error && <div className="dash-error">{error}</div>}
          <button onClick={handleLogin}>Login →</button>
          <span onClick={onExit}>← Back to website</span>
        </div>
      </div>
    )
  }

  // ── DASHBOARD ──
  return (
    <div className="dashboard">

      {/* ── SIDEBAR ── */}
      <div className="dash-sidebar">
        <div className="dash-sidebar-brand">
          <span>☕</span>
          <p>Roast &amp; Ritual</p>
          <small>Owner Dashboard</small>
        </div>
        <nav className="dash-nav">
          {[
            { key: 'orders',   label: 'Orders',   icon: '📦' },
            { key: 'payments', label: 'Payments',  icon: '₿'  },
            { key: 'messages', label: 'Messages',  icon: '✉️',  badge: unreadMessages },
          ].map(item => (
            <button
              key={item.key}
              className={`dash-nav-btn ${tab === item.key ? 'active' : ''}`}
              onClick={() => setTab(item.key)}
            >
              <span>{item.icon}</span>
              {item.label}
              {item.badge > 0 && (
                <span className="dash-badge">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
        <button className="dash-logout" onClick={onExit}>
          ← Back to Website
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="dash-main">

        {/* ── STATS ROW ── */}
        <div className="dash-stats">
          {[
            { label: 'Total Orders',   value: orders.length,                  icon: '📦' },
            { label: 'Total Revenue',  value: `KES ${totalRevenue.toFixed(2)}`, icon: '💰' },
            { label: 'BTC Payments',   value: btcOrders.length,               icon: '₿'  },
            { label: 'Unread Messages',value: unreadMessages,                  icon: '✉️' },
          ].map(stat => (
            <div className="dash-stat-card" key={stat.label}>
              <div className="dash-stat-icon">{stat.icon}</div>
              <div className="dash-stat-info">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {loading && <div className="dash-loading">Loading...</div>}

        {/* ── ORDERS TAB ── */}
        {tab === 'orders' && (
          <div className="dash-section">
            <h2>All Orders <span>({orders.length})</span></h2>
            {orders.length === 0 ? (
              <div className="dash-empty">No orders yet.</div>
            ) : (
              orders.map(order => (
                <div className="dash-card" key={order.id}>
                  <div className="dash-card-header">
                    <div>
                      <strong>Order #{order.id}</strong>
                      <span className="dash-date">{order.date}</span>
                    </div>
                    <div className="dash-card-right">
                      <span className={`dash-status ${order.status === 'Confirmed' ? 'confirmed' : 'pending'}`}>
                        {order.status}
                      </span>
                      <strong className="dash-total">KES {order.total.toFixed(2)}</strong>
                    </div>
                  </div>
                  <div className="dash-card-items">
                    {order.items.map((item, i) => (
                      <div className="dash-item" key={i}>
                        <img src={item.img} alt={item.name} />
                        <span>{item.name}</span>
                        <span>x{item.qty}</span>
                        <span>KES {(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="dash-payment-method">
                    💳 {order.paymentMethod}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── PAYMENTS TAB ── */}
        {tab === 'payments' && (
          <div className="dash-section">
            <h2>Bitcoin Payments <span>({btcOrders.length})</span></h2>
            {btcOrders.length === 0 ? (
              <div className="dash-empty">No Bitcoin payments yet.</div>
            ) : (
              btcOrders.map(order => (
                <div className="dash-card" key={order.id}>
                  <div className="dash-card-header">
                    <div>
                      <strong>Order #{order.id}</strong>
                      <span className="dash-date">{order.date}</span>
                    </div>
                    <strong className="dash-total">KES {order.total.toFixed(2)}</strong>
                  </div>
                  <div className="dash-txid">
                    <span>TXID:</span>
                    <code>{order.paymentMethod.replace('Bitcoin — TXID: ', '')}</code>
                  </div>
                  <div className={`dash-status ${order.status === 'Confirmed' ? 'confirmed' : 'pending'}`}
                    style={{ display: 'inline-block', marginTop: '0.5rem' }}>
                    {order.status}
                  </div>
                </div>
              ))
            )}

            {/* Standard payments summary */}
            <h2 style={{ marginTop: '2rem' }}>
              Standard Payments <span>({standardOrders.length})</span>
            </h2>
            {standardOrders.length === 0 ? (
              <div className="dash-empty">No standard payments yet.</div>
            ) : (
              standardOrders.map(order => (
                <div className="dash-card" key={order.id}>
                  <div className="dash-card-header">
                    <div>
                      <strong>Order #{order.id}</strong>
                      <span className="dash-date">{order.date}</span>
                    </div>
                    <strong className="dash-total">KES {order.total.toFixed(2)}</strong>
                  </div>
                  <div className="dash-payment-method">💳 {order.paymentMethod}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {tab === 'messages' && (
          <div className="dash-section">
            <h2>Messages <span>({messages.length})</span></h2>
            {messages.length === 0 ? (
              <div className="dash-empty">No messages yet.</div>
            ) : (
              messages.map(msg => (
                <div className={`dash-card ${!msg.read ? 'unread' : ''}`} key={msg.id}>
                  <div className="dash-card-header">
                    <div>
                      <strong>{msg.firstName} {msg.lastName}</strong>
                      <span className="dash-date">{msg.date}</span>
                    </div>
                    <div className="dash-card-right">
                      {!msg.read && (
                        <button
                          className="dash-mark-read"
                          onClick={() => markAsRead(msg.id)}
                        >
                          Mark as Read
                        </button>
                      )}
                      {msg.read && <span className="dash-read-label">✓ Read</span>}
                    </div>
                  </div>
                  <div className="dash-msg-meta">
                    <span>✉️ {msg.email}</span>
                    <span>📌 {msg.subject}</span>
                  </div>
                  <div className="dash-msg-body">{msg.message}</div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard
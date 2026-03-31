import API_URL from '../../config'
import React, { useState, useEffect } from 'react'
import './Btcodal.css'

const BTC_ADDRESS = 'bc1qvnqecredevffcsq0v952sd3szqhxx76rwkefsj'

const BtcModal = ({ total, cart, onClose }) => {
  const [copied, setCopied]       = useState(false)
  const [txid, setTxid]           = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [btcRate, setBtcRate]     = useState(null)
  const [qrCode, setQrCode]       = useState(null)
  const [loading, setLoading]     = useState(true)

  // Fetch live BTC rate and QR code when modal opens
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch live rate
       const rateRes = await fetch(`${API_URL}/api/btc-rate`)
        const rateData = await rateRes.json()
        setBtcRate(rateData.rate)

        // Fetch QR code
        const qrRes   = await fetch(`${API_URL}/api/btc-qr`)
        const qrData = await qrRes.json()
        setQrCode(qrData.qr)
      } catch (err) {
        console.error('Fetch failed:', err)
        setBtcRate(8500000)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const btcAmount = btcRate ? (total / btcRate).toFixed(8) : '...'

  const handleCopy = () => {
    navigator.clipboard.writeText(BTC_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSend = async () => {
    if (!txid.trim()) return
    try {
      await fetch(`${API_URL}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          total,
          paymentMethod: `Bitcoin — TXID: ${txid}`
        })
      })
      setConfirmed(true)
    } catch (err) {
      console.error('Order failed:', err)
      alert('Could not connect to server. Please try again.')
    }
  }

  return (
    <div className="btc-modal-overlay" onClick={onClose}>
      <div className="btc-modal" onClick={e => e.stopPropagation()}>
        <div className="btc-header">
          <h2>₿ Pay with Bitcoin</h2>
          <p>Scan the QR code or copy the address below</p>
        </div>
        <div className="btc-body">

          {/* QR Code */}
          <div className="btc-qr">
            {loading ? (
              <><span>₿</span> Loading...</>
            ) : qrCode ? (
              <img src={qrCode} alt="Bitcoin QR Code"
                style={{ width: '100%', height: '100%', borderRadius: '2px' }}
              />
            ) : (
              <><span>₿</span> QR Code</>
            )}
          </div>

          {/* Address + Copy */}
          <div className="btc-address-row">
            <div className="btc-address">{BTC_ADDRESS}</div>
            <button className="btc-copy" onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          {/* Live BTC Amount */}
          <div className="btc-amount">
            <p>Amount to send</p>
            <strong>≈ {btcAmount} BTC</strong>
            <p style={{ fontSize: '0.8rem', color: '#a08060', marginTop: '0.3rem' }}>
              KES {total.toFixed(2)} @ {btcRate
                ? `KES ${btcRate.toLocaleString()} per BTC`
                : 'fetching rate...'}
            </p>
          </div>

          <p className="btc-note">
            Send the exact amount to the address above. Your order will be confirmed
            after 1 network confirmation (approx. 10 minutes). Please keep your
            transaction ID handy.
          </p>

          {confirmed ? (
            <div className="btc-confirmed">
              ✓ Payment submitted! We'll verify your transaction and confirm your
              order shortly.
            </div>
          ) : (
            <div className="btc-send-section">
              <label>Enter your Transaction ID (TXID)</label>
              <input
                type="text"
                className="btc-txid-input"
                placeholder="e.g. a1b2c3d4e5f6..."
                value={txid}
                onChange={e => setTxid(e.target.value)}
              />
              <button
                className="btc-send"
                onClick={handleSend}
                disabled={!txid.trim()}
              >
                ₿ Confirm & Send Payment
              </button>
            </div>
          )}

          <button className="btc-close" onClick={onClose}>
            Close & Continue Shopping
          </button>

        </div>
      </div>
    </div>
  )
}

export default BtcModal
import API_URL from '../../config'
import React, { useState } from 'react'
import BtcModal from '../Btcmodal/Btcmodal'
import './Cart.css'

const Cart = ({ cart, onClose, onUpdate }) => {
  const [showBtc, setShowBtc]       = useState(false)
  const [ordering, setOrdering]     = useState(false)
  const [orderDone, setOrderDone]   = useState(false)

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const handlePlaceOrder = async () => {
    setOrdering(true)
    try {
      const res = await fetch(`${API_URL}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          total,
          paymentMethod: 'Standard'
        })
      })
      const data = await res.json()
      if (data.success) {
        setOrderDone(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (err) {
       console.error('Order failed:', err)
      alert('Could not connect to server. Please try again.')
    } finally {
      setOrdering(false)
    }
  }

  return (
    <>
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-panel" onClick={e => e.stopPropagation()}>
          <div className="cart-header">
            <h2>Your Order</h2>
            <button className="cart-close" onClick={onClose}>✕</button>
          </div>

          <div className="cart-items">
            {cart.length === 0 && (
              <p style={{ color: '#a08060', textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
                Your cart is empty
              </p>
            )}
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-emoji">
                  <img src={item.img} alt={item.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>KES {(item.price * item.qty).toFixed(2)}</p>
                </div>
                <div className="cart-qty">
                  <button onClick={() => onUpdate(item.id, -1)}>−</button>
                  <span style={{ fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>
                    {item.qty}
                  </span>
                  <button onClick={() => onUpdate(item.id, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="cart-total">
              <div className="cart-total-row">
                <span>Total</span>
                <strong>KES {total.toFixed(2)}</strong>
              </div>

              {/* ── Order success message ── */}
              {orderDone ? (
                <div className="order-success">
                  ✓ Order placed! We'll be in touch shortly.
                </div>
              ) : (
                <>
                  <button
                    className="btn-checkout"
                    onClick={handlePlaceOrder}
                    disabled={ordering}
                  >
                     {ordering ? (
        <>
          <span className="loading-spinner"></span>
          Processing... (may take up to 60s)
        </>
      ) : (
        'Place Order'
      )}
    </button>
                  <button className="btn-btc" onClick={() => setShowBtc(true)}>
                    <span>₿</span> Pay with Bitcoin
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {showBtc && (
        <BtcModal
          total={total}
          cart={cart}
          onClose={() => setShowBtc(false)}
        />
      )}
    </>
  )
}

export default Cart
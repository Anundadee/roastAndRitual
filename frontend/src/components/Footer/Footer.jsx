import React from 'react'
import './Footer.css'

const Footer = () => {
 
return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Roast &amp; Ritual Coffee Co.</h3>
          <p>Specialty coffee roasted with intention.<br />Sourced ethically. Delivered swiftly.</p>
          <div className="social-icons">
            {["𝕏", "f", "in", "📷"].map((icon, i) => (
              <a href="#" className="social-icon" key={i}>{icon}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>About Us</h4>
          {["Our Story", "Our Mission", "Sourcing", "Sustainability", "Careers"].map(link => (
            <a href="#" key={link}>{link}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4>Keep In Touch</h4>
          <a href="#">hello@roastandritual.co.ke</a>
          <a href="#">+254 712 345 678</a>
          <a href="#">12 Kimathi Street, Nairobi</a>
      </div>
      

      <div className="footer-subscribe">
        <div>
          <span>Subscribe to our emails</span>
          <p>Be the first to know about new arrivals, exclusive blends & events.</p>
        </div>
        <div className="footer-subscribe-form">
          <input type="email" placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Roast & Ritual Coffee Co. All Rights Reserved.</span>
        <span style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}>
            Privacy Policy
          </a>
          <a href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}>
            Terms of Service
          </a>
        </span>
      </div>
      </div>
    </footer>
  );
}
export default Footer

  
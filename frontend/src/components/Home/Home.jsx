import React from 'react'
import './Home.css'
import A from '../../assets/images/coffeecup.jpg'

const Home = ({ onShop })=> {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-tag">Specialty Coffee · Est. 2018</div>
        <h1>Roast &amp; <em>Ritual</em><br />Coffee Co.</h1>
        <p className="hero-sub">
          From the volcanic highlands of East Africa to your cup — every bean carries a story of
          soil, sunlight, and devotion.
        </p>
        <button className="btn-primary" onClick={onShop}>Shop Now</button>
      </div>

      <div className="features">
        {[
          { icon: "🌱", title: "Single Origin",   text: "Every batch is traceable to a specific farm, region, and harvest season." },
          { icon: "🔥", title: "Artisan Roasted", text: "Small-batch roasting in Nairobi ensures peak freshness in every order." },
          { icon: "✈️", title: "Swift Delivery",  text: "Nationwide delivery across Kenya within 2–3 business days." },
          { icon: "₿",  title: "Bitcoin Accepted",text: "We embrace the future of finance — pay seamlessly with Bitcoin." },
        ].map(f => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>

      <div className="story-section">
      
        <div className="story-text">
          <div className="section-label">Our Philosophy</div>
          <h2>Coffee is a ritual,<br />not a routine.</h2>
          <p>
            At Roast &amp; Ritual, we believe that exceptional coffee begins long before it reaches
            your cup. It starts with relationships — with farmers, with soil, with tradition.
          </p>
          <p>
            We partner directly with smallholder farms across Kenya, Ethiopia, and Colombia to bring
            you beans of extraordinary character, roasted with care in our Nairobi workshop.
          </p>
         
        </div>
         <div className="story-img">
          <img src={A} alt='Our coffee story'></img>
          ☕</div>
      </div>


      <div className="subscribe-section">
        <div className="section-label" style={{ color: "var(--latte)" }}>Stay Connected</div>
        <h2>Stay In Touch</h2>
        <p>New arrivals, brewing guides, and exclusive offers — delivered to your inbox.</p>
        <div className="subscribe-form">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}


export default Home

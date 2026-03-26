import React from 'react'
import './About.css'
import B from '../../assets/images/coffeeplucking.jpg'

const About = () => {
return (
    <div className="page">
      <div className="page-hero">
        <div className="section-label" style={{ color: "var(--latte)" }}>Who We Are</div>
        <h1>About Us</h1>
        <p>A story brewed in passion, rooted in East Africa</p>
      </div>
      <div className="about-container">
        <div className="about-intro">
          <div className="about-text">
            <div className="section-label">Our Story</div>
            <h2>Born from a love of the extraordinary cup.</h2>
            <p>
              Roast &amp; Ritual was founded in 2018 by two coffee-obsessed Nairobians who grew tired
              of settling for the ordinary. Armed with a vintage drum roaster and a relentless
              curiosity, we set out to bring world-class specialty coffee to East Africa.
            </p>
            <p>
              What started as weekend pop-ups at the Nairobi Arboretum has grown into four locations
              and a thriving online community of coffee lovers who share our belief that every cup
              should tell a story.
            </p>
            <p>
              We work directly with over 20 farming families across Kenya's Central Highlands,
              Ethiopia's Yirgacheffe region, and Colombia's Huila department — paying above
              fair-trade prices and investing in community projects at origin.
            </p>
          </div>
          <div className="about-photo">
           <img src={B} alt='coffee farming in East Africa'></img>
            <div className="about-photo-label">Our Nairobi Roastery · Est. 2018</div>
          </div>
        </div>
        <div className="values-grid">
          {[
            { icon: "🤝", title: "Direct Trade",       text: "We build lasting partnerships with farmers, ensuring fair compensation and sustainable practices." },
            { icon: "🔬", title: "Quality Obsession",  text: "Every batch is cupped, graded, and approved before it earns a spot in our collection." },
            { icon: "🌍", title: "Community First",    text: "10% of our profits fund education and clean water initiatives in our farming communities." },
          ].map(v => (
            <div className="value-card" key={v.title}>
              <div className="icon">{v.icon}</div>
              <h4>{v.title}</h4>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  

export default About 

  
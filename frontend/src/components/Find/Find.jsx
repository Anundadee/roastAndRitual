import { LOCATIONS } from '../Data/Data';
import React from 'react'
import './Find.css'



const Find = () => {
  return (
    <div className="page">
      <div className="page-hero">
        <div className="section-label" style={{ color: "var(--latte)" }}>
          We're Closer Than You Think
        </div>
        <h1>Find Us</h1>
        <p>Four locations across Kenya, each with its own character</p>
      </div>
      <div className="locations-grid">
        {LOCATIONS.map(loc => (
          <div className="location-card" key={loc.city}>
            <div className="location-map-placeholder" >
             <img src={loc.img} alt={loc.city}></img>
            </div>
            <div className="location-info">
              <div className="location-badge">{loc.badge}</div>
              <h3>{loc.city}</h3>
              <p style={{ fontWeight: "500", color: "var(--caramel)", fontSize: "0.83rem", marginBottom: "0.6rem" }}>
                {loc.address}
              </p>
              <p>{loc.details}</p>
              <div className="location-hours">⏰ {loc.hours}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Find
  
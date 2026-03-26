import { useState, useEffect, useRef } from "react";
import React from 'react'
import './Navbar.css'

const Navbar = ({ onNav, cartCount, onCartOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropRef = useRef();

  useEffect(() => {
    const handler = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = page => {
    onNav(page);
    setMenuOpen(false);
  };

  return (
    <nav>
      <span className="nav-brand" onClick={() => handleNav("home")}>
        Roast &amp; <span>Ritual</span>
      </span>
      <div className="nav-right" ref={dropRef}>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          {cartCount > 0 && (
            <button
              className="nav-toggle"
              onClick={onCartOpen}
              style={{ borderColor: "rgba(247,147,26,0.5)" }}
            >
              🛒 {cartCount}
            </button>
          )}
          <button className="nav-toggle" onClick={() => setMenuOpen(o => !o)}>
            Menu <span className={`chevron ${menuOpen ? "open" : ""}`}>▾</span>
          </button>
        </div>
        {menuOpen && (
          <div className="dropdown">
            {["home", "about", "shop", "find", "contact"].map(p => (
              <button key={p} onClick={() => handleNav(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}


export default Navbar
import { PRODUCTS } from "../data/data";
import React from 'react'
import './Shop.css'

const Shop = ({ onAdd }) => {
  return (
    <div className="page">
      <div className="page-hero">
        <div className="section-label" style={{ color: "var(--latte)" }}>Our Collection</div>
        <h1>The Shop</h1>
        <p>Curated single origins and blends, roasted to order</p>
      </div>
      <div className="shop-grid">
        {PRODUCTS.map(p => (
          <div className="product-card" key={p.id}>
             <div className="product-img">
              <img src={p.img} alt={p.name} /> 
            </div>
            <div className="product-info">
              <h3>{p.name}</h3>
              <div className="origin">{p.origin}</div>
              <p>{p.desc}</p>
              <div className="product-footer">
                <span className="price">KES {p.price.toFixed(2)}</span>
                <button className="btn-add" onClick={() => onAdd(p)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  
export default Shop

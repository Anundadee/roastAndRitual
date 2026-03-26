import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Shop from './components/Shop/Shop'
import Find from './components/Find/Find'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import Dashboard from './components/Dashboard/Dashboard';



const App =() => {
  const [page, setPage]       = useState("home");
  const [cart, setCart]       = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showDash,  setShowDash]  = useState(false)
 
  const navTo = p => { setPage(p); window.scrollTo(0, 0); };
 
  const addToCart = product => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };
 
  const updateCart = (id, delta) => {
    setCart(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
        .filter(i => i.qty > 0)
    );
  };
 
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  if (showDash) {
    return <Dashboard onExit={() => setShowDash(false)} />
  }
 
  return (
    <>
      <Navbar
        onNav={navTo}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />
 
      {page === "home"    && <Home    onShop={() => navTo("shop")} />}
      {page === "shop"    && <Shop    onAdd={addToCart} />}
      {page === "find"    && <Find />}
      {page === "about"   && <About />}
      {page === "contact" && <Contact />}

 
      <Footer onNav={navTo} />
 
      {cartOpen && (
        <Cart
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdate={updateCart}
        />
      )}
        {/* /*Hidden dashboard trigger — triple click the footer copyright */ }
      <div
        style={{ position: 'fixed', bottom: 0, right: 0, width: '30px', height: '30px', cursor: 'default', zIndex: 9999 }}
        onDoubleClick={() => setShowDash(true)}/>
    </>
  );
}

export default App
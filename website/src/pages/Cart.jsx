import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import api from "../api";

const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const Cart = ({ onCartChange, flash }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCart() {
    try { const { data } = await api.get("/cart"); setCart(data); setError(""); }
    catch (err) { setError(err.response?.data?.message || "Could not load cart."); }
    finally { setLoading(false); }
  }
  useEffect(() => { loadCart(); }, []);

  async function updateItem(productId, quantity) {
    try {
      if (quantity < 1) await api.delete(`/cart/${productId}`);
      else await api.patch(`/cart/${productId}`, { quantity });
      await loadCart(); onCartChange?.();
    } catch (err) { flash?.(err.response?.data?.message || "Could not update cart."); }
  }

  async function removeItem(productId) {
    try { await api.delete(`/cart/${productId}`); await loadCart(); onCartChange?.(); flash?.("Item removed."); }
    catch (err) { flash?.(err.response?.data?.message || "Could not remove item."); }
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <main className="cart-page">
    <Link className="back-link" to="/products"><ArrowLeft size={16}/> Continue shopping</Link>
    <div className="cart-heading"><div><div className="form-kicker">YOUR BAG</div><h1>Shopping cart</h1><p>Good picks. Almost yours.</p></div><div className="cart-icon-large"><ShoppingBag size={25}/></div></div>
    {error && <div className="error-message">{error}</div>}
    {loading ? <div className="empty-state">Loading your cart...</div> : cart.items.length === 0 ? <div className="empty-cart"><div className="empty-cart-icon"><ShoppingBag size={28}/></div><h2>Your cart is taking a little break.</h2><p>Find something lovely to bring home.</p><Link className="primary-btn inline-btn" to="/products">Explore products <ArrowLeft className="flip-icon" size={17}/></Link></div> :
      <div className="cart-layout"><section className="cart-items"><div className="cart-items-header">{cart.items.length} {cart.items.length === 1 ? "ITEM" : "ITEMS"} IN YOUR BAG</div>
        {cart.items.map(({ product, quantity }) => <article className="cart-item" key={product._id}><img src={product.image} alt={product.name}/><div className="cart-item-info"><span className="product-category">{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><button className="remove-btn" onClick={() => removeItem(product._id)}><Trash2 size={14}/> Remove</button></div><div className="cart-item-actions"><strong>{money(product.price * quantity)}</strong><div className="quantity-control"><button onClick={() => updateItem(product._id, quantity - 1)} aria-label="Decrease quantity"><Minus size={14}/></button><span>{quantity}</span><button onClick={() => updateItem(product._id, quantity + 1)} aria-label="Increase quantity"><Plus size={14}/></button></div></div></article>)}
      </section><aside className="order-summary"><div className="form-kicker">THE TOTAL</div><h2>Order summary</h2><div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="summary-line"><span>Shipping</span><strong className="free-shipping">FREE</strong></div><div className="summary-line"><span>Taxes</span><span>Calculated at checkout</span></div><div className="summary-divider"/><div className="summary-total"><span>Total</span><strong>{money(subtotal)}</strong></div><button className="primary-btn checkout-btn" onClick={() => flash?.("Checkout demo only — payment integration is not included.")}>Continue to checkout <ArrowLeft className="flip-icon" size={17}/></button><p className="secure-note">Secure checkout · Easy returns</p></aside></div>}
  </main>
    </>
  )
}

export default Cart

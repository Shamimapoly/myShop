import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, ShoppingCart, LogOut, UserRound } from "lucide-react";

const Navbar = ({ cartCount = 0, onLogout = () => {} }) => {
  const loggedIn = Boolean(localStorage.getItem("token"));
  const storedName = localStorage.getItem("name") || "";
  let userName = storedName;

  try {
    const parsedName = JSON.parse(storedName);
    userName = typeof parsedName === "string" ? parsedName : parsedName?.userName || "";
  } catch {
    userName = storedName;
  }

  return (
   <>
    <header className="navbar">
      <Link to={loggedIn ? "/products" : "/register"} className="brand">
        <span className="brand-mark"><ShoppingBag size={21} /></span>
        <span>nova<span className="brand-light">shop</span></span>
      </Link>
      <nav>
        {loggedIn ? <>
          <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Shop</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active cart-link" : "nav-link cart-link"}>
            <ShoppingCart size={17} /> Cart <span className="cart-count">{cartCount}</span>
          </NavLink>
          <span className="user-chip"><UserRound size={15} /> {userName || "Account"}</span>
          <button className="logout-btn" onClick={onLogout}><LogOut size={16} /> <span>Log out</span></button>
        </> : <>
          <NavLink to="/login" className="nav-link">Log in</NavLink>
          <NavLink to="/register" className="nav-cta">Create account</NavLink>
        </>}
      </nav>
    </header>
   </>
  )
}

export default Navbar

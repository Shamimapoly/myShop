import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import api from "../api";

const Root = () => {
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");

  const navigate = useNavigate();

  async function refreshCart() {
    if (!localStorage.getItem("token")) {
      setCartCount(0);
      return;
    }

    try {
      const { data } = await api.get("/cart");
      setCartCount(
        data.items.reduce((sum, item) => sum + item.quantity, 0)
      );
    } catch (error) {
      setCartCount(0);
    }
  }

  useEffect(() => {
    refreshCart();
  }, []);

  function flash(message) {
    setNotice(message);
    window.setTimeout(() => { setNotice(""); }, 2600);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setCartCount(0);
    flash("You have logged out.");
    navigate("/login");
  }

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onLogout={logout} />

      {notice && <div className="toast">{notice}</div>}

      <Outlet context={{ refreshCart, flash }} />

      <footer className="footer">
        © {new Date().getFullYear()} NovaShop
        <span>Thoughtful picks for everyday life.</span>
      </footer>
    </div>
  );
};

export default Root;

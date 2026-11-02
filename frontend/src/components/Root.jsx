import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import api from "../api";

const Root = () => {
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");

  const navigate = useNavigate();

  // Refresh Cart
  async function refreshCart() {
    if (!localStorage.getItem("token")) {
      setCartCount(0);
      return;
    }

    try {
      const { data } = await api.get("/cart");

      setCartCount(
        data.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        )
      );
    } catch (error) {
      setCartCount(0);
    }
  }

  useEffect(() => {
    refreshCart();
  }, []);

  // Toast Notification
  function flash(message) {
    setNotice(message);

    window.setTimeout(() => {
      setNotice("");
    }, 2600);
  }

  // Logout
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    setCartCount(0);

    flash("You have logged out.");

    navigate("/login");
  }

  return (
    <div className="min-h-screen">

      {/* Navbar */}
      <Navbar
        cartCount={cartCount}
        onLogout={logout}
      />

      {/* Toast */}
      {notice && (
        <div className="toast">
          {notice}
        </div>
      )}

      {/* Child Routes */}
      <Outlet
        context={{
          refreshCart,
          flash,
        }}
      />

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} NovaShop
        <span>
          Thoughtful picks for everyday life.
        </span>
      </footer>

    </div>
  );
};

export default Root;
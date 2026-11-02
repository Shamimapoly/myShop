import React from 'react'
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, ShoppingBag } from "lucide-react";
import api from "../api";

const Login = ({ onSuccess }) => {

    const location = useLocation();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   const [form, setForm] = useState({ email: location.state?.registeredEmail || "", password: "" });

 
   const update = (e) => {
  setForm((f) => ({
    ...f,
    [e.target.name]: e.target.value,
  }));
};

  const login = useMutation({
    mutationFn: async ({ email, password,  }) => {
      const { data } = await api.post("/auth/login", {
        email: email,
        password: password,
     
      });
      return data;
      
    },
    
    onSuccess: (data) => {
      console.log(data.userinfo.userName);
      console.log(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.userinfo.userName);
      onSuccess?.();
    navigate("/products", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      console.log(error.message);
    },
     onSettled: () => {
    setLoading(false);
  },
   
  });

  async function submit(e) {
    e.preventDefault(); 
    setError(""); setLoading(true)
    login.mutate(form);

     
    
  }
  return (
    <>
      <main className=" px-20 auth-layout">
      <section className="  auth-aside login-aside">
        <div className="aside-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> GOOD TO SEE YOU AGAIN</div>
          <h1>Your everyday,<br /><em>made better.</em></h1>
          <p>Sign in to find your favorites, manage your cart, and pick up where you left off.</p>
          <div className="quote-card"><span className="quote-star">✳</span><div><strong>Little things. Big difference.</strong><small>Find something that feels just right.</small></div></div>
        </div>
        <div className="aside-orb orb-one" /><div className="aside-orb orb-two" />
        <div className="aside-bottom">WELCOME BACK TO NOVASHOP <span>✳</span></div>
      </section>
      <section className="auth-main">
        <div className="auth-card">
          <div className="mobile-brand"><ShoppingBag size={20}/> novashop</div>
          <div className="form-kicker">WELCOME BACK</div>
          <h2>Log in to your account</h2>
          <p className="form-subtitle">Good to have you back. Let's get shopping.</p>
          {location.state?.registeredEmail && <div className="success-message">Account created successfully. Please log in.</div>}
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={submit} className="form-stack">
            <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" required /></label>
            <label>Password<div className="password-wrap"><input name="password" type={show ? "text" : "password"} value={form.password} onChange={update} placeholder="Enter your password" autoComplete="current-password" required /><button type="button" className="show-password" onClick={() => setShow(!show)} aria-label="Toggle password visibility">{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></label>
            <button className="primary-btn" disabled={loading}>{loading ? "Logging in..." : <>Log in <ArrowRight size={17}/></>}</button>
          </form>
          <p className="switch-auth">New to NovaShop? <Link to="/register">Create an account</Link></p>
          <p className="legal-note">Your account helps keep your shopping experience in one place.</p>
        </div>
      </section>
    </main>
    </>
  )
}

export default Login

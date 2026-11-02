import React from 'react'
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, ShieldCheck, ShoppingBag } from "lucide-react";
import api from "../lib/axios"


const Register = ({ onSuccess }) => {
    const [form, setForm] = useState({ userName: "", email: "", password: "", phone:"",gender:""});
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };
  
    const register = useMutation({
      mutationFn: async ({userName, email, password,phone,gender  }) => {
        const { data } = await api.post("/auth/register", {
          userName:userName,
          email: email,
          password: password,
          phone:phone,
          gender:gender
       
        });
        return data;
        
      },
      
      onSuccess: (data) => {
        console.log(data);
      
        
        onSuccess?.();
      navigate("/login", { state: { registeredEmail: form.email } });
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
      setError(""); 
      setLoading(true);
      register.mutate(form);
  
       
    
    }
   

  
  return (
    <>
      <main className="px-20  auth-layout">
      <section className="  auth-aside">
        <div className="aside-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT FAVORITE THING</div>
          <h1>Good things.<br /><em>Great finds.</em></h1>
          <p>Discover thoughtful essentials picked to make your everyday a little better.</p>
          <div className="aside-perks"><span><ShieldCheck size={17} /> Simple & secure account</span><span><ShoppingBag size={17} /> A little joy in every order</span></div>
        </div>
        <div className="aside-orb orb-one" /><div className="aside-orb orb-two" />
        <div className="aside-bottom">CURATED FOR YOUR EVERYDAY <span>✳</span></div>
      </section>
      <section className="auth-main">
        <div className="auth-card">
          <div className="mobile-brand"><ShoppingBag size={20}/> novashop</div>
          <div className="form-kicker">GET STARTED</div>
          <h2>Create your account</h2>
          <p className="form-subtitle">Join us — your next great find is waiting.</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={submit} className="form-stack">
            <label>Full name<input name="userName" value={form.userName} onChange={update} placeholder="e.g. Alex Morgan" autoComplete="name" required minLength="2" /></label>
            <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" required /></label>
            <label>Password<div className="password-wrap"><input name="password" type={show ? "text" : "password"} value={form.password} onChange={update} placeholder="At least 8 characters" autoComplete="new-password" minLength="8" required /><button type="button" className="show-password" onClick={() => setShow(!show)} aria-label="Toggle password visibility">{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div><small>Use at least 8 characters.</small></label>
            <label>
  Phone number
  <input
    name="phone"
    type="tel"
    value={form.phone}
    onChange={update}
    placeholder="number"
    required
  />
</label>

<label>
  Gender
  <select
    name="gender"
    value={form.gender}
    onChange={update}
    required
  >
    <option value="">Select gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</label>
            <button className="primary-btn" disabled={loading}>{loading ? "Creating account..." : <>Create account <ArrowRight size={17}/></>}</button>
          </form>
          <p className="switch-auth">Already have an account? <Link to="/login">Log in</Link></p>
          <p className="legal-note">By creating an account, you agree to our Terms and Privacy Policy.</p>
        </div>
      </section>
    </main>
    </>
  )
}

export default Register

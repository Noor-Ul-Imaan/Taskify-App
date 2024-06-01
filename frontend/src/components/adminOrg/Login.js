import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import logo from "../logo.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/AdminPannel');
  };

  return (
    <div className="login">
      <div className="gradient-background">
        <div className="container">
          <div className="header">
            <h1>Admin Login</h1>
          </div>
          <div className="content">
            <form className="login" onSubmit={handleSubmit}>
              <div className="input-field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
          <div>
              <Link to='/SignIn'>For User Login</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

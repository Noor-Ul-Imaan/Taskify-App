import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import logo from "../logo.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/AdminPannel');
  };
 const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login">
      <div className="gradient-background">
        <div className="container">
          <div className="header">
            <span className="signup">
              Don't have an account?{" "}
              <Link to="/OrganizationDetails" className="signup-link">
                Register Here
              </Link>
            </span>
          </div>
          <div className="content">
            <h1>Admin Login</h1>
            <form className="login" onSubmit={handleSubmit}>
              <div className="input-field">
          <label>Email:</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-field">
          <label>Password:</label>
          <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
                />              
                </div>
              <div className="checkbox-field">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>
              <button type="submit">Login</button>
            </form>
            <div className="admin-login">
              <Link to='/SignIn'>For User Login</Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;

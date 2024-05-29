import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/adminHomepage');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;



/*
    return (
      <>
    
    <div className="login">
      <div className="gradient-background">
        <div className="container">

          <div className="header">
            <img src={logo} alt="Taskify Logo" />
            <span className="signup">
              Don't have an account?{" "}
              <Link to="/Whoareyou" className="signup-link">
                Sign up
              </Link>
            </span>
          </div>
          <div className="content">
            <h1>Admin Login</h1>
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
              <div className="social-login">
                <span>G</span>
                <span>Sign in with Google</span>
              </div>
            </form>
            <div>
              <Link to='/SignIn'>For User Login</Link>
            </div>
          </div>

          <div className="footer">
            <span>
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignIn.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('successful');
      navigate('/IndividualPannel');
    } catch (error) {
      console.log('Error:', error);
      setError(error.response.data.message || 'Login failed');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="gradient-background">
        <div className="container">
          {/* <div className="header">
            <span className="signup">
              Don't have an account?{" "}
              <Link to="/OrganizationDetails" className="signup-link">
                Sign up
              </Link>
            </span>
          </div> */}
          <div className="content">
            <h1>User Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
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
              <Link to='/login'>For Admin Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

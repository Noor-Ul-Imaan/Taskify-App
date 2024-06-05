import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import logo from '../logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      Swal.fire({ // SweetAlert2 success message
        title: 'Welcome!',
        text: 'You have successfully logged in!',
        icon: 'success'
      });
      navigate('/AdminPannel');
    } catch (err) {
      Swal.fire({ // SweetAlert2 error message
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="gradient-background">
        <div className="container login-container">
          <div className="header">
            <span className="signup">
              Don't have an account?{' '}
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
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </button>
            </form>
            <div className="admin-login">
              <Link to="/SignIn">For User Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../images/logo.png';
import { useAuth } from '../adminOrg/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/Login');
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-links-list">
        <ul>
          {user ? (
            <>
              <li>
                <Link to='/AdminPannel'>Dashboard</Link>
              </li>
              <li>
                <Link to='/AdminHomepage'>View Organization</Link>
              </li>
              <li>{user.email}</li>
              <li><button onClick={handleClick}>Logout</button></li>
            </>
          ) : (
            <>
              <li>
                <Link to='/dump'>Dump</Link>
              </li>
              <li>
                <Link to='/HomePage'>Home</Link>
              </li>
              <li>
                <Link to='/AboutUs'>About Us</Link>
              </li>
              <li>
                <Link to='/ContactForm'>Contact</Link>
              </li>
              <li>
                <Link to='/FAQs'>FAQs</Link>
              </li>
              <li className="sign-in">
                <Link to='/SignIn' className="btn">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

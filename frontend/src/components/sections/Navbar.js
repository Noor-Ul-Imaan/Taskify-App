import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Navbar.css';
import logo from '../../images/logo.png';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-links-list">
        <ul>
          <li>
            <Link to='/dump'>Dump</Link>
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
          {user && (
            <div className="user-info">
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <li className="sign-in">
              <Link to='/SignIn'>Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

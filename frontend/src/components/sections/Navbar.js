import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useLogout } from '../../hooks/useLogout';
// import { useAuthContext } from '../../hooks/useAuthContext';
import './Navbar.css';
import logo from '../../images/logo.png';
import { useAuth } from '../adminOrg/AuthContext';

const Navbar = () => {
  // const { logout } = useLogout();
  // const { user } = useAuthContext();
  const { user, logout } = useAuth();


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


          {/* {user && (
            <div className="userInfo">
              <p className="user-name">Welcome, {user.name}!</p>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <li className="sign-in">
              <Link to='/SignIn'>Sign In</Link>
            </li>
          )} */}
          {user ? (
          <>
            <li>
             <Link to='/AboutUs'>About Us</Link>
            </li>
            <li>
             <Link to='/ContactForm'>Contact</Link>
            </li>
            <li>
             <Link to='/FAQs'>FAQs</Link>
            </li>
            <li>{user.email}</li>
            <li><button onClick={logout}>Logout</button></li>
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
            
            <li><a href="/SignIn">Login</a></li>
          </>

        )}

        </ul>
      </div>
    </div>
  );
};

export default Navbar;

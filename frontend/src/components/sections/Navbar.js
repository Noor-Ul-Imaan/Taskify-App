import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo.png";
import { useAuth } from "../adminOrg/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    logout();
    Swal.fire({
      title: "Logged Out",
      text: "You have successfully logged out.",
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => {
      navigate("/Login");
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-links-list">
          <ul>
            {user ? (
              <>
                {/* <li>
                  <Link to="/AdminPannel">Dashboard</Link>
                </li>
                <li>
                  <Link to="/AdminHomepage">View Organization</Link>
                </li>
                <li>{user.email}</li>
                <li>
                  <button onClick={handleClick}>Logout</button>
                </li> */}
              </>
            ) : (
              <>
                {/* <li>
                  <Link to='/dump'>Dump</Link>
                </li> */}
                <li>
                  <Link to="/HomePage">Home</Link>
                </li>
                <li>
                  <Link to="/AboutUs">About Us</Link>
                </li>
                <li>
                  <Link to="/ContactForm">Contact</Link>
                </li>
                <li>
                  <Link to="/FAQs">FAQs</Link>
                </li>
                <li className="sign-in">
                  <Link to="/SignIn" className="btn">
                    Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <FaBars />
        </div>
      </div>

      <div className={`sliding-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleMenu}>
          <FaTimes />
        </div>
        <ul>
          {user ? (
            <>
              {/* <li>
                <Link to="/AdminPannel" onClick={toggleMenu}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/AdminHomepage" onClick={toggleMenu}>
                  View Organization
                </Link>
              </li>
              <li>{user.email}</li>
              <li>
                <button
                  onClick={() => {
                    handleClick();
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              </li> */}
            </>
          ) : (
            <>
              <li>
                <Link to="/dump" onClick={toggleMenu}>
                  Dump
                </Link>
              </li>
              <li>
                <Link to="/HomePage" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/AboutUs" onClick={toggleMenu}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/ContactForm" onClick={toggleMenu}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/FAQs" onClick={toggleMenu}>
                  FAQs
                </Link>
              </li>
              <li className="sign-in">
                <Link to="/SignIn" className="btn" onClick={toggleMenu}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;

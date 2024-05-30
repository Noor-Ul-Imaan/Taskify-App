import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./WhoAreYou.css";
import logo from "./logo.png";

const WhoAreYou = () => {
  return (
    <div className="gradient-background">
      <div className="container">
        <div className="header">
          <img src={logo} alt="Taskify Logo" />
        </div>
        <div className="content">
          <h1>Who are you?</h1>
          <div className="options">
            <Link to="/IndivRegis">
              <button id="individual">I am an Individual</button>
            </Link>
            <Link to="/OrganizationDetails">
              <button id="organization">I am an Organization</button>
            </Link>
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
  );
};

export default WhoAreYou;

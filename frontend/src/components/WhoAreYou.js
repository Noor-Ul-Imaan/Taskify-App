import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./WhoAreYou.css";

const WhoAreYou = () => {
  return (
    <div className="gradient-background">
      <div className="container">
        <div className="content">
          <h1>Who are you?</h1>
          <div className="options">
            <Link to="/IndivRegis">
              <button id="individual">Employee</button>
            </Link>
            <Link to="/OrganizationDetails">
              <button id="organization">Organization Admin</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoAreYou;

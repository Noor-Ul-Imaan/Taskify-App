import React from "react";
import { useAuth } from "./adminOrg/AuthContext";
import "./AdminHomepage.css"; // Import the CSS file
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminHomepage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div>
        <Link to="/AdminPannel">
          <FaHome />
          Home
        </Link>
      </div>
      <div className="header">
        <h1>Welcome Admin</h1>
      </div>
      <div className="details">
        <h2>Organization Details</h2>
        <p>Email: {user.email}</p>
        <p>Type: {user.type}</p>
      </div>
      <div className="roles">
        <h3>Roles</h3>
        {user.roles.map((role, index) => (
          <div key={index} className="role-container">
            <p>Name: {role.name}</p>
            <p>Level: {role.level}</p>
          </div>
        ))}
      </div>
      <div className="logout">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminHomepage;

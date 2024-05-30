import React from "react";
import "./AdminPannel.css";
import { Link } from "react-router-dom";
import { useAuth } from "./adminOrg/AuthContext";

const AdminPannel = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">
          <h2>Taskify</h2>
          <br></br>
          <p>Admin's Dashboard</p>
        </div>
        <br></br>
        <ul className="menu">
          <Link to="/AdminPannel">
            <li>Home</li>
          </Link>

          {/* //here will add user */}
          <li>Total Tasks</li>
          <li>Completed Tasks</li>
          <li>Tasks In Progress</li>
          <li>Completed Tasks Today</li>
          <Link to="/UserManagement">
            <li>User Management</li>
          </Link>
          <Link to="/CreateUserForm">
            <li>Create User</li>
          </Link>
          <Link to="/AdminHomepage">
            <li>View Organization</li>
          </Link>
          {/* <li>Settings</li> */}
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="user-info">
            <h3>Hi, Welcome Back Admin!</h3>
            <p>{user.name}</p>
          </div>
          <div className="user-actions">
            {/* Circle for Admin Account Photo */}
            <div className="admin-photo-circle">
              <img
                src="frontend\src\images\dept-bg-1.jpg" // Path to the admin photo
                className="admin-photo"
              />
            </div>
            {/* End of Circle */}
            <Link to="/OrgSettings">
              <button>Settings</button>
            </Link>
            <button>Log Out</button>
          </div>
        </header>
        <section className="statistics">
          <div className="stat-box">
            <h4>Total Tasks</h4>
            <p>1,035</p>
            <small>1.79% Increase</small>
          </div>
          <div className="stat-box">
            <h4>Completed Tasks</h4>
            <p>735</p>
            <small>6.97% Increase</small>
          </div>
          <div className="stat-box">
            <h4>Task in Progress</h4>
            <p>120</p>
            <small>11.79% Increase</small>
          </div>
          <div className="stat-box">
            <h4>Completed Tasks Today</h4>
            <p>371</p>
            <small>5.97% Increase</small>
          </div>
        </section>
        <section className="overview">
          <h4>Overview</h4>
          <p>Task Statistics and User Management</p>
          <div className="charts">
            <div className="chart">
              <h5>This Month's Task Completion</h5>
              <p>78% Completed</p>
              <small>April 2024</small>
              <div className="chart-img"></div>
            </div>
            <div className="chart">
              <h5> View all Users</h5>
              <p>Top 5 Users</p>
              <small>April 2024</small>
              <div className="chart-img"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPannel;

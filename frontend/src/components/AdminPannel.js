import React, { useEffect, useState } from "react";
import "./AdminPannel.css";
import { Link } from "react-router-dom";
import { useAuth } from "./adminOrg/AuthContext";
import axios from "axios";

const AdminPannel = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Only fetch stats if user is logged in
        if (user) {
          const totalUsersResponse = await axios.get(
            "http://localhost:5000/api/users/count",
            {
              withCredentials: true, // Include credentials for cookie-based authentication
            }
          );

          setStats({
            totalUsers: totalUsersResponse.data.count,
          });
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">
          <br></br>
          <p>Admin's Dashboard</p>
        </div>
        <br></br>
        <ul className="menu">
          <Link to="/AdminPannel">
            <li>Home</li>
          </Link>
          <Link to="/UserManagement">
            <li>User Management</li>
          </Link>
          <Link to="/CreateUserForm">
            <li>Create User</li>
          </Link>
          <Link to="/AdminHomepage">
            <li>View Organization</li>
          </Link>
          <Link to="/OrgSettings">
            <li>Settings</li>
          </Link>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="user-info">
            <h3>Hi, Welcome Back Admin!</h3>
            <p>{user.name}</p>
          </div>
          <div className="user-actions">
            <div className="admin-photo-circle">
              <img
                src="frontend\src\images\dept-bg-1.jpg"
                className="admin-photo"
              />
            </div>
          </div>
        </header>
        <section className="statistics">
          <div className="stat-box">
            <h4>Total Users</h4>
            <p>{stats.totalUsers}</p>
          </div>
        </section>
      </main>
    </div>
  );
};
export default AdminPannel;

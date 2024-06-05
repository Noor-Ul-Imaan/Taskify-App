import React, { useEffect, useState } from "react";
import "./AdminPannel.css";
import { Link } from "react-router-dom";
import { useAuth } from "./adminOrg/AuthContext";
import axios from "axios";
import { FaHome, FaUsers, FaUserPlus, FaBuilding, FaCogs } from 'react-icons/fa';


const AdminPannel = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
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
          <p>Admin's Dashboard</p>
        </div>
        <ul className="menu">
          <li>
            <Link to="/AdminPannel">
              <div className="menu-item">
                <FaHome /> Home
              </div>
            </Link>
          </li>
          <li>
            <Link to="/UserManagement">
              <div className="menu-item">
                <FaUsers /> User Management
              </div>
            </Link>
          </li>
          <li>
            <Link to="/CreateUserForm">
              <div className="menu-item">
                <FaUserPlus /> Create User
              </div>
            </Link>
          </li>
          <li>
            <Link to="/AdminHomepage">
              <div className="menu-item">
                <FaBuilding /> View Organization
              </div>
            </Link>
          </li>
          <li>
            <Link to="/OrgSettings">
              <div className="menu-item">
                <FaCogs /> Settings
              </div>
            </Link>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="user-info">
            <h3>Hi, Welcome Back Admin!</h3>
            <p>{user.name}</p>
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

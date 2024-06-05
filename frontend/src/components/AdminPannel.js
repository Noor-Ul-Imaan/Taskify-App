import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./adminOrg/AuthContext";
import axios from "axios";
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaBuilding,
  FaSignOutAlt,
  FaCogs,
} from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./AdminPannel.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminPannel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    roleCounts: {},
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user) {
          const usersResponse = await axios.get(
            "http://localhost:5000/api/users",
            {
              withCredentials: true,
            }
          );

          const roleCounts = usersResponse.data.reduce((acc, user) => {
            const role = user.role.name;
            acc[role] = acc[role] ? acc[role] + 1 : 1;
            return acc;
          }, {});

          setStats({
            totalUsers: usersResponse.data.length,
            roleCounts: roleCounts,
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

  // Data for the bar chart
  const data = {
    labels: ["Total Users"],
    datasets: [
      {
        label: "Total Users",
        data: [stats.totalUsers],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Total Users",
      },
    },
  };

  // Data for the pie chart
  const roleData = {
    labels: Object.keys(stats.roleCounts),
    datasets: [
      {
        label: "# of Users",
        data: Object.values(stats.roleCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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
          {user ? (
            <>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <p>logged out</p>
          )}
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
            <Bar data={data} options={options} />
          </div>
          <div className="stat-box">
            <h4>Users by Role</h4>
            <Pie data={roleData} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPannel;

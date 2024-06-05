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
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from "chart.js";
import "./AdminPannel.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
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
  const [signUpData, setSignUpData] = useState({
    labels: [],
    data: [],
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

    const fetchSignUpData = async () => {
      try {
        const signUpResponse = await axios.get(
          "http://localhost:5000/api/signups/monthly",
          {
            withCredentials: true,
          }
        );

        const labels = signUpResponse.data.map((item) => item.month);
        const data = signUpResponse.data.map((item) => item.count);

        setSignUpData({
          labels: labels,
          data: data,
        });
      } catch (error) {
        console.error("Error fetching sign-up data:", error);
      }
    };

    fetchStats();
    fetchSignUpData();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Data for the pie chart
  const roleData = {
    labels: Object.keys(stats.roleCounts),
    datasets: [
      {
        label: "# of Users",
        data: Object.values(stats.roleCounts),
        backgroundColor: ["#E76F51", "#2A9D8F", "#E9C46A", "#F4A261"],
        borderColor: ["#E76F51", "#2A9D8F", "#E9C46A", "#F4A261"],
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
            <h4>Users by Role</h4>
            <Pie data={roleData} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPannel;

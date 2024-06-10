import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./adminOrg/AuthContext";
import logo from "../images/logo.png";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaBuilding,
  FaSignOutAlt,
  FaCogs,
} from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
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

const TopUsers = ({ users }) => {
  return (
    <div className="top-users">
      <h4>Top 5 Users</h4>
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <h5>
            {user.firstname} {user.lastname}
          </h5>
          <p>Role: {user.role.name}</p>
          <p>Rating: {user.averageRating}</p>
        </div>
      ))}
    </div>
  );
};

const AdminPannel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    roleCounts: {},
    topUsers: [],
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

          const users = usersResponse.data;
          const usersWithRatings = await Promise.all(
            users.map(async (user) => {
              const tasksResponse = await axios.get(
                `http://localhost:5000/api/tasks/user/${user.username}`,
                {
                  withCredentials: true,
                }
              );

              const tasks = tasksResponse.data.data;
              const ratings = tasks
                .filter((task) => task.rating !== undefined)
                .map((task) => task.rating);

              const averageRating =
                ratings.length > 0
                  ? (
                      ratings.reduce((sum, rating) => sum + rating, 0) /
                      ratings.length
                    ).toFixed(2)
                  : 0;

              return {
                ...user,
                averageRating: parseFloat(averageRating),
                taskCount: tasks.length,
              };
            })
          );

          usersWithRatings.sort((a, b) => b.averageRating - a.averageRating);

          setStats({
            totalUsers: usersWithRatings.length,
            roleCounts: usersWithRatings.reduce((acc, user) => {
              const role = user.role.name;
              acc[role] = acc[role] ? acc[role] + 1 : 1;
              return acc;
            }, {}),
            topUsers: usersWithRatings.slice(0, 5),
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

  const barData = {
    labels: stats.topUsers.map((user) => `${user.firstname} ${user.lastname}`),
    datasets: [
      {
        label: "Number of Tasks Completed",
        data: stats.topUsers.map((user) => user.taskCount),
        backgroundColor: ["#008080;"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Swal.fire({
      title: "Logged Out",
      text: "You have logged out successfully!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <p>Dashboard</p>
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
          <div className="stat-box2">
            <TopUsers users={stats.topUsers} />
          </div>
          <div className="stat-box1">
            <h4>Users by Role</h4>
            <Pie data={roleData} />
          </div>
          <div className="stat-box3">
            <h4>Total Number of Users</h4>
            <p>{stats.totalUsers}</p>
            <div className="icon">
              <FaUsers className="user-icon" />
            </div>
          </div>

          <div className="stat-box4">
            <h4>Top 5 Users Task Completion</h4>

            <Bar data={barData} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPannel;

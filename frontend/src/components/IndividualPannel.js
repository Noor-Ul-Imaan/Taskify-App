import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaBell, FaTasks, FaPlusSquare, FaList, FaClipboardList, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import "./IndividualPannel.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const IndividualPannel = () => {
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    missedTasks: 0,
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          const userTasks = response.data.data.filter(task => task.assignedTo === user.username);
          setTasks(userTasks);

          const totalTasks = userTasks.length;
          const completedTasks = userTasks.filter(task => task.isSubmitted).length;
          const pendingTasks = userTasks.filter(task => !task.isSubmitted && new Date(task.deadline) >= new Date()).length;
          const missedTasks = userTasks.filter(task => !task.isSubmitted && new Date(task.deadline) < new Date()).length;

          setTaskStats({
            totalTasks,
            completedTasks,
            pendingTasks,
            missedTasks,
          });
        })
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [navigate, token, user.username]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const barData = {
    labels: ['Total Tasks', 'Completed Tasks', 'Pending Tasks', 'Missed Tasks'],
    datasets: [
      {
        label: 'Tasks',
        data: [
          taskStats.totalTasks,
          taskStats.completedTasks,
          taskStats.pendingTasks,
          taskStats.missedTasks,
        ],
        backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c'],
      },
    ],
  };

  const pieData = {
    labels: ['Completed', 'Pending', 'Missed'],
    datasets: [
      {
        label: 'Tasks',
        data: [
          taskStats.completedTasks,
          taskStats.pendingTasks,
          taskStats.missedTasks,
        ],
        backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c'],
      },
    ],
  };

  return (
    <div>
      {user ? (
        <div>
        </div>
      ) : (
        <div>
          <p>You need to be logged in</p>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
      <div className="admin-container">
        <aside className="sidebar">
          <div className="logo">
            <h3>Dashboard</h3>
          </div>
          <ul className="menu">
            <Link to='/IndividualPannel'>
              <li><FaHome /> Home</li>
            </Link>
            <Link to='/TaskManager'>
              <li><FaPlusSquare /> Create Task</li>
            </Link>
            <Link to='/ViewAssignedToYou'>
              <li><FaList /> Pending Tasks</li>
            </Link>
            <Link to='/ViewAssignedByYou'>
              <li><FaClipboardList /> Tasks Created by You</li>
            </Link>
            <Link to='/Settings'>
              <li><FaCog /> Settings</li>
            </Link>
            {user ? (
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <p>logged out</p>
            )}
          </ul>
        </aside>
        <main className="main-content">
          <header className="header">
            <div className="user-info">
              {user ? (
                <>
                  <h3>Welcome, {user.firstname} {user.lastname}!</h3>
                  <p>{user.email}</p>
                  <p>{user.role.name}</p>
                </>
              ) : (
                <p>logged out</p>
              )}
            </div>
          </header>
          <section className="statistics">
            <div className="stat-box">
              <h4><Link to='/TotalTasks'>Total Tasks</Link></h4>
              <p>{taskStats.totalTasks}</p>
            </div>
            <div className="stat-box">
              <h4><Link to='/CompletedTasks'>Completed Tasks</Link></h4>
              <p>{taskStats.completedTasks}</p>
            </div>
            <div className="stat-box">
              <h4><Link to='/ViewAssignedToYou'>Pending Tasks</Link></h4>
              <p>{taskStats.pendingTasks}</p>
            </div>
            <div className="stat-box">
              <h4><Link to='/MissedTasks'>Missed Tasks</Link></h4>
              <p>{taskStats.missedTasks}</p>
            </div>
          </section>
          <section className="charts">
            <div className="chart-container">
              <h4>Task Distribution</h4>
              <Bar data={barData} options={{ responsive: true }} />
            </div>
            <div className="chart-container">
              <h4>Task Status</h4>
              <Pie data={pieData} options={{ responsive: true }} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default IndividualPannel;


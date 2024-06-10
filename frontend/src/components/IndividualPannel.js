import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

import logo from "../images/logo.png";


import axios from 'axios';
import { FaHome, FaBell, FaTasks, FaPlusSquare, FaList, FaClipboardList, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import "./IndividualPannel.css";
import { FaBars, FaTimes } from "react-icons/fa";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const IndividualPannel = () => {
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    missedTasks: 0,
    efficiency: 0,
    averageRating: 0,
    ratingsDistribution: []
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

          const efficiency = completedTasks / (completedTasks + missedTasks) * 100 || 0;

          const ratedTasks = userTasks.filter(task => task.isSubmitted && task.rating !== null);
          const averageRating = ratedTasks.reduce((sum, task) => sum + task.rating, 0) / ratedTasks.length || 0;

          const ratingsDistribution = [1, 2, 3, 4, 5].map(rating => ratedTasks.filter(task => task.rating === rating).length);

          setTaskStats({
            totalTasks,
            completedTasks,
            pendingTasks,
            missedTasks,
            efficiency,
            averageRating,
            ratingsDistribution,
          });
        })
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [navigate, token, user.username]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Swal.fire({
      title: 'Logged Out',
      text: 'You have logged out successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      navigate('/login');
    });
  };



  const [isOpen, setIsOpen] = useState(false); // State variable for sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const isSidebarVisible = windowWidth >= 980;

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
        backgroundColor: ['#E76F51', '#2A9D8F', '#E9C46A', '#F4A261'],
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
        backgroundColor: ['#E76F51', '#2A9D8F', '#E9C46A', '#F4A261'],
      },
    ],
  };

  const ratingsBarData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Number of Ratings',
        data: taskStats.ratingsDistribution,
        backgroundColor: ['#E76F51', '#2A9D8F', '#E9C46A', '#F4A261', '#264653'],
      },
    ],
  };


  return (
    <div className="indiv-pannel">
      <div className="toggle-container">
        {!isSidebarVisible && (
          <button className="toggle-menu" onClick={toggleSidebar}>
            <FaBars />
          </button>
        )}
      </div>

      <div className="content-container">

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
          <aside className={`indiv-sidebar ${isOpen || isSidebarVisible ? 'active' : ''}`}>
            {/* <div className="logo">
            <h3>Dashboard</h3>
          </div> */}
            <div className="navbar-logo">
              <img src={logo} alt="Logo" />
            </div>
            <br />
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

          <main className="indiv-main-content">
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
              <div className="user-actions">
              </div>
            </header>
            <section className="indiv-statistics">
              <div className="indiv-stat-box total-task-box">
                <h4><Link to='/TotalTasks'>Total Tasks</Link></h4>
                <p>{taskStats.totalTasks}</p>
              </div>
              <div className="indiv-stat-box completed-task-box">
                <h4><Link to='/CompletedTasks'>Completed Tasks</Link></h4>
                <p>{taskStats.completedTasks}</p>
              </div>
              <div className="indiv-stat-box pending-task-box">
                <h4><Link to='/ViewAssignedToYou'>Pending Tasks</Link></h4>
                <p>{taskStats.pendingTasks}</p>
              </div>
              <div className="indiv-stat-box missed-task-box">
                <h4><Link to='/MissedTasks'>Missed Tasks</Link></h4>
                <p>{taskStats.missedTasks}</p>
              </div>
            </section>
            <section>
              <div className="indiv-stat-box eff-and-rating">
                <h4>Efficiency</h4>
                <p>{taskStats.efficiency.toFixed(2)}%</p>
              </div>
              <div className="indiv-stat-box eff-and-rating">
                <h4>Average Rating</h4>
                <p>{taskStats.averageRating.toFixed(2)}</p>
              </div>
            </section>
            <section className="charts">
              <div className="barchart">
                <h4>Task Distribution</h4>
                <Bar data={barData} options={{ responsive: true }} />
              </div>
              {/* <div className="piechart">
                <h4>Task Status</h4>
                <Pie data={pieData} options={{ responsive: true }} />
              </div> */}
              <div className="barchart">
                <h4>Ratings Distribution</h4>
                <Bar data={ratingsBarData} options={{ responsive: true }} />
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default IndividualPannel;


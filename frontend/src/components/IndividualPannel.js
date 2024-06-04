import React, { useState, useEffect } from "react";
import "./IndividualPannel.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const [isOpen, setIsOpen] = useState(false); // State variable for sidebar visibility

const toggleSidebar = () => {
  setIsOpen(!isOpen);
};

// ... rest of your application code



  return (
    <div>
      {user ? (
        <div>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
      ) : (
        <div>
          <p>You need to be logged in</p>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
            <button onClick={toggleSidebar}>
        toggle
    </button>
      <div className="admin-container">



    <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
      {/* ... your sidebar content from aside.jsx */}
    {/* </aside>
        <aside className="sidebar"> */}
          <div className="logo">
            {/* <h2>Taskify</h2>
            <br></br> */}
            <h3> Dashboard</h3>
          </div>
          
          <br></br>
          <ul className="menu">
            <Link to='/IndividualPannel'><li>Home</li></Link>
            <Link to='/IndivNotifs'><li>Notifications</li></Link>
            <Link to='/IndivHomePage'><li>To-do</li></Link>
            <Link to='/TaskManager'><li>Create Task</li></Link>
            <Link to='/ViewAssignedToYou'><li>Tasks Assigned to You</li></Link>
            <Link to='/ViewAssignedByYou'><li>Tasks Assigned by You</li></Link>
            {user ? (
              <>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <p>logged out</p>
            )}
            <Link to='/Settings'><button>Settings</button></Link>
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
            <div className="user-actions">
{/*               <div className="admin-photo-circle">
                <img
                  src="\frontend\src\images\person1.jpg"
                  className="admin-photo"
                  alt="User"
                />
              </div> */}
  
      
            </div>
          </header>
          <section className="statistics">
            <div className="stat-box">
              <h4>Total Tasks</h4>
              <p>{taskStats.totalTasks}</p>
            </div>
            <div className="stat-box">
              <h4>Completed Tasks</h4>
              <p>{taskStats.completedTasks}</p>
            </div>
            <div className="stat-box">
              <h4>Pending Tasks</h4>
              <p>{taskStats.pendingTasks}</p>
            </div>
            <div className="stat-box">
              <h4>Missed Tasks</h4>
              <p>{taskStats.missedTasks}</p>
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
                <h5>View all Users</h5>
                <p>Top 5 Users</p>
                <small>April 2024</small>
                <div className="chart-img"></div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default IndividualPannel;

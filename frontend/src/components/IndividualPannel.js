import React from "react";
import "./IndividualPannel.css";
import { Link } from 'react-router-dom';


const IndividualPannel = () => {

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">
          <h2>Taskify</h2>
          <br></br>
          <h3> Dashboard</h3>
        </div>
        {/* <h2>Organization Details</h2>
      <p>Email: {user.email}</p>
      <p>Type: {user.type}</p>
      <p>Number of Levels: {user.numberOfLevels}</p>
      <h3>Roles</h3>
      {user.roles.map((role, index) => (
        <div key={index}>
          <p>Name: {role.name}</p>
          <p>Description: {role.description}</p>
        </div>
      ))} */}
      {/* <button onClick={logout}>Logout</button> */}
        <div>

        </div>
        <br></br>
        <ul className="menu">
          <Link to='/IndividualPannel'><li>Home</li></Link>
          {/* <Link to='/JoinOrg'><li>Join Organization</li></Link> */}
          <Link to='/IndivNotifs'><li>Notifications</li></Link>
          <Link to='/IndivHomePage'><li>To-do</li></Link>
          {/* create task option */}
          <Link to='/createTasks'><li>Create Task</li></Link>
          {/* <li>View All Users</li> */}
          {/* <li>Settings</li> */}
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="user-info">
            <h3>Hi, Welcome Back ADMIN!</h3>
            <p>NED</p>
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
            <Link to='/Settings'><button>Settings</button></Link>
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

export default IndividualPannel;

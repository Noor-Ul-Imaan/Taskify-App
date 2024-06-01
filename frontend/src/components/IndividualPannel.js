import React from "react";
import "./IndividualPannel.css";
import { Link } from 'react-router-dom';
// import { useAuthContext } from '../hooks/useAuthContext';
// import { useLogout } from '../hooks/useLogout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const IndividualPannel = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>



      {user ? (
        <div>
          <h1>Welcome, {user.firstname} {user.lastname}</h1>
          {/* <button onClick={handleLogout}>Logout</button> */}
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
           <h2>Taskify</h2>
           <br></br>
           <h3> Dashboard</h3>
        </div>

        {user ?(
        <>


        <h2>User Details </h2>
      <p>Email: {user.email}</p>
      <p>Name: {user.firstname} {user.lastname}</p>
      <p>Level: {user.level}</p>
      <p>Position: {user.role}</p>

      <button onClick={handleLogout}>Logout</button>
      </>)
      : (<p>logged out</p>)
      
}
        <br></br>
        <ul className="menu">
          <Link to='/IndividualPannel'><li>Home</li></Link>
          {/* <Link to='/JoinOrg'><li>Join Organization</li></Link> */}
          <Link to='/IndivNotifs'><li>Notifications</li></Link>
          <Link to='/IndivHomePage'><li>To-do</li></Link>
          {/* create task option */}
          {/* <Link to='/createTasks'><li>Create Task</li></Link> */}
          <Link to='/TaskManager'><li>Create Task</li></Link>
          {/* <li>View All Users</li> */}
          {/* <li>Settings</li> */}
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="user-info">
            <h3>Hi, Welcome Back {user.name}!</h3>
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
            <button >Log Out</button>
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


      
</div>
);
};

export default IndividualPannel;

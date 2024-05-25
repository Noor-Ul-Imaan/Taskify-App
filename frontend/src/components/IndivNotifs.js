import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './IndivNotifs.css';

function IndivNotifs() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notificationsData = [
      { message: "New assignment: Math Homework due tomorrow", type: "success" },
      { message: "Reminder: Biology quiz on Friday", type: "success" },
      { message: "You missed your deadline for Physics Assignment", type: "error" }
    ];

    setNotifications(notificationsData);
  }, []);

  return (
    <div className='indiv-notifs'>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>TASKIFY</h1>
        </div>
        <div className="navbar-links">
          <p>Signed in!</p>
          <img src="./person.svg" alt="" />
        </div>
      </nav>
      <div className="notificationContainer">
        <div className="notifications">
          <h1>Notifications</h1>
          {notifications.map((notification, index) => (
            <div key={index} className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IndivNotifs;

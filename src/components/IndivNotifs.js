import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './IndivNotifs.css';

function IndivNotifs() {
  useEffect(() => {
    const notifications = [
      { message: "New assignment: Math Homework due tomorrow", type: "success" },
      { message: "Reminder: Biology quiz on Friday", type: "success" },
      { message: "You missed your deadline for Physics Assignment", type: "error" }
    ];

    notifications.forEach(notification => {
      const notificationElement = createNotification(notification.message, notification.type);
      notificationContainer.appendChild(notificationElement);
    });
  }, []);

  const createNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add(type);
    notification.innerText = message;
    return notification;
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>TASKIFY</h1>
        </div>
        <div className="navbar-links">
          <p>Signed in!</p>
          <img src="./person.svg" alt="" />
        </div>
      </nav>
      <div className="notificationContainer" id="notificationContainer">
        <div className="notifications">
          <h1>Notifications</h1>
        </div>
      </div>
    </div>
  );
}

export default IndivNotifs;
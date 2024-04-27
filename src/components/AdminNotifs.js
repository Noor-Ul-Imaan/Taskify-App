import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminNotifs.css';

function AdminNotifs() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "User John Doe wants to join Class A", type: "pending" },
    { id: 2, message: "User Jane Smith wants to join Class B", type: "pending" },
  ]);

  const handleAccept = (id) => {
    setNotifications(prevNotifications => prevNotifications.map(notification => {
      if (notification.id === id) {
        return { ...notification, type: "accepted" };
      }
      return notification;
    }));
  };

  const handleReject = (id) => {
    setNotifications(prevNotifications => prevNotifications.map(notification => {
      if (notification.id === id) {
        return { ...notification, type: "rejected" };
      }
      return notification;
    }));
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
      <div className="notification-container">
        <div className="notifications">
          <h1>Notifications</h1>
          {notifications.map(notification => (
            <div key={notification.id} className={`notification ${notification.type}`}>
              <span className="notification-message">{notification.message}</span>
              {(notification.type === "pending") && (
                <div className="action-buttons">
                  <button className="accept-button" onClick={() => handleAccept(notification.id)}>Accept</button>
                  <button className="reject-button" onClick={() => handleReject(notification.id)}>Reject</button>
                </div>
              )}
              {(notification.type === "accepted") && <div className="accepted">Accepted</div>}
              {(notification.type === "rejected") && <div className="rejected">Rejected</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminNotifs;
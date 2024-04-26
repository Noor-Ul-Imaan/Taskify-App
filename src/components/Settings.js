import React from 'react';
import './Settings.css';

const SettingsPage = () => {
  return (
    <div className="settings-container">
      <div className="settings-box">
        <h2>Profile Settings</h2>
        <div className="setting-option">
          <label>Email:</label>
          <input type="email" placeholder="Enter new email" />
        </div>
        <div className="setting-option">
          <label>Password:</label>
          <input type="password" placeholder="Enter new password" />
        </div>
        <div className="setting-option">
          <label>Display Name:</label>
          <input type="text" placeholder="Enter new display name" />
        </div>
        <div className="setting-option">
          <label>Profile Picture:</label>
          <input type="file" accept="image/*" />
        </div>
      </div>

      <div className="settings-box">
        <h2>Notification Settings</h2>
        <div className="setting-option">
          <label>Email Notifications:</label>
          <input type="checkbox" />
          <span>Receive email notifications</span>
        </div>
        <div className="setting-option">
          <label>App Notifications:</label>
          <input type="checkbox" />
          <span>Receive app notifications</span>
        </div>
        <div className="setting-option">
          <label>Push Notifications:</label>
          <input type="checkbox" />
          <span>Receive push notifications</span>
        </div>
      </div>

      <div className="settings-box">
        <h2>Account Settings</h2>
        <div className="setting-option">
          <label>Deactivate Account:</label>
          <button>Deactivate</button>
        </div>
        <div className="setting-option">
          <label>Delete Account:</label>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

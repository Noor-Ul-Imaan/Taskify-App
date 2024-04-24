import React from 'react';
import './OrgSettings.css';

const OrganizationSettingsPage = () => {
  return (
    <div className="settings-container">
      <div className="settings-box">
        <h2>Profile Settings</h2>
        <div className="setting-option">
          <label>Organization Name:</label>
          <input type="text" placeholder="Enter organization name" />
        </div>
        <div className="setting-option">
          <label>Industry:</label>
          <input type="text" placeholder="Enter industry" />
        </div>
        <div className="setting-option">
          <label>Description:</label>
          <textarea placeholder="Enter organization description"></textarea>
        </div>
        <div className="setting-option">
          <label>Logo or Avatar:</label>
          <input type="file" accept="image/*" />
        </div>
        <div className="setting-option">
          <label>Address:</label>
          <input type="text" placeholder="Enter organization address" />
        </div>
        <div className="setting-option">
          <label>Phone Number:</label>
          <input type="tel" placeholder="Enter phone number" />
        </div>
        <div className="setting-option">
          <label>Email:</label>
          <input type="email" placeholder="Enter email" />
        </div>
      </div>

      <div className="settings-box">
        <h2>User Access and Permissions</h2>
        <div className="setting-option">
          <label>Default Permissions:</label>
          <select>
            <option>Read-only</option>
            <option>Read/Write</option>
            <option>Admin</option>
          </select>
        </div>
        <div className="setting-option">
          <label>Manage Roles:</label>
          <button>Manage Roles</button>
        </div>
        <div className="setting-option">
          <label>View Users:</label>
          <button>View Users</button>
        </div>
      </div>

      <div className="settings-box">
        <h2>Data Management</h2>
        <div className="setting-option">
          <button>Export Organization Data</button>
        </div>
        <div className="setting-option">
          <label>Data Sharing:</label>
          <input type="checkbox" />
          <span>Enable data sharing</span>
        </div>
      </div>

      <div className="settings-box">
        <h2>Delete Organization</h2>
        <div className="setting-option">
          <p>Warning: Deleting the organization will permanently remove all associated data.</p>
          <button>Delete Organization</button>
        </div>
      </div>
    </div>
  );
}

export default OrganizationSettingsPage;

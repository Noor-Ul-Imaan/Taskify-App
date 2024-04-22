// UserManagement.jsx
import React, { useState } from 'react';

const UserManagement = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSettingsPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleSaveSettings = (event) => {
        event.preventDefault();
        // Add logic here to save user settings
        handleClosePopup();
    };

    return (
        <div>
            {/* Pop-up settings edit page */}
            {showPopup && (
                <div id="settings-popup" className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>Edit User Settings</h2>
                        <form onSubmit={handleSaveSettings} id="user-settings-form">
                            <div className="setting">
                                <label htmlFor="user-role">Edit Role:</label>
                                <input type="text" id="user-role" name="user-role" placeholder="Enter new role" />
                            </div>
                            <div className="setting">
                                <label>Permissions:</label>
                                <div className="permission">
                                    <input type="checkbox" id="create-task" name="create-task" />
                                    <label htmlFor="create-task">Create Task</label>
                                </div>
                                <div className="permission">
                                    <input type="checkbox" id="assign-task" name="assign-task" />
                                    <label htmlFor="assign-task">Assign Task</label>
                                </div>
                                <div className="permission">
                                    <input type="checkbox" id="delete-task" name="delete-task" />
                                    <label htmlFor="delete-task">Delete Task</label>
                                </div>
                            </div>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
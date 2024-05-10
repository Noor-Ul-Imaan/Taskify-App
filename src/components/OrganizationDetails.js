// OrganizationDetails.js
import React, { useState } from 'react';
import './OrgDetails.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';

const OrganizationDetails = () => {
    const [hierarchyLevels, setHierarchyLevels] = useState(0);
    const [roleDetails, setRoleDetails] = useState(Array.from({ length: hierarchyLevels }, () => [{ name: '', description: '' }]));

    const handleHierarchyLevelsChange = (event) => {
        const levels = parseInt(event.target.value);
        setHierarchyLevels(levels);
        setRoleDetails(Array.from({ length: levels }, () => [{ name: '', description: '' }]));
    };

    const handleRoleNameChange = (event, levelIndex, roleIndex) => {
        const updatedRoles = [...roleDetails];
        updatedRoles[levelIndex][roleIndex].name = event.target.value;
        setRoleDetails(updatedRoles);
    };

    const handleRoleDescriptionChange = (event, levelIndex, roleIndex) => {
        const updatedRoles = [...roleDetails];
        updatedRoles[levelIndex][roleIndex].description = event.target.value;
        setRoleDetails(updatedRoles);
    };

    const addRole = (levelIndex) => {
        const updatedRoles = [...roleDetails];
        updatedRoles[levelIndex] = [...updatedRoles[levelIndex], { name: '', description: '' }];
        setRoleDetails(updatedRoles);
    };

    const removeRole = (levelIndex, roleIndex) => {
        const updatedRoles = [...roleDetails];
        updatedRoles[levelIndex].splice(roleIndex, 1);
        setRoleDetails(updatedRoles);
    };

    return (
        <div className="gradient-background">
            <div className="container">
                <div className="header">
                    <img src={logo} alt="Taskify Logo" />
                </div>
                <div className="content">
                    <h1>Organization Details</h1>
                    <form action="#">
                        <div className="input-field">
                            <label htmlFor="orgName">Organization Name</label>
                            <input type="text" id="orgName" placeholder="Enter organization name" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="orgType">Organization Type</label>
                            <select id="orgType">
                                <option value="" disabled selected>Select organization type</option>
                                <option value="tech">Technology</option>
                                <option value="finance">Finance</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="education">Education</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <label htmlFor="hierarchyLevels">Hierarchy Levels</label>
                            <input type="number" id="hierarchyLevels" min="0" max="20" placeholder="Enter hierarchy levels (0-20)" onChange={handleHierarchyLevelsChange} />
                        </div>
                        {roleDetails.map((levelRoles, levelIndex) => (
                            <div key={levelIndex}>
                                <h2>Level {levelIndex + 1}</h2>
                                {levelRoles.map((role, roleIndex) => (
                                    <div key={roleIndex} className="role-container">
                                        <div className="input-field">
                                            <label htmlFor={`roleName-${levelIndex}-${roleIndex}`}>Role Name:</label>
                                            <input type="text" id={`roleName-${levelIndex}-${roleIndex}`} value={role.name} onChange={(e) => handleRoleNameChange(e, levelIndex, roleIndex)} />
                                        </div>
                                        <div className="input-field">
                                            <label htmlFor={`roleDescription-${levelIndex}-${roleIndex}`}>Role Description:</label>
                                            <input type="text" id={`roleDescription-${levelIndex}-${roleIndex}`} value={role.description} onChange={(e) => handleRoleDescriptionChange(e, levelIndex, roleIndex)} />
                                        </div>
                                        {roleIndex === 0 && levelRoles.length > 1 && <button type="button" onClick={() => removeRole(levelIndex, roleIndex)}>Remove Role</button>}
                                    </div>
                                ))}
                                <button type="button" onClick={() => addRole(levelIndex)}>Add Role</button>
                            </div>
                        ))}
                        <Link to='/adminHomepage'>
                            <button type="submit">Submit</button>
                        </Link>
                    </form>
                </div>
                <div className="footer">
                    <span>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</span>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetails;

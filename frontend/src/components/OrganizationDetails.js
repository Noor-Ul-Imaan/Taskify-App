// OrganizationDetails.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './OrgSignUp.css'; // Import CSS styles
import logo from './logo.png'; // Import logo image (adjust the path as needed)

const OrganizationDetails = () => {
  const navigate = useNavigate();

  // State for admin signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for organization details
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [numberOfLevels, setNumberOfLevels] = useState(0);
  const [roles, setRoleDetails] = useState(Array.from({ length: numberOfLevels }, () => [{ name: 'Role Name', description: 'Role Description' }]));
  const [loading, setLoading] = useState(false);

  const handleHierarchyLevelsChange = (event) => {
    const levels = parseInt(event.target.value);
    setNumberOfLevels(levels);
    setRoleDetails(Array.from({ length: levels }, () => [{ name: '', description: '' }]));
  };

  const handleRoleNameChange = (event, levelIndex, roleIndex) => {
    const updatedRoles = [...roles];
    updatedRoles[levelIndex][roleIndex].name = event.target.value;
    setRoleDetails(updatedRoles);
  };

  const handleRoleDescriptionChange = (event, levelIndex, roleIndex) => {
    const updatedRoles = [...roles];
    updatedRoles[levelIndex][roleIndex].description = event.target.value;
    setRoleDetails(updatedRoles);
  };

  const addRole = (levelIndex) => {
    const updatedRoles = [...roles];
    updatedRoles[levelIndex].push({ name: '', description: '' });  // Initialize name and description fields as empty
    setRoleDetails(updatedRoles);
  };

  const removeRole = (levelIndex, roleIndex) => {
    const updatedRoles = [...roles];
    updatedRoles[levelIndex].splice(roleIndex, 1);
    setRoleDetails(updatedRoles);
  };

  const handleSaveOrg = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate roles array before saving
      const isValid = roles.every(levelRoles => levelRoles.every(role => role.name.trim() !== ''));

      if (!isValid) {
        alert('Please provide a name for each role.');
        setLoading(false);
        return;
      }

      if (!email || !password || !name || !type || !numberOfLevels || !isValid) {
        alert('Please fill in all required fields.');
        setLoading(false);
        return;
      }

      const orgData = {
        email, // include email in organization data
        password, // include password in organization data
        name,
        type,
        numberOfLevels,
        roles
      };

      // Save organization to the database
      await axios.post('http://localhost:5000/organizations', orgData);

      // No need to create user after creating the organization
      // await axios.post('http://localhost:3000/signup', { email, password });

      setLoading(false);
      navigate('/adminHomepage');
    } catch (error) {
      console.error('Error saving organization:', error);
      setLoading(false);
      alert('An error occurred. Please check console');
    }
  };

  return (
    <div className="login">
      <div className="gradient-background">
        <div className="container">
          <div className="header">
            <img src={logo} alt="Taskify Logo" />
          </div>
          <div className="content">
            <h1>Signup and Create Organization</h1>
            <form onSubmit={handleSaveOrg}>
              {/* User Signup Section */}
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              {/* Organization Details Section */}
              <div className="input-field">
                <label htmlFor="name">Organization Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter organization name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label htmlFor="type">Organization Type</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="" disabled>Select organization type</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="input-field">
                <label htmlFor="numberOfLevels">Hierarchy Levels</label>
                <input
                  type="number"
                  id="numberOfLevels"
                  min="0"
                  max="20"
                  placeholder="Enter hierarchy levels (0-20)"
                  value={numberOfLevels}
                  onChange={handleHierarchyLevelsChange}
                />
              </div>
              {roles.map((levelRoles, levelIndex) => (
                <div key={levelIndex}>
                  <h2>Level {levelIndex + 1}</h2>
                  {levelRoles.map((role, roleIndex) => (
                    <div key={roleIndex} className="role-container">
                      <div className="input-field">
                        <label htmlFor={`roleName-${levelIndex}-${roleIndex}`}>Role Name:</label>
                        <input
                          type="text"
                          id={`roleName-${levelIndex}-${roleIndex}`}
                          value={role.name}
                          onChange={(e) => handleRoleNameChange(e, levelIndex, roleIndex)}
                        />
                      </div>
                      <div className="input-field">
                        <label htmlFor={`roleDescription-${levelIndex}-${roleIndex}`}>Role Description:</label>
                        <input
                          type="text"
                          id={`roleDescription-${levelIndex}-${roleIndex}`}
                          value={role.description}
                          onChange={(e) => handleRoleDescriptionChange(e, levelIndex, roleIndex)}
                        />
                      </div>
                      {roleIndex === 0 && levelRoles.length > 1 && (
                        <button type="button" onClick={() => removeRole(levelIndex, roleIndex)}>Remove Role</button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addRole(levelIndex)}>Add Role</button>
                </div>
              ))}
              <button type="submit">Sign Up and Save Organization</button>
            </form>
          </div>
          <div className="footer">
            <span>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetails;










import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './adminOrg/AuthContext'; // Make sure to import the useAuth hook

const OrganizationDetails = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure the login function from useAuth
  const [showPassword, setShowPassword] = useState(false);

  // State for admin signup
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for organization details
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [numberOfRoles, setNumberOfRoles] = useState(0);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRolesChange = (event) => {
    const roles = parseInt(event.target.value);
    setNumberOfRoles(roles);
    setRoles(Array.from({ length: roles }, (_, index) => ({ name: '', level: '', id: index + 1 })));
  };

  const handleRoleNameChange = (event, index) => {
    const updatedRoles = [...roles];
    updatedRoles[index].name = event.target.value;
    setRoles(updatedRoles);
  };

  const handleRoleLevelChange = (event, index) => {
    const updatedRoles = [...roles];
    updatedRoles[index].level = event.target.value;
    setRoles(updatedRoles);
  };

  const handleSaveOrg = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Define password conditions
    const passwordConditions = {
      minLength: 8,
      hasUpperCase: /[A-Z]/,
      hasLowerCase: /[a-z]/,
      hasNumber: /\d/,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
    };

    // Check password conditions
    const isPasswordValid = (
      password.length >= passwordConditions.minLength &&
      passwordConditions.hasUpperCase.test(password) &&
      passwordConditions.hasLowerCase.test(password) &&
      passwordConditions.hasNumber.test(password) &&
      passwordConditions.hasSpecialChar.test(password)
    );

    if (!isPasswordValid) {
      alert('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
      setLoading(false);
      return;
    }

    try {
      if (!email || !password || !name || !type || numberOfRoles <= 0) {
        alert('Please fill in all required fields.');
        setLoading(false);
        return;
      }

      // Check if all roles have name and level specified
      const isValid = roles.every(role => role.name.trim() !== '' && role.level.trim() !== '');

      if (!isValid) {
        alert('Please provide a name and level for each role.');
        setLoading(false);
        return;
      }

      const orgData = {
        email,
        password,
        name,
        type,
        roles,
      };

      await axios.post('http://localhost:5000/organizations', orgData);
      
      // Automatically log in the user
      await login(email, password);
      
      setLoading(false);
      navigate('/AdminPannel');
    } catch (error) {
      console.error('Error saving organization:', error);
      setLoading(false);
      alert('An error occurred. Please try again later');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="gradient-background">
        <div className="ccontainer">
          <div className="content">
            <h1>Register your Organization</h1>
            <form onSubmit={handleSaveOrg}>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="checkbox-field">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                />
                <label htmlFor="showPassword">Show Password</label>
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
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="type">Organization Type</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
                  <option value="" disabled>Select organization type</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="input-field">
                <label htmlFor="numberOfRoles">Number of Roles</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter number of roles"
                  value={numberOfRoles}
                  onChange={handleRolesChange}
                  required
                />
              </div>

              {/* Dynamic Roles Section */}
              {roles.map((role, index) => (
                <div key={index} className="role-container">
                  <h2>Role {index + 1}</h2>
                  <div className="input-field">
                    <label>Role Name:</label>
                    <input
                      type="text"
                      value={role.name}
                      onChange={(e) => handleRoleNameChange(e, index)}
                      placeholder="Enter role name"
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Level:</label>
                    <input
                      type="text"
                      value={role.level}
                      onChange={(e) => handleRoleLevelChange(e, index)}
                      placeholder="Enter role level"
                      required
                    />
                  </div>
                </div>
              ))}

              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetails;

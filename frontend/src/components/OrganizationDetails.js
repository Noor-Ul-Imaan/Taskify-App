import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "./logo.png";

const OrganizationDetails = () => {
  const navigate = useNavigate();

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
      setLoading(false);
      navigate('/AdminPannel');
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
              {/* <div className="input-field">
                <label htmlFor="text">Admin Name</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Admin Name"
                />
              </div> */}
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
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





// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import './OrgDetails.css';
// import logo from './logo.png';

// const OrganizationDetails = () => {
//   const [orgName, setOrgName] = useState('');
//   const [orgType, setOrgType] = useState('');
//   const [numberOfLevels, setNumberOfLevels] = useState(0);
//   const [roles, setRoleDetails] = useState(Array.from({ length: numberOfLevels }, () => [{ name: '', description: '' }]));

//   const [adminName, setAdminName] = useState('');
//   const [adminEmail, setAdminEmail] = useState('');
//   const [adminPassword, setAdminPassword] = useState('');

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleHierarchyLevelsChange = (event) => {
//     const levels = parseInt(event.target.value);
//     setNumberOfLevels(levels);
//     setRoleDetails(Array.from({ length: levels }, () => [{ name: '', description: '' }]));
//   };

//   const handleRoleNameChange = (event, levelIndex, roleIndex) => {
//     const updatedRoles = [...roles];
//     updatedRoles[levelIndex][roleIndex].name = event.target.value;
//     setRoleDetails(updatedRoles);
//   };

//   const handleRoleDescriptionChange = (event, levelIndex, roleIndex) => {
//     const updatedRoles = [...roles];
//     updatedRoles[levelIndex][roleIndex].description = event.target.value;
//     setRoleDetails(updatedRoles);
//   };

//   const addRole = (levelIndex) => {
//     const updatedRoles = [...roles];
//     updatedRoles[levelIndex] = [...updatedRoles[levelIndex], { name: '', description: '' }];
//     setRoleDetails(updatedRoles);
//   };

//   const removeRole = (levelIndex, roleIndex) => {
//     const updatedRoles = [...roles];
//     updatedRoles[levelIndex].splice(roleIndex, 1);
//     setRoleDetails(updatedRoles);
//   };

//   const handleSaveOrg = async () => {
//     const isValid = roles.every(levelRoles => levelRoles.every(role => role.name.trim() !== ''));

//     if (!isValid) {
//       alert('Please provide a name for each role.');
//       return;
//     }

//     const data = {
//       name: orgName,
//       type: orgType,
//       numberOfLevels,
//       roles,
//       admin: {
//         name: adminName,
//         email: adminEmail,
//         password: adminPassword,
//       },
//     };

//     console.log('Data sent to backend:', data);
//     setLoading(true);

//     try {
//       await axios.post('http://localhost:5000/admin', data);
//       setLoading(false);
//       navigate('/adminHomepage');
//     } catch (error) {
//       setLoading(false);
//       alert('An error occurred. Please check console');
//       console.log(error);
//     }
//   };

//   return (
//     <div className="gradient-background">
//       <div className="container">
//         <div className="header">
//           <img src={logo} alt="Taskify Logo" />
//         </div>
//         <div className="content">
//           <h1>Create Organization</h1>
//           <form action="#">
//             <div className="input-field">
//               <label htmlFor="orgName">Organization Name</label>
//               <input type="text" id="orgName" placeholder="Enter organization name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
//             </div>
//             <div className="input-field">
//               <label htmlFor="orgType">Organization Type</label>
//               <select id="orgType" value={orgType} onChange={(e) => setOrgType(e.target.value)}>
//                 <option value="" disabled>Select organization type</option>
//                 <option value="tech">Technology</option>
//                 <option value="finance">Finance</option>
//                 <option value="healthcare">Healthcare</option>
//                 <option value="education">Education</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//             <div className="input-field">
//               <label htmlFor="numberOfLevels">Hierarchy Levels</label>
//               <input type="number" id="numberOfLevels" min="0" max="20" placeholder="Enter hierarchy levels (0-20)" value={numberOfLevels} onChange={handleHierarchyLevelsChange} />
//             </div>
//             {roles.map((levelRoles, levelIndex) => (
//               <div key={levelIndex}>
//                 <h2>Level {levelIndex + 1}</h2>
//                 {levelRoles.map((role, roleIndex) => (
//                   <div key={roleIndex} className="role-container">
//                     <div className="input-field">
//                       <label htmlFor={`roleName-${levelIndex}-${roleIndex}`}>Role Name:</label>
//                       <input type="text" id={`roleName-${levelIndex}-${roleIndex}`} value={role.name} onChange={(e) => handleRoleNameChange(e, levelIndex, roleIndex)} />
//                     </div>
//                     <div className="input-field">
//                       <label htmlFor={`roleDescription-${levelIndex}-${roleIndex}`}>Role Description:</label>
//                       <input type="text" id={`roleDescription-${levelIndex}-${roleIndex}`} value={role.description} onChange={(e) => handleRoleDescriptionChange(e, levelIndex, roleIndex)} />
//                     </div>
//                     {roleIndex === 0 && levelRoles.length > 1 && <button type="button" onClick={() => removeRole(levelIndex, roleIndex)}>Remove Role</button>}
//                   </div>
//                 ))}
//                 <button type="button" onClick={() => addRole(levelIndex)}>Add Role</button>
//               </div>
//             ))}
//             <div className="input-field">
//               <label htmlFor="adminName">Admin Name</label>
//               <input type="text" id="adminName" placeholder="Enter admin name" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
//             </div>
//             <div className="input-field">
//               <label htmlFor="adminEmail">Admin Email</label>
//               <input type="email" id="adminEmail" placeholder="Enter admin email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
//             </div>
//             <div className="input-field">
//               <label htmlFor="adminPassword">Admin Password</label>
//               <input type="password" id="adminPassword" placeholder="Enter admin password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
//             </div>
//             <button type="button" onClick={handleSaveOrg}>Save Organization</button>
//           </form>
//         </div>
//         <div className="footer">
//           <span>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationDetails;



















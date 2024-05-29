import React from 'react';
import { useAuth } from './adminOrg/AuthContext';

const AdminHomepage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <h2>Organization Details</h2>
      <p>Email: {user.email}</p>
      <p>Type: {user.type}</p>
      <p>Number of Levels: {user.numberOfLevels}</p>
      <h3>Roles</h3>
      {user.roles.map((role, index) => (
        <div key={index}>
          <p>Name: {role.name}</p>
          <p>Description: {role.description}</p>
        </div>
      ))}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminHomepage;





// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
// import "./AdminHomepage.css"; // Assuming you have a CSS file for styling

// const AdminHomepage = () => {
//   const [organization, setOrganization] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [orgId, setOrgId] = useState("");

//   const handleOrgIdChange = (event) => {
//     setOrgId(event.target.value);
//   };

//   const handleGetOrganization = () => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5000/organizations/${orgId}`)
//       .then((response) => {
//         setOrganization(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="adminHomepage">
//       <div>
//         <h1>ORGANIZATION DETAILS</h1>
//         <input
//           type="text"
//           value={orgId}
//           onChange={handleOrgIdChange}
//           placeholder="Enter Organization ID"
//         />
//         <button onClick={handleGetOrganization}>Get Organization</button>
//       </div>
//       {loading ? (
//         <div className="loading-indicator">Loading...</div>
//       ) : organization ? (
//         <div>
//           <h2>{organization.name}</h2>
//           <p>Type: {organization.type}</p>
//           <div>
//             <Link to={`/organizations/details/${organization._id}`}>
//               Details <BsInfoCircle />
//             </Link>
//             <Link to={`/organizations/edit/${organization._id}`}>
//               Edit <AiOutlineEdit />
//             </Link>
//             <Link to={`/organizations/delete/${organization._id}`}>
//               Delete <MdOutlineDelete />
//             </Link>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default AdminHomepage;

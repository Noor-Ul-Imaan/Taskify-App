// // UserDetails.js
// import React from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";

// const UserDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory
//   const { user } = location.state || {};

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/users/${user._id}`, {
//         withCredentials: true,
//       });
//       // Redirect to User Management page after deletion
//       navigate("/user-management"); // Use navigate for redirection
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   return (
//     <div className="user-details">
//       <h1>User Details</h1>
//       {user ? (
//         <div>
//           <p>
//             <strong>First Name:</strong> {user.firstname}
//           </p>
//           <p>
//             <strong>Last Name:</strong> {user.lastname}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <p>
//             <strong>Organization Name:</strong> {user.organizationName}
//           </p>
//           <p>
//             <strong>Role:</strong> {user.role.name}
//           </p>
//           <p>
//             <strong>Username:</strong> {user.username}
//           </p>
//           <button onClick={handleDelete}>Delete</button>
//         </div>
//       ) : (
//         <p>No user data available.</p>
//       )}
//     </div>
//   );
// };

// export default UserDetails;
import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { user } = location.state || {};

  // Confirmation before deletion (optional)
  const handleDeleteConfirmation = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${user._id}`, {
        withCredentials: true,
      });
      // Redirect to User Management page after deletion
      navigate("/user-management"); // Use navigate for redirection
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-details">
      <h1>User Details</h1>
      {user ? (
        <div>
          <p>
            <strong>First Name:</strong> {user.firstname}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Organization Name:</strong> {user.organizationName}
          </p>
          <p>
            <strong>Role:</strong> {user.role.name}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <button onClick={handleDeleteConfirmation}>Delete</button>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserDetails;

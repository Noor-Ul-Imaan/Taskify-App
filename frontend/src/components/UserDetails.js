// import React from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";

// const UserDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory
//   const { user } = location.state || {};

//   // Confirmation before deletion (optional)
//   const handleDeleteConfirmation = () => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       handleDelete();
//     }
//   };

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
//           <button onClick={handleDeleteConfirmation}>Delete</button>
//         </div>
//       ) : (
//         <p>No user data available.</p>
//       )}
//     </div>
//   );
// };

// export default UserDetails;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { user } = location.state || {};

  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    missedTasks: 0,
  });

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

  // Fetch user tasks and calculate stats on component mount
  useEffect(() => {
    if (user) {
      const fetchUserTasks = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/tasks/user/${user.username}`
          );
          const userTasks = response.data.data;

          const totalTasks = userTasks.length;
          const completedTasks = userTasks.filter(
            (task) => task.isSubmitted
          ).length;
          const pendingTasks = userTasks.filter(
            (task) => !task.isSubmitted && new Date(task.deadline) >= new Date()
          ).length;
          const missedTasks = userTasks.filter(
            (task) => !task.isSubmitted && new Date(task.deadline) < new Date()
          ).length;

          setTaskStats({
            totalTasks,
            completedTasks,
            pendingTasks,
            missedTasks,
          });
        } catch (error) {
          console.error("Error fetching user tasks:", error);
        }
      };

      fetchUserTasks();
    }
  }, [user]); // Run effect only when user changes

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
          <h2>Task Statistics</h2>
          <p>
            <strong>Total Tasks:</strong> {taskStats.totalTasks}
          </p>
          <p>
            <strong>Completed Tasks:</strong> {taskStats.completedTasks}
          </p>
          <p>
            <strong>Pending Tasks:</strong> {taskStats.pendingTasks}
          </p>
          <p>
            <strong>Missed Tasks:</strong> {taskStats.missedTasks}
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

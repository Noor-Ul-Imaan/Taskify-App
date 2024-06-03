// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "./adminOrg/AuthContext"; // Import useAuth hook

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useAuth(); // Use useAuth hook to access user data

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         if (!user || !user.token) {
//           // Check for both user and token
//           setError("Please log in to access users.");
//           setLoading(false);
//           return;
//         }

//         const token = user.token; // Assuming token is stored in user object

//         const response = await axios.get("http://localhost:5000/api/users", {
//           // Assuming backend expects token in a custom header
//           headers: {
//             Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
//           },
//           withCredentials: true, // Include credentials for cookie-based authentication
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error(error);
//         setError("Error fetching users. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [user]); // Re-run useEffect when user changes (e.g., after login)

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user._id}>
//             {user.firstname} {user.lastname} - {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserManagement;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./adminOrg/AuthContext"; // Import useAuth hook

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Use useAuth hook to access user data

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!user) {
          // Check for both user and token
          setError("Please log in to access users.");
          setLoading(false);
          return;
        }

        // const token = user.token; // Assuming token is stored in user object

        const response = await axios.get("http://localhost:5000/api/users", {
          // Assuming backend expects token in a custom header
          // headers: {
          //   Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
          // },
          withCredentials: true, // Include credentials for cookie-based authentication
        });
        setUsers(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]); // Re-run useEffect when user changes (e.g., after login)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstname} {user.lastname} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;

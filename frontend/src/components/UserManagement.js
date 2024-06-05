import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./adminOrg/AuthContext"; // Import useAuth hook
import "./UserManagement.css"; // Import CSS for styling
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("alphabetical");
  const { user } = useAuth(); // Use useAuth hook to access user data

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          withCredentials: true, // Include credentials for cookie-based authentication
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    } else {
      setLoading(false);
      setError("Please log in to access users.");
    }
  }, [user]); // Re-run useEffect when user changes (e.g., after login)

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const filteredUsers = users
    .filter((user) => {
      if (searchTerm) {
        return (
          user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (filterOption === "alphabetical") {
        const nameA = `${a.firstname} ${a.lastname}`.toLowerCase();
        const nameB = `${b.firstname} ${b.lastname}`.toLowerCase();
        return nameA.localeCompare(nameB);
      }
      return 0;
    });

  if (loading) return <div>Loading...</div>;
  if (error && !user) return <div>{error}</div>;

  return (
    <div className="user-management">
      <div>
        <Link to="/AdminPannel">
          <FaHome />
          Home
        </Link>
      </div>
      {user ? (
        <>
          <h1>User Management</h1>
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <select value={filterOption} onChange={handleFilterChange}>
              <option value="alphabetical">Sort by Alphabetical Order</option>
              <option value="role">Sort by Role</option>
            </select>
          </div>
          <div className="user-list">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <Link
                        to={`/user-details/${user._id}`}
                        state={{ user: user }}
                      >
                        {user.firstname} {user.lastname}
                      </Link>
                    </td>
                    <td>{user.role.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>Please log in to access users.</div>
      )}
    </div>
  );
};

export default UserManagement;

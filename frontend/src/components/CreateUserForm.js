import React, { useState, useEffect } from "react";
import CreateUserApiService from "./services/CreateUserApiService";
import Swal from "sweetalert2"; // Import SweetAlert
import "./CreateUserForm.css"; // Import the CSS file
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateUserForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await CreateUserApiService.getRoles();
        setRoles(response.data.roles);
      } catch (error) {
        console.error("Error fetching roles", error);
      }
    };

    fetchRoles();
  }, []);

  const generateRandomPassword = () => {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomPassword = generateRandomPassword(); // Generate random password here
    setLoading(true); // Set loading to true when starting the request

    try {
      const response = await CreateUserApiService.createUser({
        firstname,
        lastname,
        email,
        roleId: selectedRole,
        password: randomPassword, // Use generated password in the request body
      });
      setGeneratedUsername(response.data.username);
      setGeneratedPassword(randomPassword); // Set the generated password to state
      Swal.fire({
        title: "User Created Successfully",
        icon: "success",
        html: `
          <p><b>Username:</b> ${response.data.username}</p>
          <p><b>Password:</b> ${randomPassword}</p>
        `,
        confirmButtonText: "OK",
      });
      setLoading(false); // Set loading to false after the request is done
    } catch (error) {
      console.error(
        "Error creating user",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response ? error.response.data.message : "Error creating user"
      );
      setLoading(false); // Set loading to false after the request is done
    }
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
  };

  const handleFirstnameChange = (e) => {
    const { value } = e.target;
    if (validateName(value)) {
      setFirstname(value);
    } else {
      Swal.fire({
        title: "Invalid Input",
        text: "First name should only contain alphabetic characters and no spaces.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const handleLastnameChange = (e) => {
    const { value } = e.target;
    if (validateName(value)) {
      setLastname(value);
    } else {
      Swal.fire({
        title: "Invalid Input",
        text: "Last name should only contain alphabetic characters and no spaces.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="gradient-background">
      <div className="container">
        <Link to="/AdminPannel">
          <FaHome />
          Home
        </Link>
        <div className="content">
          <h1>Create User</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                placeholder="First Name"
                value={firstname}
                onChange={handleFirstnameChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                placeholder="Last Name"
                value={lastname}
                onChange={handleLastnameChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Create User"}
            </button>
          </form>
          {generatedUsername && (
            <div>
              <h3>User Created</h3>
              <p>Username: {generatedUsername}</p>
              <p>Password: {generatedPassword}</p>
            </div>
          )}
          {error && (
            <div>
              <p style={{ color: "red" }}>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;

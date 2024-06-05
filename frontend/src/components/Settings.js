import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import "./Settings.css";
import { Link } from 'react-router-dom';
import { FaHome} from 'react-icons/fa';


const Settings = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.id) {
        setUser(userData);
        setFirstName(userData.firstname);
        setLastName(userData.lastname);
        setEmail(userData.email);
        setUserName(userData.username);
      } else {
        console.error("User data not found. Please log in again.");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!firstName || !lastName || !email || !userName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    if (!user || !user.id) {
      console.error("User ID is missing. Please log in again.");
      return;
    }

    // Username validation
    const userNameRegex = /^[^\s]+$/;
    if (!userNameRegex.test(userName)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username cannot contain spaces.'
      });
      return;
    }

    // First name and last name validation
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'First name and last name can only contain letters.'
      });
      return;
    }

  

    try {
      const response = await axios.put(`http://localhost:5000/settings/users/${user.id}`, {
        firstName,
        lastName,
        email,
        userName
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      if (response.data.success) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        setFirstName(updatedUser.firstname);
        setLastName(updatedUser.lastname);
        setEmail(updatedUser.email);
        setUserName(updatedUser.username);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSuccessMessage("Profile information updated successfully!");
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile information has been updated successfully.'
        });
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!newPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a new password.'
      });
      return;
    }
  // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (newPassword && !passwordRegex.test(newPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
      });
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/settings/users/${user.id}/password`, {
        newPassword,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      if (response.data.success) {
        setSuccessMessage("Password changed successfully!");
        Swal.fire({
          icon: 'success',
          title: 'Password Updated',
          text: 'Your password has been updated successfully.'
        });
        setNewPassword("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleDeleteAccount = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`http://localhost:5000/settings/users/${user.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          });

          if (response.data.success) {
            localStorage.removeItem("user");
            setSuccessMessage("Account deleted successfully. Redirecting...");
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
            Swal.fire({
              icon: 'success',
              title: 'Account Deleted',
              text: 'Your account has been deleted successfully. Redirecting to sign-in page...'
            });
          } else {
            setErrorMessage(response.data.message);
          }
        }
      });
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="settings-page">
      <Link to='/IndividualPannel'>
              <><FaHome /> Home</>
            </Link>
      <h2>Settings</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSave}>
        <h3>Profile Information</h3>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>

      <hr />

      <form onSubmit={handleChangePassword}>
        <h3>Change Password</h3>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
        <button type="submit">Change Password</button>
      </form>

      <hr />

      <h3>Leave Organization</h3>
      <p className="warning-message">Warning: This action is irreversible. Please proceed with caution.</p>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default Settings;


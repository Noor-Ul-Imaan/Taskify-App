import React from 'react';
import './whoareyou.css'; // Make sure the path to the CSS file is correct
import logo from './logo.png'; // Adjust the path as necessary

const TaskifySignup = () => {
  // Function to handle user choice
  const handleUserChoice = (choice) => {
    // This can be replaced by routing logic or other state handling
    console.log(`User chose: ${choice}`);
  };

  return (
    <div className="gradient-background">
      <div className="container">
        <div className="header">
          <img src={logo} alt="Taskify Logo" />
        </div>
        <div className="content">
          <h1>Who are you?</h1>
          <div className="options">
            <button id="individual" onClick={() => handleUserChoice('individual')}>
              I am an Individual
            </button>
            <button id="organization" onClick={() => handleUserChoice('organization')}>
              I am an Organization
            </button>
          </div>
        </div>
        <div className="footer">
          <span>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</span>
        </div>
      </div>
    </div>
  );
};

export default TaskifySignup;
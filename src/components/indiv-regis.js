import React from 'react';
import './indiv-regis.css'; // Import CSS styles

const IndividualSignup = () => {
  const togglePasswordVisibility = (fieldId) => {
    const field = document.getElementById(fieldId);
    const toggleButton = field.nextElementSibling;
    if (field.type === 'password') {
      field.type = 'text';
      toggleButton.textContent = 'Hide';
    } else {
      field.type = 'password';
      toggleButton.textContent = 'Show';
    }
  };

  return (
    <div className="gradient-background">
      <div className="container">
        <div className="header">
          <h2>Individual Signup</h2>
        </div>
        <div className="content">
          <form action="#">
            <div className="input-field">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="Enter your full name" />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input type="password" id="password" placeholder="Enter your password" />
                <span className="toggle-password" onClick={() => togglePasswordVisibility('password')}>
                  Show
                </span>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-field">
                <input type="password" id="confirmPassword" placeholder="Confirm your password" />
                <span className="toggle-password" onClick={() => togglePasswordVisibility('confirmPassword')}>
                  Show
                </span>
              </div>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="footer">
          <span>
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </span>
        </div>
      </div>
    </div>
  );
};

export default IndividualSignup;
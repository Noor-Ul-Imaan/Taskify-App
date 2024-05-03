// OrganizationSignup.js
import React from 'react';
import './OrgSignUp.css'; // Import CSS styles
import logo from './logo.png'; // Import logo image (adjust the path as needed)

const OrganizationSignup = () => {
return (
<div className="gradient-background">
    <div className="container">
        <div className="header">
            <img src={logo} alt="Taskify Logo" />
        </div>
        <div className="content">
            <h1>Organization Signup</h1>
            <form action="#">
                <div className="input-field">
                    <label htmlFor="orgName">Organization Name</label>
                    <input type="text" id="orgName" placeholder="Enter organization name" />
                </div>
                <div className="input-field">
                    <label htmlFor="orgType">Organization Type</label>
                    <select id="orgType">
                        <option value="" disabled selected>Select organization type</option>
                        <option value="tech">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="input-field">
                    <label htmlFor="contactPerson">Contact Person Name</label>
                    <input type="text" id="contactPerson" placeholder="Enter contact person name" />
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter email" />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" />
                </div>
                <div className="input-field">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm password" />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
        <div className="footer">
            <span>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</span>
        </div>
    </div>
</div>
);
};

export default OrganizationSignup;

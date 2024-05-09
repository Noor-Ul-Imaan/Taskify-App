// OrganizationSignup.js
import React from 'react';
import './OrgSignUp.css'; // Import CSS styles
import logo from './logo.png'; // Import logo image (adjust the path as needed)
import { Link } from 'react-router-dom';

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
                        <Link to='/adminHomepage'>
                            <button type="submit">Sign Up</button>               
                        </Link>
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

// TaskifyLogin.js
import React from 'react';
import './signin.css'; // Make sure the path to the CSS file is correct
import logo from './logo.png'; // Adjust the path as necessary

const TaskifyLogin = () => {
return (
<div className="gradient-background">
    <div className="container">
        <div className="header">
            <img src={logo} alt="Taskify Logo" />
            <span className="signup">
                Don't have an account? <a href="#" className="signup-link">Sign up</a>
            </span>
        </div>
        <div className="content">
            <h1>Welcome back!</h1>
            <form>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" />
                    <a href="#" className="forgot-password">Forgot Password?</a>
                </div>
                <button type="submit">Log In</button>
                <div className="social-login">
                    <span>G</span>
                    <span>Sign in with Google</span>
                </div>
            </form>
        </div>
        <div className="footer">
            <span>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</span>
        </div>
    </div>
</div>
);
};

export default TaskifyLogin;
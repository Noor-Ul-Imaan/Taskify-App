import React, { useState } from 'react';
import './AboutUs.css'
import Footer from './sections/Footer'
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from '../images/logo.png';
import person from '../images/person.svg';
const AboutUs = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  return (

    <>
    <nav className="navbar">
        <div className="navbar-logo">
          <h1>TASKIFY</h1>
        </div>

        <div className="navbar-links">
          
            <ul>
              <Link to='AboutUs'>
                <li>About Us</li>
              </Link>
              <li>Features</li>
              <li>Contact</li>  
              <Link to='SignIn'>
              <li>Sign In</li>
                </Link>            
            </ul>
          <div className="dropdown">
            <img src={person} alt="" className="dropbtn" onClick={toggleDropdown} />
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to='/settings'>Settings</Link>
                <Link to ='/'>Sign Out</Link>
                <Link to ='/faqs'>FAQs</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    <div className='AboutUsPage'>
        <h1>ABOUT US</h1>
        <p>Welcome to Taskify, the powerhouse of task management tools designed to supercharge your team's productivity. Taskify isn't just another task manager—it's your strategic partner in success. Say goodbye to chaos and hello to streamlined workflows, crystal-clear task dependencies, and real-time progress tracking. With Taskify, you'll never miss a deadline again. Experience the future of task management with Taskify today!

    </p>
    <h1>MEET OUR TEAM!</h1>
    <p>Taskify isn't just a product—it's a labor of love crafted by a team of passionate innovators dedicated to reshaping the way teams work. From brilliant minds in software development to visionary designers, each member of our team brings unique expertise and creativity to the table. Together, we're committed to delivering a task management platform that exceeds expectations and empowers teams to achieve their goals. Get to know the faces and stories behind Taskify, and join us on our journey to revolutionize task management.</p>
    
    </div>
    <Footer/>
    </>
  )
}

export default AboutUs
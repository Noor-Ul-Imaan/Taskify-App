import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer-section'>
        <div className='footer-links'>
            <h2>Quick Links:</h2>
            <ul>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Our Features</li>
                <li>FAQs</li>
            </ul>
        </div>
        <div className='footer-mission'>
            <h2>Our Mission</h2>
            <p className='our-mission'>

            At Taskify, our mission is to empower teams to achieve their full potential by providing an intuitive and comprehensive task management solution. We strive to simplify task assignment, enhance collaboration, and boost productivity, ultimately helping organizations succeed in their goals. With our platform, we aim to revolutionize the way teams work together, fostering a culture of efficiency, accountability, and excellence.
            </p>            
        </div>

    </div>
  )
}

export default Footer
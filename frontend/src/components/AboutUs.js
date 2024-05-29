import React from 'react';
import './AboutUs.css';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

const AboutUs = () => {
  return (

    <>
    <Navbar />
      <div className='AboutUsPage'>
        <h1 className="about-heading">ABOUT US</h1>
        <p className="about-text">Welcome to Taskify, the powerhouse of task management tools designed to supercharge your team's productivity. Taskify isn't just another task manager—it's your strategic partner in success. Say goodbye to chaos and hello to streamlined workflows, crystal-clear task dependencies, and real-time progress tracking. With Taskify, you'll never miss a deadline again. Experience the future of task management with Taskify today!</p>
        <h1 className="team-heading">MEET OUR TEAM!</h1>
        <p className="team-text">Taskify isn't just a product—it's a labor of love crafted by a team of passionate innovators dedicated to reshaping the way teams work. From brilliant minds in software development to visionary designers, each member of our team brings unique expertise and creativity to the table. Together, we're committed to delivering a task management platform that exceeds expectations and empowers teams to achieve their goals. Get to know the faces and stories behind Taskify, and join us on our journey to revolutionize task management.</p>
      </div>
      <Footer />
    </>
  )
}

export default AboutUs;

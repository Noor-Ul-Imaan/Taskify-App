import React from 'react';
import './AboutUs.css';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className='AboutUsPage'>
        <div className="section">
          <h1 className="heading">About Taskify</h1>
          <p className="text">Welcome to Taskify, your ultimate task management solution designed to streamline your workflow, boost productivity, and simplify your life. At Taskify, we understand the complexities of modern-day life and work, and we're here to make managing tasks effortless and enjoyable.</p>
        </div>

        <div className="section">
          <h1 className="sub-heading">Our Mission</h1>
          <p className="text">Our mission at Taskify is simple: to empower individuals and teams to accomplish more, efficiently. We believe that every minute saved from managing tasks can be invested in meaningful work, personal growth, and spending time on what truly matters.</p>
        </div>

        <div className="section">
          <h1 className="sub-heading">Who We Are</h1>
          <p className="text">Taskify was founded by a team of passionate individuals who experienced firsthand the challenges of juggling multiple tasks and deadlines. Fueled by the desire to create a solution that addresses these challenges head-on, we embarked on a journey to develop Taskify—a robust, intuitive, and feature-rich task management app.</p>
        </div>

        <div className="section">
          <h1 className="sub-heading">What We Offer</h1>
          <p className="text">Taskify isn't just another task management app; it's a comprehensive solution crafted to meet the diverse needs of individuals, teams, and organizations. With Taskify, you can:</p>
          <ul className="feature-list">
            <li><strong>Organize Tasks Efficiently:</strong> Say goodbye to cluttered to-do lists. Taskify allows you to organize tasks into projects, set priorities, deadlines, and categorize tasks with tags for effortless management.</li>
            <li><strong>Collaborate Seamlessly:</strong> Whether you're working solo or as part of a team, Taskify enables seamless collaboration. Share tasks, assign responsibilities, and track progress in real-time to ensure everyone stays on the same page.</li>
            <li><strong>Stay Productive Anywhere:</strong> With Taskify's cross-platform compatibility, you can stay productive wherever you go. Access Taskify on your desktop, smartphone, or tablet, and sync your tasks across devices to stay organized on the move.</li>
            <li><strong>Gain Insights:</strong> Taskify provides valuable insights into your productivity habits. Analyze your task completion rates, identify bottlenecks, and optimize your workflow for maximum efficiency.</li>
          </ul>
        </div>

        <div className="section">
          <h1 className="sub-heading">Our Commitment</h1>
          <p className="text">At Taskify, we're committed to continually improving and innovating our product to meet the evolving needs of our users. We value user feedback and actively incorporate it into our development process to ensure Taskify remains your go-to task management solution.</p>
        </div>

        <div className="section">
          <h1 className="sub-heading">Get Started Today</h1>
          <p className="text">Ready to take control of your tasks and boost your productivity? Join thousands of satisfied users and experience the power of Taskify for yourself. Sign up now for a free trial and start accomplishing more, effortlessly.</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutUs;

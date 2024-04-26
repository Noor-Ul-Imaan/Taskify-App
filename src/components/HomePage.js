import React, { useState } from 'react';
import './HomePage.css';
import logo from '../images/logo.png';
import person from '../images/person.svg';
import Settings from './Settings';
import FAQs from './FAQs';

import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>TASKIFY</h1>
        </div>

        <div className="navbar-links">
          <Link to='SignIn'>
            <p>sign in</p>
          </Link>

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


      <main className="main-section">
        <div className="main-left">
          {/* <p>SCHEDULE AND ASSIGN TASKS WITH TASK<span style="color: #F0794F;">IFY!</span></p> */}
          <p>SCHEDULE AND ASSIGN TASKS WITH TASKIFY!</p>
          <p>Revolutionize the way you handle tasks with this comprehensive solution. Develop, assign, track, and review tasks effortlessly, complete with hierarchical organization. Award bonuses and more. Say goodbye to chaos, boost productivity, and cultivate a culture of excellence.</p>
          <div className="figures">
            <div className="figure-description">
              <div className="figure">100M+</div>
              <div className="description">Users</div>
            </div>
            <div className="figure-description">
              <div className="figure">Over 1M</div>
              <div className="description">Tasks</div>
            </div>
            <div className="figure-description">
              <div className="figure">4.5</div>
              <div className="description">Ratings</div>
            </div>
          </div>
        </div>

        <div className="main-right">
          <img src={logo} alt='logo'/>
        </div>
      </main>

      <article className="product-features-section">
        <div className="feature">
          <div className="feature-title">
            <h1>Streamline Task Assignment</h1>
          </div>
          <div className="feature-details">
            <p>Create and save customized task templates for commonly assigned tasks, making task assignment quicker and easier for administrators.</p>
            <img src={logo} alt="logo" />
          </div>                
        </div>

        <div className="feature">
          <div className="feature-title">
            <h1>Ensure Seamless Workflow</h1>
          </div>
          <div className="feature-details">
            <p>Set task dependencies to establish clear sequences of work, ensuring that tasks are completed in the right order. Track task progress visually to monitor how much work has been done and how much remains.</p>
            <img src={logo} alt="logo" />
          </div>    
        </div>

        <div className="feature">
          <div className="feature-title">
            <h1>Stay on Top of Tasks</h1>
          </div>
          <div className="feature-details">
            <p>Receive automatic notifications and reminders for upcoming deadlines, overdue tasks, and new task assignments, keeping you informed and on track.</p>
            <img src={logo} alt="logo" />
          </div>
        </div>

        <div className="feature">
          <div className="feature-title">
            <h1>Analytics Dashboard</h1>
          </div>
          <div className="feature-details">
            <p>Utilize the analytics dashboard to track key metrics such as task completion rates and user engagement levels, gaining insights for continuous improvement.</p>
            <img src={logo} alt="logo" />
          </div>                
        </div>        
      </article>

      <footer className="footer-section">
        FOOTER SECTION to be added
      </footer>
    </div>
  );
}

export default HomePage;

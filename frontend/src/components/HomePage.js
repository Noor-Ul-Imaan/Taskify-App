import React, { useEffect } from "react";
import "./HomePage.css";
import logo from "../images/logo.png";
import sideImage from "../images/bug.png";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import feature1 from "../images/feature1.png";
import feature2 from "../images/feature2.png";
import feature3 from "../images/feature3.png";
import feature4 from "../images/feature4.png";
import feature5 from "../images/feature5.png";
import feature6 from "../images/feature6.png";
import logo1 from "../images/11.png";
import logo2 from "../images/12.png";
import logo3 from "../images/13.png";
import logo4 from "../images/14.png";
import logo5 from "../images/15.png";
import person1Image from "../images/person1.jpg";
import person2Image from "../images/person2.jpg";
import person3Image from "../images/person3.jpg";

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="homepage">
      <Navbar />
      <div className="hero" data-aos="fade-up">
        <div className="hero-content">
          <h1>
            Revolutionize Your Task Management with{" "}
            <span className="color1">Ta</span>
            <span className="color2">sk</span>
            <span className="color3">ify</span>
          </h1>
          <p>
            Join the millions of users revolutionizing their task management
            with Taskify. Our intuitive platform with its professional-grade
            features empowers teams to streamline workflows and achieve goals
            with ease. No matter the size of your organization or group, Taskify
            has everything you need to stay ahead of the curve.
          </p>

          <div className="btn-group">
            <Link to="/OrganizationDetails" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/SignIn" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
        <div className="side-image">
          <img src={sideImage} alt="sideImage" />
        </div>
      </div>
      <div className="features" data-aos="fade-up">
        <h2>Key Features</h2>
        <div className="feature-container">
          <div className="feature-card">
            <img src={feature1} alt="Task Creation" />
            <h3>Task Creation</h3>
            <p>
              Create tasks effortlessly with customizable details and priority
              settings.
            </p>
          </div>
          <div className="feature-card">
            <img src={feature2} alt="Task Assignment" />
            <h3>Task Assignment</h3>
            <p>
              Assign tasks to team members, set deadlines, and track progress
              seamlessly.
            </p>
          </div>
          <div className="feature-card">
            <img src={feature3} alt="Task Tracking" />
            <h3>Task Tracking</h3>
            <p>
              Monitor the status of tasks in real-time, receive notifications,
              and stay organized.
            </p>
          </div>
          <div className="feature-card">
            <img src={feature4} alt="Task Review" />
            <h3>Task Review</h3>
            <p>
              Review completed tasks, analyze performance metrics, and optimize
              workflows for efficiency.
            </p>
          </div>
          <div className="feature-card">
            <img src={feature5} alt="Deadline Management" />
            <h3>Deadline Management</h3>
            <p>
              Set deadlines for tasks and receive reminders to ensure timely
              completion and avoid delays.
            </p>
          </div>
          <div className="feature-card">
            <img src={feature6} alt="Analytics" />
            <h3>Analytics</h3>
            <p>
              Generate comprehensive analytics to gain insights into task
              performance, team productivity, and project metrics.
            </p>
          </div>
        </div>
      </div>
      <div className="trusted-companies" data-aos="fade-up">
        <h2>Trusted by Leading Companies</h2>
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={true}
          autoPlaySpeed={3000}
        >
          <div className="logo-container">
            <img src={logo1} alt="Company 1 Logo" />
          </div>
          <div className="logo-container">
            <img src={logo2} alt="Company 2 Logo" />
          </div>
          <div className="logo-container">
            <img src={logo3} alt="Company 3 Logo" />
          </div>
          <div className="logo-container">
            <img src={logo4} alt="Company 4 Logo" />
          </div>
          <div className="logo-container">
            <img src={logo5} alt="Company 5 Logo" />
          </div>
        </Carousel>
      </div>
      <div className="testimonial" data-aos="fade-up">
        <h2 className="testimonial-heading">What Our Users Say</h2>
        <div className="testimonial-container">
          <div className="testimonial-card">
            <div className="testimonial-person">
              <img src={person1Image} alt="Person" className="person-image" />
            </div>
            <p className="testimonial-text">
              "Taskify has transformed the way we manage projects. It's
              intuitive, powerful, and essential for our team."
            </p>
            <span className="testimonial-author">
              - Muhammad Ahmed, Project Manager at PakTech Solutions
            </span>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-person">
              <img src={person2Image} alt="Person" className="person-image" />
            </div>
            <p className="testimonial-text">
              "Taskify's user-friendly interface and robust features have
              significantly improved our productivity."
            </p>
            <span className="testimonial-author">
              - Ayesha Khan, Marketing Director at PakDigital
            </span>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-person">
              <img src={person3Image} alt="Person" className="person-image" />
            </div>
            <p className="testimonial-text">
              "I've tried many task management tools, but Taskify stands out
              with its simplicity and effectiveness."
            </p>
            <span className="testimonial-author">
              - Ali Raza, Software Developer at PakSoft
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

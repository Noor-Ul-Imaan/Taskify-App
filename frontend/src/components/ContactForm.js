import React, { useState } from 'react';
import './ContactForm.css';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

const ContactUsPage = () => {
  // State variables for form fields
  const [topic, setTopic] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted!");
  };

  return (
    <div>
      <Navbar />
      <div className="contact-us-container">
        <h1>Questions? Let's Connect!</h1>
        <p>Are you curious about Taskify's features or need assistance with your account? Do you have suggestions for improving our platform, or perhaps a technical question? Whatever your inquiry, we're here to help! Share your thoughts, feedback, or questions with us, and our team will be in touch to assist you further.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="topic">This question is about...</label>
            <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} required>
              <option value="" disabled>Select a topic</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name*" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email Address:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email Address*" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Explain your question in detail:</label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message here*" rows="5" required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUsPage;

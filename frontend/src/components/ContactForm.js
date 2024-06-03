import React, { useState, useRef } from 'react';
import './ContactForm.css';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';
import emailjs from '@emailjs/browser'; // Correct import statement
import Swal from 'sweetalert2'; // Import SweetAlert

const ContactUsPage = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('');

  // Create a reference to the form
  const form = useRef();

  // Function to handle form submission
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_k5bvqt1', 'template_skzess9', form.current, {
        user_name: name,
        user_email: email,
        message: message,
        topic: topic,
        publicKey: 'q4qv6yeYGonTvnzwU',
      })
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          // Optionally, you can reset the form fields after successful submission
          setName('');
          setEmail('');
          setMessage('');
          setTopic('');
          Swal.fire({
            title: 'Success!',
            text: 'Message sent successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.log('FAILED...', error);
          Swal.fire({
            title: 'Error!',
            text: 'Message not sent. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
  };

  return (
    <div>
      <Navbar />
      <div className="contact-us-container">
        <h1>Questions? Let's Connect!</h1>
        <p>Are you curious about Taskify's features or need assistance with your account? Do you have suggestions for improving our platform, or perhaps a technical question? Whatever your inquiry, we're here to help! Share your thoughts, feedback, or questions with us, and our team will be in touch to assist you further.</p>
        <form ref={form} onSubmit={sendEmail}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name*" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email Address*" required />
          </div>
          <div className="form-group">
            <label htmlFor="topic">Topic:</label>
            <select id="topic" value={topic} name="topic" onChange={(e) => setTopic(e.target.value)} placeholder="Select a Topic" required>
              <option value="" disabled>Select a topic</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Question:</label>
            <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your question here*" rows="5" required></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUsPage;

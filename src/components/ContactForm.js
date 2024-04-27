import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission (e.g., send data to backend)
    console.log(formData);
    // Clear form fields after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className='gradient-background'>

    <form className='contact-form' onSubmit={handleSubmit}>
    <h1>CONTACT FORM</h1>

        <div className='input-field'>
            <input
                type='text'
                name='name'
                placeholder='Your Name'
                value={formData.name}
                onChange={handleChange}
                required
            />
        </div>
        <div className='input-field'>
            <input
                type='email'
                name='email'
                placeholder='Your Email'
                value={formData.email}
                onChange={handleChange}
                required
            />
        </div>
        <div className='input-field'>
            <input
                type='text'
                name='subject'
                placeholder='Subject'
                value={formData.subject}
                onChange={handleChange}
                required
            />
        </div>
        <div className='input-field'>
            <textarea
                name='message'
                placeholder='Your Message'
                value={formData.message}
                onChange={handleChange}
                required
            ></textarea>
        </div>
        <button type='submit'>Submit</button>
    </form>   
 </div>
  );
};

export default ContactForm;

import React from 'react';
import './FAQs.css';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

const FAQsPage = () => {
  return (
    <div><Navbar />
    <div className="faq-container">
      <h1>Frequently Asked Questions (FAQs)</h1>
      <div className="faq-section">
        <div className="faq-card">
          <div className="front">
            <h2>What is Taskify?</h2>
          </div>
          <div className="back">
            <p>Taskify is a comprehensive task management solution that revolutionizes the way you handle tasks. It allows you to develop, assign, track, and review tasks effortlessly, complete with hierarchical organization and bonus awards.</p>
          </div>
        </div>
        <div className="faq-card">
          <div className="front">
            <h2>How can I sign up for Taskify?</h2>
          </div>
          <div className="back">
            <p>To sign up for Taskify, simply visit our website and click on the Sign Up button. Fill in the required information, and you'll be all set to start managing your tasks efficiently!</p>
          </div>
        </div>
        <div className="faq-card">
          <div className="front">
            <h2>What industries can benefit from Taskify?</h2>
          </div>
          <div className="back">
            <p>Taskify is suitable for a wide range of industries, including but not limited to IT, marketing, healthcare, education, and finance. Any organization or individual looking to streamline their task management process can benefit from Taskify.</p>
          </div>
        </div>
        <div className="faq-card">
          <div className="front">
            <h2>How secure is my data on Taskify?</h2>
          </div>
          <div className="back">
            <p>At Taskify, we take data security seriously. We use industry-standard encryption and security protocols to safeguard your data. Additionally, we regularly update our security measures to ensure the highest level of protection for our users.</p>
          </div>
        </div>
        <div className="faq-card">
          <div className="front">
            <h2>Can I customize Taskify to suit my organization's needs?</h2>
          </div>
          <div className="back">
            <p>Absolutely! Taskify offers extensive customization options to tailor the platform to your organization's specific requirements. From task templates to user permissions, you can configure Taskify to align with your workflow seamlessly.</p>
          </div>
        </div>
        <div className="faq-card">
          <div className="front">
            <h2>How can I get in touch with Taskify support?</h2>
          </div>
          <div className="back">
            <p>If you have any questions or need assistance, our dedicated support team is here to help. You can reach out to us through the Contact Us page on our website, and we'll get back to you promptly.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default FAQsPage;

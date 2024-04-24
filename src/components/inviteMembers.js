import React from 'react'
import './inviteMembers.css'
function inviteMembers() {
  return (
    <div>
        <header>
  <div className="logo">
    <img src="path_to_your_logo_image" alt="Logo"/>
  </div>
  <div className="profile">
    <span>Welcome Admin!</span>
    <span className="notification-icon"><i className="fa-solid fa-bell"></i></span>
  </div>
</header>
<div className="container">
  <div className="content">
    <h2>INVITE MEMBERS TO YOUR ORGANIZATION</h2>
    <div className="input-container">
      <input className="email-input" type="email" placeholder="Enter your email address"/>
      <button className="send-invitation">Send Invitation</button>
    </div>
    <p>OR</p>
    <button className="share-linkCode">Share link or code</button>
  </div>
</div>

    </div>
  )
}

export default inviteMembers
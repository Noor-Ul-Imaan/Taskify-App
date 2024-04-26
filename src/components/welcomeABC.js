import React from 'react'
import './welcomeABC.css'
function welcomeABC() {
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
  <h2>YOU'VE JOINED AN ORGANIZATION!</h2>
  <h1>WELCOME TO ABC</h1>
</div>
    </div>
  )
}

export default welcomeABC
import React from 'react'
import './EnterOrg.css'
const EnterOrg = () =>  {
  return (
    <>
    <header>
    <div className="logo">
      <img src="path_to_your_logo_image" alt="Logo"/>
    </div>
    <div className="profile">
      <img className="profile-img" src="path_to_user_profile_image" alt="Profile Image"/>
    </div>
  </header>
  <div className="container">
    <div className="content">
      <div className="box">
        <div className="heading">
          ENTER YOUR ORGANIZATION CODE
        </div>
        <div className="input-container">
          <input className="code-input" type="text" placeholder="ABCD"/>
        </div>
      </div>
      <div className="button-container">
        <button className="request-button">Request to Join</button>
      </div>
    </div>
  </div>
  </>
  )
}

export default EnterOrg
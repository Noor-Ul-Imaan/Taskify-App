import React from 'react'
import './JoinReq'
function JoinReq() {
  return (
    <div className='join-req'>
    <header>
  <div className="logo">
    <img src="path_to_your_logo_image" alt="Logo"/>
  </div>
  <div className="profile">
    <span>Welcome Admin!</span>
    <span className="notification-icon"><i className="fas fa-bell"></i></span>
  </div>
</header>
<div className="container">
  <div className="content">
    <h1>JOIN REQUESTS</h1>
    <ul className="join-requests">
      <li className="user">
        <span className="username">User 1</span>
        <div className="actions">
          <button className="approve">Approve</button>
          <button className="deny">Deny</button>
          <button className="details">Details</button>
        </div>
      </li>
      <li className="user">
        <span className="username">User 2</span>
        <div className="actions">
          <button className="approve">Approve</button>
          <button className="deny">Deny</button>
          <button className="details">Details</button>
        </div>
      </li>
    </ul>
  </div>
</div>

    </div>
  )
}

export default JoinReq
import {React, useState} from 'react'
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext';
import './Navbar.css'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  return (
    <div className='navbar-separator'>
        <div className="navbar-logo">
          <h1>TASKIFY</h1>
        </div>
        <div className="navbar-links-list"> 
            <ul>
              <li>
                <Link to='dump'>
                Dump
                </Link>
              </li>
              <li>
                <Link to='AboutUs'>
                  About Us
                </Link>
              </li>
              {/* <li>Features</li> */}
              <li>
                <Link to='ContactForm'>
                Contact                 
                </Link>
              </li>
  
              
              {user && (<div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </div>  
              )}     
              {!user && (
                <li>
                  <Link to='SignIn'>
                    Sign In
                  </Link> 
                </li>
  
              )}
            </ul>
          <div className="dropdown">
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to='/settings'>Settings</Link>
                <Link to ='/'>Sign Out</Link>
                <Link to ='/faqs'>FAQs</Link>
              </div>
            )}
          </div>
        </div>
        </div>
  )
}

export default Navbar
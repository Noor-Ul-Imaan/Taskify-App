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
              <Link to='dump'>
              <li>Dump</li>
              </Link>
              <Link to='AboutUs'>
                <li>About Us</li>
              </Link>
              {/* <li>Features</li> */}
              <Link to='ContactForm'>
                <li>Contact</li>                 
              </Link>
              <Link to='FAQs'><li>FAQs</li></Link>
              
              {user && (<div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </div>  
              )}     
              {!user && (
              <Link to='IndivRegis'>
                <li>Sign In</li>
              </Link>   
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
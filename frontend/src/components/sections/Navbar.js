import {React, useState} from 'react'
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout'

const Navbar = () => {
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  return (
    <>


        <div className="navbar-links">
          
            <ul>
              <Link to='dump'>
              Dump
              </Link>
              <Link to='AboutUs'>
                <li>About Us</li>
              </Link>
              <li>Features</li>
              <Link to='ContactForm'>
                <li>Contact</li>                 
              </Link>
              <Link to='SignIn'>
                <li>Sign In</li>
              </Link>     
              <div>
                <button onClick={handleClick}>Log out</button>
              </div>       
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
        </>
  )
}

export default Navbar
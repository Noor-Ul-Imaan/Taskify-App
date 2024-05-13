import React from 'react'
import Footer from './sections/Footer'
import './AdminHomepage.css'

const AdminHomepage = () => {
  return (
    <>
        <div className='dept-container'>
          <div className='dept-side-bar'>
            <h1>Departments</h1>
            <ul>
              <li>Dept 1</li>
              <li>Dept 2</li>
              <li>Dept 3</li>
              <li>Dept 4</li>

            </ul>
          </div>
          <div className='dept-section'>
            <div className='dept-card'>Dept 1</div>
            <div className='dept-card'>Dept 2</div>
            <div className='dept-card'>Dept 3</div>
            <div className='dept-card'>Dept 4</div>
          </div>

        </div>
        <Footer/>
    </>

export default AdminHomepage;

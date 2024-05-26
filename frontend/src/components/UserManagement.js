import React from 'react';
import './UserManagement.css';

const departmentMembers = {
  chairman: { name: "John Doe", department: "Administration" },
  hod: { name: "Jane Smith", department: "Chemistry" },
  professors: [
    { name: "Alice Johnson", department: "Organic Chemistry" },
    { name: "Robert Brown", department: "Inorganic Chemistry" },
    { name: "Emily Davis", department: "Physical Chemistry" },
  ],
  associateProfessors: [
    { name: "Michael Wilson", department: "Analytical Chemistry" },
    { name: "Sarah Miller", department: "Biochemistry" },
    { name: "David Anderson", department: "Environmental Chemistry" },
    { name: "Laura Thomas", department: "Nuclear Chemistry" },
    { name: "James Moore", department: "Polymer Chemistry" },
    { name: "Emma Taylor", department: "Theoretical Chemistry" },
  ],
};

const UserManagement = () => {
  return (
    <div className="user-management">
      <h1 className="title">Random University</h1>
      
      <div className="section">
        <h2 className="subtitle">CHAIRMAN</h2>
        <div className="flex-container">
          <div className="card">
            <div className="circle"></div>
            <div className="card-info">
              <p>{departmentMembers.chairman.name}</p>
              <p>{departmentMembers.chairman.department}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section">
        <h2 className="subtitle">HOD</h2>
        <div className="flex-container">
          <div className="card">
            <div className="circle"></div>
            <div className="card-info">
              <p>{departmentMembers.hod.name}</p>
              <p>{departmentMembers.hod.department}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section">
        <h2 className="subtitle">PROFESSORS</h2>
        <div className="flex-container">
          {departmentMembers.professors.map((member, index) => (
            <div key={index} className="card">
              <div className="circle"></div>
              <div className="card-info">
                <p>{member.name}</p>
                <p>{member.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h2 className="subtitle">ASSOCIATE PROFESSORS</h2>
        <div className="flex-container">
          {departmentMembers.associateProfessors.map((member, index) => (
            <div key={index} className="card">
              <div className="circle"></div>
              <div className="card-info">
                <p>{member.name}</p>
                <p>{member.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

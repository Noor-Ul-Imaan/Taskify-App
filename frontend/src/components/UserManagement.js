import React, { useState } from "react";
import "./UserManagement.css";

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
  electrical: [
    { name: "Dr. Vivek Kumar", department: "Electrical Engineering" },
    { name: "Dr. John Smith", department: "Electrical Engineering" },
    { name: "Dr. Andrew Brown", department: "Electrical Engineering" },
    // ... (add more members as needed)
  ],
  management: [
    { name: "Dr. Michael Johnson", department: "Management Sciences" },
    { name: "Dr. Sarah Wilson", department: "Management Sciences" },
    { name: "Dr. Robert Davis", department: "Management Sciences" },
    // ... (add more members as needed)
  ],
};

const UserManagement = () => {
  const [selectedSection, setSelectedSection] = useState("allUsers");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getFilteredMembers = (members) => {
    return members.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "allUsers":
        return (
          <>
            <Section
              title="CHAIRMAN"
              members={getFilteredMembers([departmentMembers.chairman])}
            />
            <Section
              title="HOD"
              members={getFilteredMembers([departmentMembers.hod])}
            />
            <Section
              title="PROFESSORS"
              members={getFilteredMembers(departmentMembers.professors)}
            />
            <Section
              title="ASSOCIATE PROFESSORS"
              members={getFilteredMembers(
                departmentMembers.associateProfessors
              )}
            />
            <Section
              title="Department of Electrical Engineering"
              members={getFilteredMembers(departmentMembers.electrical)}
            />
            <Section
              title="Department of Management Sciences"
              members={getFilteredMembers(departmentMembers.management)}
            />
          </>
        );
      case "chairman":
        return (
          <Section
            title="CHAIRMAN"
            members={getFilteredMembers([departmentMembers.chairman])}
          />
        );
      case "hod":
        return (
          <Section
            title="HOD"
            members={getFilteredMembers([departmentMembers.hod])}
          />
        );
      case "professors":
        return (
          <Section
            title="PROFESSORS"
            members={getFilteredMembers(departmentMembers.professors)}
          />
        );
      case "associateProfessors":
        return (
          <Section
            title="ASSOCIATE PROFESSORS"
            members={getFilteredMembers(departmentMembers.associateProfessors)}
          />
        );
      case "electrical":
        return (
          <Section
            title="Department of Electrical Engineering"
            members={getFilteredMembers(departmentMembers.electrical)}
          />
        );
      case "management":
        return (
          <Section
            title="Department of Management Sciences"
            members={getFilteredMembers(departmentMembers.management)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-management">
      <div className="sidebar">
        <a
          href="#"
          className={selectedSection === "allUsers" ? "active" : ""}
          onClick={() => setSelectedSection("allUsers")}
        >
          All Users
        </a>
        <a
          href="#"
          className={selectedSection === "chairman" ? "active" : ""}
          onClick={() => setSelectedSection("chairman")}
        >
          Chairman
        </a>
        <a
          href="#"
          className={selectedSection === "hod" ? "active" : ""}
          onClick={() => setSelectedSection("hod")}
        >
          HOD
        </a>
        <a
          href="#"
          className={selectedSection === "professors" ? "active" : ""}
          onClick={() => setSelectedSection("professors")}
        >
          Professors
        </a>
        <a
          href="#"
          className={selectedSection === "associateProfessors" ? "active" : ""}
          onClick={() => setSelectedSection("associateProfessors")}
        >
          Associate Professors
        </a>
        <a
          href="#"
          className={selectedSection === "electrical" ? "active" : ""}
          onClick={() => setSelectedSection("electrical")}
        >
          Electrical Engineering
        </a>
        <a
          href="#"
          className={selectedSection === "management" ? "active" : ""}
          onClick={() => setSelectedSection("management")}
        >
          Management Sciences
        </a>
      </div>
      <div className="main-content">
        <div className="header">
          <h1 className="title">Random University</h1>
          <input
            type="text"
            className="search-bar"
            placeholder="Search user..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {renderSection()}
      </div>
    </div>
  );
};

const Section = ({ title, members }) => (
  <div className="section">
    <h2 className="subtitle">{title}</h2>
    <div className="flex-container">
      {members.map((member, index) => (
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
);

export default UserManagement;

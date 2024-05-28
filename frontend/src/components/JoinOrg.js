import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JoinOrg.css";
import logo from "./logo.png";
import { Link } from 'react-router-dom';

function JoinOrg() {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [orgCode, setOrgCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/organizations");
        setOrganizations(response.data.data); // Adjusted to access the `data` array
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/join", {
        organization: selectedOrganization,
        role: selectedRole,
        orgCode,
      });
      console.log(response.data);
      navigate("/success"); // Change "/success" to your desired route
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="gradient-background">
      <div className="container">
        <div className="header">
          <img src={logo} alt="Logo" />
        </div>
        <div className="content">
          <h1>Join an Organization</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="organization">Select Organization</label>
              <select
                id="organization"
                value={selectedOrganization}
                onChange={(e) => setSelectedOrganization(e.target.value)}
              >
                <option value="">Select</option>
                {organizations.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedOrganization && (
              <div className="input-field">
                <label htmlFor="role">Choose Role</label>
                <select
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">Select</option>
                  {organizations
                    .find((org) => org._id === selectedOrganization)
                    ?.roles.map((role) => (
                      <option key={role._id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className="or-separator">
              <span>OR</span>
            </div>
            <div className="input-field">
              <label htmlFor="orgCode">Enter Organization Code</label>
              <input
                type="text"
                id="orgCode"
                value={orgCode}
                onChange={(e) => setOrgCode(e.target.value)}
                placeholder="Organization Code"
              />
            </div>
            <Link to='/IndividualPannel'><button type="submit">Join</button></Link>
          </form>
        </div>
        <div className="footer">
          © 2024 Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default JoinOrg;

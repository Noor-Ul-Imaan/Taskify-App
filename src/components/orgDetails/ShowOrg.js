import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "./BackButton";
import "./ShowOrg.css";

const ShowOrg = () => {
  const [organization, setOrganization] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/organizations/${id}`)
      .then((response) => {
        setOrganization(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <Link to="/adminHomepage">
        <BackButton />
      </Link>
      <h1>Show Organization</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>ID: {organization._id}</p>
          <p>Name: {organization.name}</p>
          <p>Type: {organization.type}</p>
          <p>Number of Levels: {organization.numberOfLevels}</p>
          <div>
            <h2>Roles:</h2>
            {organization.roles && organization.roles.length > 0 ? (
              <ul>
                {organization.roles.map((role, index) => (
                  <li key={index}>
                    <p>Role {index + 1}:</p>
                    <p>Name: {role.name}</p>
                    <p>Description: {role.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No roles found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowOrg;

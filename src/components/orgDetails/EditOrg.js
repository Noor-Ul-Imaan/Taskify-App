import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import './CreateTask.css';

const EditOrg = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [numberOfLevels, setNumberOfLevels] = useState(0);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/organizations/${id}`)
            .then((response) => {
                const { name, type, numberOfLevels, roles } = response.data;
                setName(name);
                setType(type);
                setNumberOfLevels(numberOfLevels);
                setRoles(roles);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred. Please check the console.');
                console.error(error);
            });
    }, []);

    const handleSaveOrg = () => {
        const data = {
            name,
            type,
            numberOfLevels,
            roles
        };
        setLoading(true);
        axios.put(`http://localhost:5000/organizations/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/adminHomepage');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred. Please check the console.');
                console.error(error);
            });
    };

    return (
        <div className="container">
            <BackButton />
            <h1>Edit Organization</h1>
            {loading ? <p>Loading...</p> : (
                <form>
                    <div className="form-group">
                        <label>Organization Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Organization Type:</label>
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Hierarchy Levels:</label>
                        <input type="number" value={numberOfLevels} onChange={(e) => setNumberOfLevels(parseInt(e.target.value))} required />
                    </div>
                    <div>
                        <h2>Roles:</h2>
                        <ul>
                            {roles.map((role, index) => (
                                <li key={index}>
                                    <div className="form-group">
                                        <label>Role Name:</label>
                                        <input type="text" value={role.name} onChange={(e) => {
                                            const updatedRoles = [...roles];
                                            updatedRoles[index].name = e.target.value;
                                            setRoles(updatedRoles);
                                        }} />
                                        <label>Role Description:</label>
                                        <input type="text" value={role.description} onChange={(e) => {
                                            const updatedRoles = [...roles];
                                            updatedRoles[index].description = e.target.value;
                                            setRoles(updatedRoles);
                                        }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="button" onClick={handleSaveOrg}>Save Organization</button>
                </form>
            )}
        </div>
    );
};

export default EditOrg;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
            .then(response => {
                setName(response.data.name);
                setType(response.data.type);
                setNumberOfLevels(response.data.numberOfLevels);
                setRoles(response.data.roles);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                alert('An error occurred. Please check the console.');
                console.error(error);
            });
    }, [id]);

    const handleEditOrg = event => {
        event.preventDefault();
        const data = { name, type, numberOfLevels, roles };
        setLoading(true);
        axios.put(`http://localhost:5000/organizations/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/adminHomepage');
            })
            .catch(error => {
                setLoading(false);
                alert('An error occurred. Please check the console.');
                console.error(error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Organization</h2>
            <form onSubmit={handleEditOrg}>
                <div>
                    <label htmlFor="name">Organization Name:</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="type">Organization Type:</label>
                    <input type="text" id="type" value={type} onChange={e => setType(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="numberOfLevels">Number of Levels:</label>
                    <input type="number" id="numberOfLevels" value={numberOfLevels} onChange={e => setNumberOfLevels(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="roles">Roles:</label>
                    <textarea id="roles" value={roles} onChange={e => setRoles(e.target.value)} />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditOrg;

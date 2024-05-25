import React, { useState } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteOrg = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteOrg = () => {
        setLoading(true);
        axios.delete(`http://localhost:5000/organizations/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/adminHomepage');
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred. Please check the console.');
                setLoading(false);
            });
    };

    return (
        <div>
            <BackButton />
            <h1>Delete Organization</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h3>Are you sure you want to delete this Organization?</h3>
                    <button onClick={handleDeleteOrg}>Yes, Delete it</button>
                </div>
            )}
        </div>
    );
};

export default DeleteOrg;

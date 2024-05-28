import React, { useState, useContext } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTask.css';

import { TasksContext } from '../../context/TaskContext';

import { useAuthContext } from '../../hooks/useAuthContext'

const CreateTask = () => {
  const { dispatch } = useContext(TasksContext);
  const [title, setTitle] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  const { user } = useAuthContext()

  const handleSaveTask = async () => {
    if (!user) {
        alert('You must be logged in to create tasks.');
        return; // Prevent further execution if not logged in
      }
    const data = {
      title, assignedTo, assignedBy, description, deadline,
    }
    setLoading(true);
    try {
        const response = await axios.post('http://localhost:5000/tasks', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`, // Assuming user object has a 'token' property
          },
        });
  
        dispatch({ type: 'CREATE_TASK', payload: response.data });
        setLoading(false);
        navigate('/IndivHomepage');
      } catch (error) {
        setLoading(false);
        console.error('Error creating task:', error.response?.data || error);
        alert('An error occurred. Please check console.'); // Inform user of error
      }
    };




    return (
        <div className="container">
            <BackButton/>
            <h1>Create Task</h1>
            {loading? <p>Loading...</p> : ''}

            <form>
                <div className="form-group">
                    <label>Task Title:</label>
                    <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Assigned To:</label>
                    <input type="text" value={assignedTo} onChange={(e)=> setAssignedTo(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Assigned By:</label>
                    <input type="text" value={assignedBy} onChange={(e)=> setAssignedBy(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea id="taskDescription" value={description} onChange={(e)=> setDescription(e.target.value)} rows="4"></textarea>
                </div>
          
                <div className="form-group">
                    <label>Deadline:</label>
                    <input type="datetime-local" id="taskDeadline" value={deadline} onChange={(e)=> setDeadline(e.target.value)}  />
                </div>
                <button type="submit" onClick={handleSaveTask}>Save Task</button>
            </form>
        </div>
    );
};

export default CreateTask;




//     axios
//         .post('http://localhost:5000/tasks', data)
//         .then((response) => {
//         // Dispatch CREATE_TASK action with response.data
//         dispatch({ type: 'CREATE_TASK', payload: response.data });
//         setLoading(false);
//         navigate('/');
//         })
//         .catch((error) => {
//         setLoading(false);
//         alert('An error occurred. Please check console');
//         console.log(error);
//         });
//   }
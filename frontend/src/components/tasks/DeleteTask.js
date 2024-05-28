import React, { useState, useEffect, useContext } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TasksContext } from '../../context/TaskContext';
import { useAuthContext } from '../../hooks/useAuthContext'


const DeleteTask = () => {
  const { dispatch } = useContext(TasksContext);
  const [loading, setLoading] = useState('')
  const navigate = useNavigate();
  const {id} = useParams()
  const { user } = useAuthContext()

  const handleDeleteTask = async () => {
    setLoading(true);

    try {
  
      const response = await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`, // Check if user and token exist before using
        },
      });
  
      // Dispatch DELETE_TASK action with task ID (assuming response doesn't contain the task data)
      dispatch({ type: 'DELETE_TASK', payload: { _id: id } });
      setLoading(false);
      navigate('/IndivHomepage');
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please check console');
      setLoading(false);
    }
  }
  return (
    <div>
      <BackButton/>
      <h1>Delete Task</h1>
      {loading ? (<p>Loading...</p>) : ('')}
      <div>
        <h3>Are you sure you want to delete this Task?</h3>
        <button onClick={handleDeleteTask}>Yes, Delete it</button>
      </div>


    </div>
  )
}

export default DeleteTask
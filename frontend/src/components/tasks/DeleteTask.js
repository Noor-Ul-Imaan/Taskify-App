import React, { useState, useEffect, useContext } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TasksContext } from '../../context/TaskContext';

const DeleteTask = () => {
  const { dispatch } = useContext(TasksContext);
  const [loading, setLoading] = useState('')
  const navigate = useNavigate();
  const {id} = useParams()
  const handleDeleteTask = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        // Dispatch DELETE_TASK action with task ID
        dispatch({ type: 'DELETE_TASK', payload: { _id: id } });
        setLoading(false);
        navigate('/IndivHomepage');
      })
      .catch((error) => {
        console.log(error);
        alert('An error occurred. Please check console');
        setLoading(false);
      });
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
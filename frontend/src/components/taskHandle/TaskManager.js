import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import './TaskManager.css'; // Import the CSS file here

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setTasks(response.data.data))
      .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [navigate]);

  const handleCreateTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="gradient-background">
      <div className="container" id="create-task-container">
        <h1>Create Task</h1>
        <TaskForm onCreateTask={handleCreateTask} />
      </div>
    </div>
  );
};

export default TaskManager;
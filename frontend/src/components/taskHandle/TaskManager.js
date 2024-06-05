import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import TaskForm from './TaskForm';
import './TaskManager.css'; // Import the CSS file here
import { Link } from 'react-router-dom';
import { FaHome} from 'react-icons/fa';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();
  const existingTask = location.state?.task || null;

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

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  return (
    <div className="gradient-background">

      <div className="container" id="create-task-container">      
      <Link to='/IndividualPannel'>
              <><FaHome /> Home</>
            </Link>
        <h1>{existingTask ? 'Edit Task' : 'Create Task'}</h1>
        <TaskForm onCreateTask={handleCreateTask} onUpdateTask={handleUpdateTask} existingTask={existingTask} />
      </div>
    </div>
  );
};

export default TaskManager;

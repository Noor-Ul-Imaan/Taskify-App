import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import './ViewAssigned.css'; // Import the CSS file here
import { Link } from 'react-router-dom';
import { FaHome} from 'react-icons/fa';

const TotalTasks = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks/to', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const filteredTasks = response.data.data.filter(task => task.assignedTo === user.username);
      setTasks(filteredTasks);
    })
    .catch(error => console.error('Error fetching tasks:', error));
  }, [token, user.username]);

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  return (
    <div className="container" id="view-tasks-container">
      <Link to='/IndividualPannel'>
        <><FaHome /> Home</>
      </Link>
      <h1>Total Tasks</h1>
      <TaskList 
        tasks={tasks} 
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

export default TotalTasks;

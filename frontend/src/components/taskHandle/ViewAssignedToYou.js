import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import './ViewAssigned.css'; // Import the CSS file here

const ViewTasksAssignedToYou = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setTasks(response.data.data.filter(task => task.assignedTo === user.username && !task.isSubmitted)))
    .catch(error => console.error('Error fetching tasks:', error));
  }, [token, user.username]);

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  return (
    <div className="container" id="view-tasks-container">
      <h1>Pending Tasks Assigned to You</h1>
      <TaskList 
        tasks={tasks} 
        onUpdateTask={handleUpdateTask} 
        onDeleteTask={handleDeleteTask} 
      />
    </div>
  );
};

export default ViewTasksAssignedToYou;

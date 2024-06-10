import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewAssigned.css'; // Import the CSS file here

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks/to', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const filteredTasks = response.data.data.filter(task => 
        task.assignedTo === user.username && 
        task.isSubmitted
      );
      setTasks(filteredTasks);
    })
    .catch(error => console.error('Error fetching tasks:', error));
  }, [token, user.username]);

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  const handleDownload = (task) => { 
    if (task.attachment) {
      const link = document.createElement('a');
      link.href = `http://localhost:5000/${task.attachment}`;
      link.download = task.attachment;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Attachment not found for task:', task._id);
    }
  };

  return (
    <div className="container" id="view-tasks-container">
      <h1>Completed Tasks</h1>
      <div>
        {tasks.map(task => (
          <div key={task._id} className="task-section">
            <h2 className="task-title">{task.title}</h2>
            <p className="task-details">{task.description}</p>
            <p className="task-details">Assigned by: {task.assignedBy}</p>
            <p className="task-details">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            {task.rating && <p className="task-details">Rating:  {task.rating}/5</p>}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedTasks;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAssigned.css'; // Import the CSS file here
import { Link } from 'react-router-dom';

const ViewTasksAssignedByYou = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const filteredTasks = response.data.data.filter(task => task.assignedBy === user.username);
      setTasks(filteredTasks);
    })
    .catch(error => console.error('Error fetching tasks:', error));
  }, [token, user.username]);

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div id="task-manager-container">
      <div className="container" id="view-tasks-container">
        <h1>Tasks Assigned by You</h1>
        {tasks.length > 0 ? (
          <div>
            {tasks.map(task => (
              <div key={task._id} className="task-section">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-details">{task.description}</p>
                <p className="task-details">Assigned to: {task.assignedTo}</p>
                <p className="task-details">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                <div>
                  <Link to={`/edit-task/${task._id}`} state={{ task }}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks assigned by you.</p>
        )}
      </div>
    </div>
  );
};

export default ViewTasksAssignedByYou;

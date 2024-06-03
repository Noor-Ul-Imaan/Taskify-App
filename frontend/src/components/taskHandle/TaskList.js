import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TaskManager.css'; // Import the CSS file here

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => onDeleteTask(taskId))
    .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id} className="task-section">
          <h2 className="task-title">{task.title}</h2>
          <p className="task-details">{task.description}</p>
          <p className="task-details">Assigned to: {task.assignedTo}</p>
          <p className="task-details">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          {task.assignedTo === user.username && !task.isSubmitted && (
            <Link to={`/SubmitTask/${task._id}`} state={{ task }}>
              <button>Submit</button>
            </Link>
          )}
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

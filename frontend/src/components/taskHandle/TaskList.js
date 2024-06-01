import React from 'react';
import axios from 'axios';

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

  const handleSubmit = (taskId) => {
    axios.put(`http://localhost:5000/tasks/${taskId}/submit`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => onUpdateTask(response.data))
    .catch(error => console.error('Error submitting task:', error));
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Assigned to: {task.assignedTo}</p>
            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            {task.assignedTo === user.username && !task.isSubmitted && (
              <button onClick={() => handleSubmit(task._id)}>Submit</button>
            )}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

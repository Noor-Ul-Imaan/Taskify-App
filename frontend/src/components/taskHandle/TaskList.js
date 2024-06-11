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

  const handleDownload = (task) => { // Receive the task object as a parameter
    if (task.attachment) {
      const link = document.createElement('a');
      link.href = `http://localhost:5000/${task.attachment}`; // Update the URL path
      link.download = task.attachment;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Attachment not found for task:', task._id);
    }
  };

  // Sort tasks by creation date in descending order
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      {sortedTasks.map(task => (
        <div key={task._id} className="task-section">
          <h2 className="task-title">{task.title}</h2>
          <p className="task-details">{task.description}</p>
          <p className="task-details">Assigned by: {task.assignedBy}</p>
          {task.deadline ?
          (          <p className="task-details">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
        ) :(
          <p className="task-details">No deadline</p>
        )
          }
          <div className='task-list-button'>
            {task.assignedTo === user.username && !task.isSubmitted && (
              <Link to={`/SubmitTask/${task._id}`} state={{ task }}>
                <button>Submit</button>
              </Link>
            )}
            {task.attachment && (
              <div>
                <button onClick={() => handleDownload(task)}>View Attachment</button> {/* Pass task object */}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

import React from 'react';

const TaskItem = ({ task, onUpdateTask}) => {
  console.log('Task:', task);  // Check task content

  const handleDownload = () => {
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

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Deadline: {task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline'}</p>
      {task.attachment ? (
        <div>
          <button onClick={handleDownload}>View Attachment</button>
        </div>
      ) : (
        <p>No attachment</p>
      )}
      <button onClick={() => onUpdateTask(task)}>Update Task</button>
    </div>
  );
};

export default TaskItem;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SubmitTask.css';

const SubmitTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { task } = location.state || {};
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare form data
    const formData = new FormData();
    formData.append('submission_attachment', file);
    formData.append('comment', comment);

    try {
      // Replace with your backend endpoint
      await axios.put(`http://localhost:5000/tasks/${task._id}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Task submitted successfully!');
      navigate('/tasks'); // Navigate back to the tasks list
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Failed to submit task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-task">
      <div className="task-details">
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <p>Assigned to: {task.assignedTo}</p>
        <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      </div>
      <div className="task-submit">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="file">Upload Your Work</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Leave a Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment"
            ></textarea>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitTask;

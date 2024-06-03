import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const TaskForm = ({ onCreateTask, existingTask, onUpdateTask }) => {
  const [title, setTitle] = useState(existingTask ? existingTask.title : '');
  const [description, setDescription] = useState(existingTask ? existingTask.description : '');
  const [deadline, setDeadline] = useState(existingTask ? existingTask.deadline : '');
  const [assignedTo, setAssignedTo] = useState(existingTask ? existingTask.assignedTo : '');
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks/organization-users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setUsers(response.data))
    .catch(error => console.error('Error fetching users:', error));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, deadline, assignedTo, assignedBy: user.username };

    // Check if deadline is in the future
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    if (deadlineDate <= currentDate) {
      Swal.fire({
        title: 'Error',
        text: 'The deadline must be a future date and time.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (existingTask) {
      axios.put(`http://localhost:5000/tasks/${existingTask._id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        onUpdateTask(response.data);
        Swal.fire({
          title: 'Success',
          text: 'Task updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        console.error('Error updating task:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error updating task',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    } else {
      axios.post('http://localhost:5000/tasks', taskData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        onCreateTask(response.data);
        Swal.fire({
          title: 'Success',
          text: 'Task created successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        console.error('Error creating task:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error creating task',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    }

    setTitle('');
    setDescription('');
    setDeadline('');
    setAssignedTo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskName">Task Name:</label>
      <input 
        type="text" 
        placeholder="Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <label htmlFor="taskDescription">Description:</label>
      <textarea 
        placeholder="Description" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label htmlFor="taskDeadline">Deadline:</label>
      <input 
        type="datetime-local" 
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <br />
      <label htmlFor="assignTo">Assign To:</label>
      <select 
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
      >
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user._id} value={user.username}>
            {user.firstname} {user.lastname}
          </option>
        ))}
      </select>
      <br />
      <button type="submit">{existingTask ? 'Update' : 'Create'} Task</button>
    </form>
  );
};

export default TaskForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setTasks(response.data.data))
      .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [navigate]);

  const handleCreateTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onCreateTask={handleCreateTask} />
      <TaskList 
        tasks={tasks} 
        onUpdateTask={handleUpdateTask} 
        onDeleteTask={handleDeleteTask} 
      />
    </div>
  );
};

export default TaskManager;

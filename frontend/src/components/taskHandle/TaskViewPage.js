// TaskViewPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

const TaskViewPage = () => {
  const [userTasks, setUserTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const tasks = response.data.data;
        setUserTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [token]);

  return (
    <div>
      <h1>My Tasks</h1>
      <TaskList tasks={userTasks} />
    </div>
  );
};

export default TaskViewPage;

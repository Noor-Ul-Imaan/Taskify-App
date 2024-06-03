import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAssigned.css'; // Import the CSS file here
import { Link } from 'react-router-dom';

const ViewTasksAssignedByYou = () => {
    const [tasks, setTasks] = useState([]);
    
    
    
    // const [editingTaskId, setEditingTaskId] = useState(null);
    // const [editTaskData, setEditTaskData] = useState({
    //     title: '',
    //     description: '',
    //     deadline: '',
    //     assignedTo: ''
    // });



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
            alert('Task deleted successfully');
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleRatingChange = async (taskId, rating) => {
        try {
            await axios.put(`http://localhost:5000/tasks/${taskId}/rate`, { rating }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasks.map(task => task._id === taskId ? { ...task, rating } : task));
            alert('Rating updated successfully');
        } catch (error) {
            console.error('Error updating rating:', error);
            alert('Error updating rating');
        }
    };


/* 

    const handleEditClick = (task) => {
        setEditingTaskId(task._id);
        setEditTaskData({
            title: task.title,
            description: task.description,
            deadline: new Date(task.deadline).toISOString().substring(0, 16),
            assignedTo: task.assignedTo
        });
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditTaskData({
            title: '',
            description: '',
            deadline: '',
            assignedTo: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditTaskData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSaveEdit = async (e, taskId) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/tasks/${taskId}`, editTaskData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasks.map(task => task._id === taskId ? { ...task, ...editTaskData } : task));
            setEditingTaskId(null);
            alert('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error updating task');
        }
    };


 */



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
                                <p className="task-details">Status: {task.isSubmitted ? 'Submitted' : 'Not Submitted'}</p>
                                {task.isSubmitted && (
                                    <div className="submission-details">
                                        <p className="task-details">Comment: {task.comment || 'No comment'}</p>
                                        {task.submission_attachment && (
                                            <p className="task-details">
                                                Attachment: <a href={`http://localhost:5000/${task.submission_attachment}`} download>Download</a>
                                            </p>
                                        )}
                                    </div>
                                )}
                                {task.isSubmitted && (
                                    <div className="rating">
                                        <label htmlFor={`rating-${task._id}`}>Rate this task:</label>
                                        <input
                                            id={`rating-${task._id}`}
                                            type="range"
                                            min="1"
                                            max="5"
                                            value={task.rating || 1}
                                            onChange={(e) => handleRatingChange(task._id, e.target.value)}
                                        />
                                        <span>{task.rating || 1}</span>
                                    </div>
                                )}

                            
                                <div>
                                    <Link to={`/edit-task/${task._id}`} state={{ task }}>
                                        {/* <button onClick={() => handleEditClick(task)}>Edit</button> */}
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

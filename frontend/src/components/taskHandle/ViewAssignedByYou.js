import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ViewAssigned.css'; // Import the CSS file here
import { FaHome} from 'react-icons/fa';

const ViewTasksAssignedByYou = () => {
    const [tasks, setTasks] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/tasks/by', {
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
            Swal.fire({
                icon: 'success',
                title: 'Task deleted successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error deleting task:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error deleting task',
                text: error.message,
            });
        }
    };

    const handleRatingChange = async (taskId, rating) => {
        try {
            await axios.put(`http://localhost:5000/tasks/by/${taskId}/rate`, { rating }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasks.map(task => task._id === taskId ? { ...task, rating } : task));
            Swal.fire({
                icon: 'success',
                title: 'Rating updated successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error updating rating:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error updating rating',
                text: error.message,
            });
        }
    };

    const handleEditTask = (task) => {
        navigate('/TaskManager', { state: { task } });
    };

    const handleDownload = (task) => { // Receive the task object as a parameter
        if (task.submissionAttachment) {
            const link = document.createElement('a');
            link.href = `http://localhost:5000/${task.submissionAttachment}`; // Update the URL path
            link.download = task.submissionAttachment;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('submissionAttachment not found for task:', task._id);
        }
    };

    return (
        <div id="task-manager-container" className='task-manager-contain'>
            <div className="container" id="view-tasks-container">
            <Link to='/IndividualPannel'>
              <><FaHome /> Home</>
            </Link>
                <h1>Tasks Created by You</h1>
                {tasks.length > 0 ? (
                    <div>
                        {tasks.map(task => (
                            <div key={task._id} className="task-section">
                                <h3 className="task-title">{task.title}</h3>
                                <div className='task-details-list'>
                                    {task.description &&
                                    <p className="task-details">Description: {task.description}</p>

                                    }
                                    <p className="task-details">Assigned to: {task.assignedTo}</p>
                                    <p className="task-details">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                                    <p className="task-details">Status: {task.isSubmitted ? 'Submitted' : 'Not Submitted'}</p>                                    
                                </div>


                                {task.isSubmitted && (
                                    <div className="submission-details">
                                        <p className="task-details">Comment: {task.comment || 'No comment'}</p>
                                        {/* {task.submissionAttachment ? (
                                            <div>
                                                <button className="download-button" onClick={() => handleDownload(task)}>View submission</button> 
                                            </div>
                                        ) : (
                                            <p>No submission</p>
                                        )} */}
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
                                            defaultValue={task.rating || 1}
                                            onMouseUp={(e) => handleRatingChange(task._id, e.target.value)}
                                            onChange={(e) => setTasks(tasks.map(t => t._id === task._id ? { ...t, rating: parseInt(e.target.value, 10) } : t))}
                                        />
                                        <span>{task.rating || 1}</span>
                                    </div>
                                )}
                                <div className='assigned-by-me-button'>

                                    <button onClick={() => handleEditTask(task)}>Edit</button>
                                    {task.submissionAttachment && (
                                        
                                                <button className="download-button" onClick={() => handleDownload(task)}>View submission</button> 
                                     
                                        )}
                                    <button className="delete-button" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No tasks created by you.</p>
                )}
            </div>
        </div>
    );
};

export default ViewTasksAssignedByYou;

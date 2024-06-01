import React, { useState } from 'react';
import './CreateTasks.css';
import logo from "./logo.png";

const CreateTasks = () => {
    const [taskData, setTaskData] = useState({
        taskName: '',
        taskDescription: '',
        priorityLevel: 'high',
        assignTo: '',
        taskDeadline: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(taskData); // Here, you can send the task data to the server or perform any other action
        alert('Task created successfully!'); // For demonstration purpose
        setTaskData({
            taskName: '',
            taskDescription: '',
            priorityLevel: 'high',
            assignTo: '',
            taskDeadline: ''
        });
    };

    return (
        <div className="gradient-background">
            <div className="container">
                <div className="header">
                    <img src={logo} alt="Taskify Logo" />
                </div>
                <div className="content">
                    <h1>Create Task</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="taskName">Task Name:</label>
                            <input type="text" id="taskName" name="taskName" value={taskData.taskName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskDescription">Description:</label>
                            <textarea id="taskDescription" name="taskDescription" value={taskData.taskDescription} onChange={handleChange} rows="4"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="priorityLevel">Priority Level:</label>
                            <select id="priorityLevel" name="priorityLevel" value={taskData.priorityLevel} onChange={handleChange}>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="assignTo">Assign To:</label>
                            <input type="text" id="assignTo" name="assignTo" value={taskData.assignTo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskDeadline">Deadline:</label>
                            <input type="datetime-local" id="taskDeadline" name="taskDeadline" value={taskData.taskDeadline} onChange={handleChange} />
                        </div>
                        <button type="submit">Save Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTasks;
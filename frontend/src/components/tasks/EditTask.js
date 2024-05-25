import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateTask.css';

const EditBook = () => {

  const [title, setTitle] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState('')
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/tasks/${id}`)
    .then ((response) => {
      setTitle(response.data.title)
      setAssignedTo(response.data.assignedTo)
      setAssignedBy(response.data.assignedBy)
      setDescription(response.data.description)
      setDeadline(response.data.deadline)
    }).catch((error) => {
      setLoading(false)
      alert('An error occured. Please check console')
      console.log(error)
    })
  }, [])

  const handleEditTask = (event) => {
    event.preventDefault();
    const data = {
      title, assignedTo, assignedBy, description, deadline
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/tasks/${id}`, data)
      .then(()=> {
        setLoading(false);
        navigate('/IndivHomepage');
      })
      .catch((error)=> {
        setLoading(false)
        alert('An error occured. Please check console')
        console.log(error)
      })
  }

    return (
        <div className="container">
            <BackButton/>
            <h1>Edit Task</h1>
            {loading ? (<p>Loading...</p>) : ('')}

            <form>
                <div className="form-group">
                    <label>Task Title:</label>
                    <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Assigned To:</label>
                    <input type="text" value={assignedTo} onChange={(e)=> setAssignedTo(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Assigned By:</label>
                    <input type="text" value={assignedBy} onChange={(e)=> setAssignedBy(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea id="taskDescription" value={description} onChange={(e)=> setDescription(e.target.value)} rows="4"></textarea>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="priorityLevel">Priority Level:</label>
                    <select id="priorityLevel" name="priorityLevel" value={taskData.priorityLevel} onChange={handleChange}>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div> */}
                <div className="form-group">
                    <label>Deadline:</label>
                    <input type="datetime-local" id="taskDeadline" value={deadline} onChange={(e)=> setDeadline(e.target.value)}  />
                </div>
                <button type="button" onClick={handleEditTask}>Save Task</button>
            </form>
        </div>
    );
};

export default EditBook;

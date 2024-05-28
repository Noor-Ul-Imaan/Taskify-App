import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateTask.css';
import { useAuthContext } from '../../hooks/useAuthContext'

const EditBook = () => {

  const [title, setTitle] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState('')
  const navigate = useNavigate();
  const {id} = useParams()
  const { user } = useAuthContext()

  useEffect(() => {
    setLoading(true)
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Check if user and token exist before using
          },
        });
        setTitle(response.data.title);
        setAssignedTo(response.data.assignedTo);
        setAssignedBy(response.data.assignedBy);
        setDescription(response.data.description);
        setDeadline(response.data.deadline);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Ensure loading state is set to false even on errors
      }
    };

    if (user) { // Fetch task only if user is logged in
      fetchTask();
    }
  }, [id, user]);



  //   axios.get(`http://localhost:5000/tasks/${id}`)
  //   .then ((response) => {
  //     setTitle(response.data.title)
  //     setAssignedTo(response.data.assignedTo)
  //     setAssignedBy(response.data.assignedBy)
  //     setDescription(response.data.description)
  //     setDeadline(response.data.deadline)
  //   }).catch((error) => {
  //     setLoading(false)
  //     alert('An error occured. Please check console')
  //     console.log(error)
  //   })
  // }, [])

  const handleEditTask = async (event) => {
    event.preventDefault();
    const data = {
      title, assignedTo, assignedBy, description, deadline
    };
    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, data, {
        headers: {
          'Content-Type': 'application/json', // Might be unnecessary depending on your backend
          Authorization: `Bearer ${user?.token}`, // Check if user and token exist before using
        },
      });
      setLoading(false);
      navigate('/IndivHomepage');
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please check console');
      setLoading(false);
    }
  };


  //   axios
  //     .put(`http://localhost:5000/tasks/${id}`, data)
  //     .then(()=> {
  //       setLoading(false);
  //       navigate('/IndivHomepage');
  //     })
  //     .catch((error)=> {
  //       setLoading(false)
  //       alert('An error occured. Please check console')
  //       console.log(error)
  //     })
  // }

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

import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteTask = () => {
  const [loading, setLoading] = useState('')
  const navigate = useNavigate();
  const {id} = useParams()
  const handleDeleteTask = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setLoading(false)
        navigate('/IndivHomepage')
      })
      .catch((error)=> {
        console.log(error)
        alert('An error occured. Please check console')
        setLoading(false)
      })
  }
  return (
    <div>
      <BackButton/>
      <h1>Delete Book</h1>
      {loading ? (<p>Loading...</p>) : ('')}
      <div>
        <h3>Are you sure you want to delete this Task?</h3>
        <button onClick={handleDeleteTask}>Yes, Delete it</button>
      </div>


    </div>
  )
}

export default DeleteTask
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import mongoose from 'mongoose'
import BackButton from './BackButton'
import deadlineFormat from './deadlineFormat'
import './ShowTask.css'
import { useAuthContext } from '../../hooks/useAuthContext'

const ShowTask = () => {
  const [task, setTask] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams();

  const { user } = useAuthContext()

  
  useEffect(()=> {
    console.log("ID:", id)

    setLoading(true);

    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`, {
          headers: {
            'Content-Type': 'application/json', // Might be unnecessary depending on your backend
            Authorization: `Bearer ${user?.token}`, // Check if user and token exist before using
          },
        });
        setTask(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Ensure loading state is set to false even on errors
      }
    };

    if (user) { // Fetch task only if user is logged in
      fetchTask();
    }
  }, [id, user]); // Update effect on changes to id and user



  //   axios
  //     .get(`http://localhost:5000/tasks/${id}`)
  //     .then((response) => {
  //       setTask(response.data)
  //       setLoading(false)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       setLoading(false)
  //     })
  // }, []);



  return (
    <div className='container'>
      <Link>
        <BackButton/>
      </Link>
      <h1>Show Task</h1>
      {loading? (
        <p>Loading...</p>
      ):(
        <table>
          <tbody>

          
          <tr>
            <td>ID: </td><br></br>
            <td>{task._id}</td>
            <hr></hr>
          </tr>
          <tr>
            <td>Title: </td><br></br>
            <td>{task.title}</td>
            <hr></hr>
          </tr>
          <tr>
            <td>Assigned By: </td><br></br>
            <td>{task.assignedBy}</td>
            <hr></hr>
          </tr>
          <tr>
            <td>Assigned To: </td><br></br>
            <td>{task.assignedTo}</td>
            <hr></hr>
          </tr>
          <tr>
            <td>Description</td><br></br>
            <td>{task.description}</td>
            <hr></hr>
          </tr>
          <tr>
            <td>Deadline</td><br></br>
            <td>{deadlineFormat(task.deadline)}</td>
            <hr></hr>
          </tr>
          <tr>
            <td>Create Time: </td><br></br>
            <td>{deadlineFormat(new Date(task.createdAt).toString())}</td>
            <hr></hr>
          </tr>
          <tr>
            <td>Last Update Time: </td><br></br>
            <td>{deadlineFormat(new Date(task.updatedAt).toString())}</td>
            <hr></hr>
          </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ShowTask
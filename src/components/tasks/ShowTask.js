import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import mongoose from 'mongoose'
import BackButton from './BackButton'
import deadlineFormat from './deadlineFormat'
import './ShowTask.css'

const ShowTask = () => {
  const [task, setTask] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams();

  useEffect(()=> {
    console.log("ID:", id)

    setLoading(true);
    axios
      .get(`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        setTask(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, []);



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
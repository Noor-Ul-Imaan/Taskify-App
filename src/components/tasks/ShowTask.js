import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import mongoose from 'mongoose'
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
    <div>
      <Link>Back</Link>
      <h1>Show Book</h1>
      {loading? (
        <p>Loading...</p>
      ):(
        <div>
          <div>
            <span>ID: </span><br></br>
            <span>{task._id}</span>
            <hr></hr>
          </div>
          <div>
            <span>Title: </span><br></br>
            <span>{task.title}</span>
            <hr></hr>
          </div>
          <div>
            <span>Assigned By: </span><br></br>
            <span>{task.assignedBy}</span>
            <hr></hr>
          </div>
          <div>
            <span>Assigned To: </span><br></br>
            <span>{task.assignedTo}</span>
            <hr></hr>
          </div>
          {/* <div>
            <span>Description</span>
            <span>{task.description}</span>
          </div>
          <div>
            <span>Deadline</span>
            <span>{task.deadline}</span>
          </div> */}
          <div>
            <span>Create Time: </span><br></br>
            <span>{new Date(task.createdAt).toString()}</span>
            <hr></hr>
          </div>
          <div>
            <span>Last Update Time: </span><br></br>
            <span>{new Date(task.updatedAt).toString()}</span>
            <hr></hr>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowTask
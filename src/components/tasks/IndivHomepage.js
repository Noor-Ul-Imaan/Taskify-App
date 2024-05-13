import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import './IndivHomepage.css'


const IndivHomepage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    setLoading(true);
    axios
      .get('http://localhost:5000/tasks')
      .then((response) => {
        setTasks(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, []);
  return (
    <div className='indivHomepage'>
      <div>
        <h1>TASKS LIST</h1>
        <Link to='/tasks/create'>Add Task<MdOutlineAddBox/></Link>
      </div>      
      {loading ? (<div className="loading-indicator">Loading...</div>
      ): (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Operations</th>
              
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.assignedTo}</td>
                <td>
                  <div>
                    <Link to={`/tasks/details/${task._id}`}>Details <BsInfoCircle/></Link>
                    <Link to={`/tasks/edit/${task._id}`}>Edit <AiOutlineEdit/></Link>
                    <Link to={`/tasks/delete/${task._id}`}>Delete <MdOutlineDelete/></Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  )
}

export default IndivHomepage
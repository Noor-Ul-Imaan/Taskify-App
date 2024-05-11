import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


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
        <Link to='/tasks/create'>Add</Link>
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
                    <Link to={`/tasks/details/${task._id}`}>Details</Link>
                    <Link to={`/tasks/edit/${task._id}`}>Edit</Link>
                    <Link to={`/tasks/delete/${task._id}`}>Delete</Link>
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
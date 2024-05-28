import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import './IndivHomepage.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const IndivHomepage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/tasks', {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setTasks(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  if (!user) {
    return <p>You must be logged in to view tasks.</p>;
  }

  return (
    <div className="indivHomepage">
      <div>
        <h1>TASKS LIST</h1>
        <Link to="/tasks/create">
          Add Task <MdOutlineAddBox />
        </Link>
      </div>
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
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
                    <Link to={`/tasks/details/${task._id}`}>
                      Details <BsInfoCircle />
                    </Link>
                    <Link to={`/tasks/edit/${task._id}`}>
                      Edit <AiOutlineEdit />
                    </Link>
                    <Link to={`/tasks/delete/${task._id}`}>
                      Delete <MdOutlineDelete />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IndivHomepage;












// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { AiOutlineEdit } from 'react-icons/ai';
// import { BsInfoCircle } from 'react-icons/bs';
// import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
// import './IndivHomepage.css';

// import { useTasksContext } from '../../hooks/useTasksContext';
// import { useAuthContext } from '../../hooks/useAuthContext';

// const IndivHomepage = () => {
//   const { tasks, dispatch } = useTasksContext();
//   const { user } = useAuthContext();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       setIsLoading(true);

//       try {
//         const response = await axios.get('http://localhost:5000/tasks', {
//           headers: { Authorization: `Bearer ${user?.token}` },
//         });

//         if (response.status === 200) {
//           console.log('Tasks response:', response.data);
//           dispatch({ type: 'SET_TASKS', payload: response.data });
//         } else {
//           console.error('Error fetching tasks:', response.statusText, response);
//           setError('An error occurred while fetching tasks.');
//         }
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//         setError('An error occurred while fetching tasks.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (user) {
//       fetchTasks();
//     } else {
//       setError('You must be logged in to view tasks.');
//     }
//   }, [dispatch, user]);

//   if (!user) {
//     return <p>You must be logged in to view tasks.</p>;
//   }

//   // Ensure tasks is always an array
//   const tasksArray = Array.isArray(tasks) ? tasks : [];

//   return (
//     <div className="indivHomepage">
//       <div>
//         <h1>TASKS LIST</h1>
//         <Link to="/tasks/create">
//           Add Task <MdOutlineAddBox />
//         </Link>
//       </div>
//       {isLoading ? (
//         <p>Loading tasks...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>No.</th>
//               <th>Title</th>
//               <th>Assigned To</th>
//               <th>Operations</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasksArray.map((task, index) => (
//               <tr key={task._id}>
//                 <td>{index + 1}</td>
//                 <td>{task.title}</td>
//                 <td>{task.assignedTo}</td>
//                 <td>
//                   <div>
//                     <Link to={`/tasks/details/${task._id}`}>
//                       Details <BsInfoCircle />
//                     </Link>
//                     <Link to={`/tasks/edit/${task._id}`}>
//                       Edit <AiOutlineEdit />
//                     </Link>
//                     <Link to={`/tasks/delete/${task._id}`}>
//                       Delete <MdOutlineDelete />
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default IndivHomepage;













// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { AiOutlineEdit } from 'react-icons/ai';
// import { BsInfoCircle } from 'react-icons/bs';
// import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
// import './IndivHomepage.css';



// import { useTasksContext } from '../../hooks/useTasksContext';
// import { useAuthContext } from '../../hooks/useAuthContext';

// const IndivHomepage = () => {
//   const { tasks, dispatch } = useTasksContext();

//   const {user} = useAuthContext()

//   useEffect(() => {
//     const fetchTasks = async () => {
    
//         const response = await fetch('http://localhost:5000/tasks', {
//           headers: {'Authorization': `Bearer ${user.token}`},
//         })
//         const json = await response.json()
  
//         if (response.ok) {
//           dispatch({type: 'SET_TASKS', payload: json})
//         }
//       }
  
//       if (user) {
//         fetchTasks()
//       }
//   }, [dispatch, user]);

//   return (
//     <div className="indivHomepage">
//       <div>
//         <h1>TASKS LIST</h1>
//         <Link to="/tasks/create">
//           Add Task <MdOutlineAddBox />
//         </Link>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>Title</th>
//             <th>Assigned To</th>
//             <th>Operations</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task, index) => (
//             <tr key={task._id}>
//               <td>{index + 1}</td>
//               <td>{task.title}</td>
//               <td>{task.assignedTo}</td>
//               <td>
//                 <div>
//                   <Link to={`/tasks/details/${task._id}`}>
//                     Details <BsInfoCircle />
//                   </Link>
//                   <Link to={`/tasks/edit/${task._id}`}>
//                     Edit <AiOutlineEdit />
//                   </Link>
//                   <Link to={`/tasks/delete/${task._id}`}>
//                     Delete <MdOutlineDelete />
//                   </Link>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default IndivHomepage;








// import React, {useEffect, useState} from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { AiOutlineEdit } from 'react-icons/ai'
// import { BsInfoCircle } from 'react-icons/bs'
// import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
// import './IndivHomepage.css'


// const IndivHomepage = () => {
//   const [tasks, setTasks] = useState([])
//   const [loading, setLoading] = useState(false)
//   useEffect(()=> {
//     setLoading(true);
//     axios
//       .get('http://localhost:5000/tasks')
//       .then((response) => {
//         setTasks(response.data.data)
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.log(error)
//         setLoading(false)
//       })
//   }, []);
//   return (
//     <div className='indivHomepage'>
//       <div>
//         <h1>TASKS LIST</h1>
//         <Link to='/tasks/create'>Add Task<MdOutlineAddBox/></Link>
//       </div>      
//       {loading ? (<div className="loading-indicator">Loading...</div>
//       ): (
//         <table>
//           <thead>
//             <tr>
//               <th>No.</th>
//               <th>Title</th>
//               <th>Assigned To</th>
//               <th>Operations</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task, index) => (
//               <tr key={task._id}>
//                 <td>{index + 1}</td>
//                 <td>{task.title}</td>
//                 <td>{task.assignedTo}</td>
//                 <td>
//                   <div>
//                     <Link to={`/tasks/details/${task._id}`}>Details <BsInfoCircle/></Link>
//                     <Link to={`/tasks/edit/${task._id}`}>Edit <AiOutlineEdit/></Link>
//                     <Link to={`/tasks/delete/${task._id}`}>Delete <MdOutlineDelete/></Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>

//   )
// }

// export default IndivHomepage
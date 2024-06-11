import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TaskManager.css'; // Import the CSS file here

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => onDeleteTask(taskId))
    .catch(error => console.error('Error deleting task:', error));
  };

  const handleDownload = (task) => { // Receive the task object as a parameter
    if (task.attachment) {
      const link = document.createElement('a');
      link.href = `http://localhost:5000/${task.attachment}`; // Update the URL path
      link.download = task.attachment;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Attachment not found for task:', task._id);
    }
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id} className="task-section">
          <h2 className="task-title">{task.title}</h2>
          <p className="task-details">{task.description}</p>
          <p className="task-details">Assigned by: {task.assignedBy}</p>
          {task.deadline ?
          (          <p className="task-details">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
        ) :(
          <p className="task-details">No deadline</p>
        )
          }
          <div className='task-list-button'>
            {/* <div> */}
              {task.assignedTo === user.username && !task.isSubmitted && (
                
                <Link to={`/SubmitTask/${task._id}`} state={{ task }}>
                  <button>Submit</button>
                </Link>
              )}
            {/* </div> */}
            {/* <div> */}
              {task.attachment && (
                <div>
                  <button onClick={() => handleDownload(task)}>View Attachment</button> {/* Pass task object */}
                </div>
              )}
            {/* </div> */}

         </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;








// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './TaskManager.css'; // Import the CSS file here
// import TaskItem from './TaskItem';

// const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleDelete = (taskId) => {
//     axios.delete(`http://localhost:5000/tasks/${taskId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(() => onDeleteTask(taskId))
//     .catch(error => console.error('Error deleting task:', error));
//   };

//   const handleDownload = () => {
//     if (task.attachment) {
//       const link = document.createElement('a');
//       link.href = `http://localhost:5000/${task.attachment}`; // Update the URL path
//       link.download = task.attachment;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else {
//       console.error('Attachment not found for task:', task._id);
//     }
//   };

//   return (
//     <div>
//             {tasks.map(task => (
//         <div key={task._id} className="task-section">
//           <h2 className="task-title">{task.title}</h2>
//           <p className="task-details">{task.description}</p>
//           <p className="task-details">Assigned by: {task.assignedBy}</p>
//           <p className="task-details">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
//           {task.assignedTo === user.username && !task.isSubmitted && (
//             <Link to={`/SubmitTask/${task._id}`} state={{ task }}>
//               <button>Submit</button>
//             </Link>
//           )}
//                 {/* <h3>{task.title}</h3> */}
//       {/* <p>{task.description}</p> */}
//       {/* <p>Deadline: {task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline'}</p> */}
//             {task.attachment ? (
//               <div>
//                 <button onClick={handleDownload}>View Attachment</button>
//               </div>
//             ) : (
//               <p>No attachment</p>
//             )}

//         </div>
//       ))}
//       {/* {tasks.map(task => (
//         <TaskItem 
//           key={task._id} 
//           task={task} 
//           onUpdateTask={onUpdateTask} 
//           onDeleteTask={onDeleteTask} 
//         />
//       ))} */}
//       {/* {tasks.map(task => (
//         <div key={task._id} className="task-section">
//           <h2 className="task-title">{task.title}</h2>
//           <p className="task-details">{task.description}</p>
//           <p className="task-details">Assigned by: {task.assignedBy}</p>
//           <p className="task-details">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
//           {task.assignedTo === user.username && !task.isSubmitted && (
//             <Link to={`/SubmitTask/${task._id}`} state={{ task }}>
//               <button>Submit</button>
//             </Link>
//           )}
//           <button onClick={() => handleDelete(task._id)}>Delete</button>
//         </div>
//       ))} */}
//     </div>
//   );
// };

// export default TaskList;

import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// const OrgHome = () -> {
//     const [organizations, setOrganizations] = useState([]);
//     const [loading, setLoading] = useState(false);
//     useEffect(()=> {
//         setLoading(true);
//         axios
//           .get('http://localhost:5000/organizations')
//           .then((response) => {
//             setOrganizations(response.data.data)
//             setLoading(false)
//           })
//           .catch((error) => {
//             console.log(error)
//             setLoading(false)
//           })
//       }, []);
//     return{
//         <div className='OrgHome'> OrgHome</div>
//     }
// }

export default OrgHome
import React from 'react'
import { Link } from 'react-router-dom'
const Dump = () => {
  return (
    <div>
        <Link to='/createTasks'>
        CreateTasks
        </Link>

        <br></br>
        
        <Link to='/AdminNotifs'>
        AdminNotifs
        </Link>

        <br></br>

        <Link to='/InviteMembers'>
        InviteMembers
        </Link>

        <br></br>
        {/* <Link to='/IndivNotifs'>
        IndivNotifs
        </Link> */}

        <Link to='/AdminHomepage'>
        AdminHomepage</Link>

    </div>
  )
}

export default Dump
import React from "react";
import { Link } from "react-router-dom";
const Dump = () => {
  return (
    <div>
      {/* <Link to="/createTasks">CreateTasks</Link>

      <br></br>

      <Link to="/AdminNotifs">AdminNotifs</Link>

      <br></br> */}

      {/* <Link to="/InviteMembers">InviteMembers</Link>

      <br></br> */}
      {/* <Link to="/IndivNotifs">IndivNotifs</Link> */}

      <br></br>
      <Link to="/AdminHomepage">AdminHomepage (all org view edit delete option thru id)</Link>

      {/* <br></br>
      <Link to="/OrgHierarchy">OrgHierarchy</Link>

      <br></br>
      <Link to="/Reorder">Reorder</Link> */}

      <br></br>
      <Link to="/IndivHomepage">IndivHomepage (all tasks list) individual ki to do list</Link>

      {/* <br></br>
      <Link to="/OrgSettings">OrgSettings</Link>*/}
      <br></br> 

      <Link to="/AdminPannel">AdminPanel (after org login)</Link>
      <br></br>

      <Link to="/IndividualPannel">IndividualPannel (after indiv login)</Link>
      <br></br>

      <Link to="/JoinOrg">Join Org (after indiv sign up)</Link>
      <br></br>

      {/* <Link to="/UserManagement">User Management</Link>
      <br></br> */}

      <Link to="/OrganizationDetails">OrganizationDetails (come after org sign up)</Link>
      <br></br>
      <Link to="/SubmitTask">Submit Tasks</Link>

    </div>
  );
};

export default Dump;

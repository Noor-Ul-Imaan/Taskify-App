import React from "react";
import { Link } from "react-router-dom";
const Dump = () => {
  return (
    <div>
      <Link to="/createTasks">CreateTasks</Link>

      <br></br>

      <Link to="/AdminNotifs">AdminNotifs</Link>

      <br></br>

      <Link to="/InviteMembers">InviteMembers</Link>

      <br></br>
      <Link to="/IndivNotifs">IndivNotifs</Link>

      <br></br>
      <Link to="/AdminHomepage">AdminHomepage</Link>

      <br></br>
      <Link to="/OrgHierarchy">OrgHierarchy</Link>

      <br></br>
      <Link to="/Reorder">Reorder</Link>

      <br></br>
      <Link to="/IndivHomepage">IndivHomepage</Link>

      <br></br>
      <Link to="/OrgSettings">OrgSettings</Link>
      <br></br>

      <Link to="/AdminPannel">AdminPanel</Link>
      <br></br>

      <Link to="/IndividualPannel">IndividualPannel</Link>
    </div>
  );
};

export default Dump;

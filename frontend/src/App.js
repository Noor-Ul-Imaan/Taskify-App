import "./App.css";
import HomePage from "./components/HomePage";
import MainPageAfterSignUp from "./components/mainPageAfterSignUp";
import IndivRegis from "./components/IndivRegis";
import OrgSignUp from "./components/OrgSignUp";
import SignIn from "./components/SignIn";
import WhoAreYou from "./components/WhoAreYou";
import UserManagement from "./components/UserManagement";
import AboutUs from "./components/AboutUs";
import ContactForm from "./components/ContactForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHomepage from "./components/AdminHomepage";
import CreateTasks from "./components/CreateTasks";
import Dump from "./components/dump";
import AdminNotifs from "./components/AdminNotifs";
import Settings from "./components/Settings";
import IndivNotifs from "./components/IndivNotifs";
import InviteMembers from "./components/InviteMembers";
import FAQs from "./components/FAQs";
import OrgHierarchy from "./components/OrgHierarchy";
import Reorder from "./components/Reorder";
import OrganizationDetails from "./components/OrganizationDetails";
import IndivHomepage from "./components/tasks/IndivHomepage";
import OrgSettings from "./components/OrgSettings";
import JoinOrg from "./components/JoinOrg";

import Navbar from "./components/sections/Navbar";

import CreateTask from "./components/tasks/CreateTask";
import DeleteTask from "./components/tasks/DeleteTask";
import EditTask from "./components/tasks/EditTask";
import ShowTask from "./components/tasks/ShowTask";

import CreateOrg from "./components/orgDetails/CreateOrg";
import DeleteOrg from "./components/orgDetails/DeleteOrg";
import EditOrg from "./components/orgDetails/EditOrg";
import ShowOrg from "./components/orgDetails/ShowOrg";
import AdminPannel from "./components/AdminPannel";
import IndividualPannel from "./components/IndividualPannel";

import { useEffect } from "react";
import axios from "axios";

function App() {
  // useEffect(()=> {
  //   axios.get('http://localhost:5000/tasks').then (
  //     response=> console.log(response)
  //   )
  // }, [])
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/mainPageAfterSignUp"
            element={<MainPageAfterSignUp />}
          />
          <Route path="/IndivRegis" element={<IndivRegis />} />
          <Route path="/OrgSignUp" element={<OrgSignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/WhoAreYou" element={<WhoAreYou />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactForm" element={<ContactForm />} />
          <Route path="/adminHomepage" element={<AdminHomepage />} />
          <Route path="/createTasks" element={<CreateTasks />} />
          <Route path="/dump" element={<Dump />} />
          <Route path="/AdminNotifs" element={<AdminNotifs />} />
          <Route path="/IndivNotifs" element={<IndivNotifs />} />
          <Route path="/InviteMembers" element={<InviteMembers />} />
          <Route path="/AdminHomepage" element={<AdminHomepage />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/OrgHierarchy" element={<OrgHierarchy />} />
          <Route path="/Reorder" element={<Reorder />} />
          <Route path="/OrgSettings" element={<OrgSettings />} />
          <Route path="/JoinOrg" element={<JoinOrg />} />
          <Route
            path="/OrganizationDetails"
            element={<OrganizationDetails />}
          />
          <Route path="/IndivHomepage" element={<IndivHomepage />} />
          {/* for tasks */}
          <Route path="/tasks/create" element={<CreateTask />} />
          <Route path="/tasks/details/:id" element={<ShowTask />} />
          <Route path="/tasks/edit/:id" element={<EditTask />} />
          <Route path="/tasks/delete/:id" element={<DeleteTask />} />

          {/* for organizations */}
          <Route path="/organizations/create" element={<CreateOrg />} />
          <Route path="/organizations/details/:id" element={<ShowOrg />} />
          <Route path="/organizations/edit/:id" element={<EditOrg />} />
          <Route path="/organizations/delete/:id" element={<DeleteOrg />} />
          <Route path="/AdminPannel" element={<AdminPannel />} />
          <Route path="/IndividualPannel" element={<IndividualPannel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import "./App.css";
// import HomePage from "./components/HomePage";
// import MainPageAfterSignUp from "./components/mainPageAfterSignUp";
// import IndivRegis from "./components/IndivRegis";
// import OrgSignUp from "./components/OrgSignUp";
// import SignIn from "./components/SignIn";
// import WhoAreYou from "./components/WhoAreYou";
// import UserManagement from "./components/UserManagement";
// import AboutUs from "./components/AboutUs";
// import ContactForm from "./components/ContactForm";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminHomepage from "./components/AdminHomepage";
// import CreateTasks from "./components/CreateTasks";
// import Dump from "./components/dump";
// import AdminNotifs from "./components/AdminNotifs";
// import Settings from "./components/Settings";
// import IndivNotifs from "./components/IndivNotifs";
// import InviteMembers from "./components/InviteMembers";
// import FAQs from "./components/FAQs";
// import OrgHierarchy from "./components/OrgHierarchy";
// import Reorder from "./components/Reorder";
// import OrganizationDetails from "./components/OrganizationDetails";
// import IndivHomepage from "./components/tasks/IndivHomepage";
// import OrgSettings from "./components/OrgSettings";

// import CreateTask from "./components/tasks/CreateTask";
// import DeleteTask from "./components/tasks/DeleteTask";
// import EditTask from "./components/tasks/EditTask";
// import ShowTask from "./components/tasks/ShowTask";

// import CreateOrg from "./components/orgDetails/CreateOrg";
// import DeleteOrg from "./components/orgDetails/DeleteOrg";
// import EditOrg from "./components/orgDetails/EditOrg";
// import ShowOrg from "./components/orgDetails/ShowOrg";

// import { useEffect } from "react";
// import axios from "axios";

// function App() {
//   // useEffect(()=> {
//   //   axios.get('http://localhost:5000/tasks').then (
//   //     response=> console.log(response)
//   //   )
//   // }, [])
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<HomePage />} />

//           {/* for tasks */}
//           <Route path="/tasks/create" element={<CreateTask />} />
//           <Route path="/tasks/details/:id" element={<ShowTask />} />
//           <Route path="/tasks/edit/:id" element={<EditTask />} />
//           <Route path="/tasks/delete/:id" element={<DeleteTask />} />

//           {/* for organizations */}
//           <Route path="/organizations/create" element={<CreateOrg />} />
//           <Route path="/organizations/details/:id" element={<ShowOrg />} />
//           <Route path="/organizations/edit/:id" element={<EditOrg />} />
//           <Route path="/organizations/delete/:id" element={<DeleteOrg />} />
//           {/* <Route path="/organizations/:id/settings" component={OrgSettings} /> */}

//           <Route
//             path="/mainPageAfterSignUp"
//             element={<MainPageAfterSignUp />}
//           />
//           <Route path="/IndivRegis" element={<IndivRegis />} />
//           <Route path="/OrgSignUp" element={<OrgSignUp />} />
//           <Route path="/SignIn" element={<SignIn />} />
//           <Route path="/WhoAreYou" element={<WhoAreYou />} />
//           <Route path="/UserManagement" element={<UserManagement />} />
//           <Route path="/AboutUs" element={<AboutUs />} />
//           <Route path="/ContactForm" element={<ContactForm />} />
//           <Route path="/adminHomepage" element={<AdminHomepage />} />
//           <Route path="/createTasks" element={<CreateTasks />} />
//           <Route path="/dump" element={<Dump />} />
//           <Route path="/AdminNotifs" element={<AdminNotifs />} />
//           <Route path="/IndivNotifs" element={<IndivNotifs />} />
//           <Route path="/InviteMembers" element={<InviteMembers />} />
//           <Route path="/AdminHomepage" element={<AdminHomepage />} />
//           <Route path="/Settings" element={<Settings />} />
//           <Route path="/OrgSettings/:id" element={<OrgSettings />} />
//           <Route path="/FAQs" element={<FAQs />} />
//           <Route path="/OrgHierarchy" element={<OrgHierarchy />} />
//           <Route path="/Reorder" element={<Reorder />} />
//           <Route
//             path="/OrganizationDetails"
//             element={<OrganizationDetails />}
//           />
//           <Route path="/IndivHomepage" element={<IndivHomepage />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

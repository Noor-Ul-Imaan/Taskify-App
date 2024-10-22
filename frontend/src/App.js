// src/App.js
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
import Login from "./components/adminOrg/Login";
import AdminHomepage from "./components/AdminHomepage"; // Assuming you have an AdminHomepage component
import { AuthProvider } from "./components/adminOrg/AuthContext";
import ProtectedRoute from "./components/adminOrg/ProtectedRoute";
import { useEffect } from "react";
import axios from "axios";
import CreateUserForm from "./components/CreateUserForm";
import SubmitTask from "./components/SubmitTask";

import TaskViewPage from "./components/taskHandle/TaskViewPage";
import TaskManager from "./components/taskHandle/TaskManager";
import ViewTasksAssignedByYou from "./components/taskHandle/ViewAssignedByYou";
import ViewTasksAssignedToYou from "./components/taskHandle/ViewAssignedToYou";
import MissedTasks from "./components/taskHandle/MissedTasks";
import TotalTasks from "./components/taskHandle/TotalTasks";
import CompletedTasks from "./components/taskHandle/CompletedTasks";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/mainPageAfterSignUp"
              element={<MainPageAfterSignUp />}
            />
            <Route path="/IndivRegis" element={<IndivRegis />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/OrgSignUp" element={<OrgSignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/WhoAreYou" element={<WhoAreYou />} />
            <Route path="/UserManagement" element={<UserManagement />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ContactForm" element={<ContactForm />} />
            <Route path="/createTasks" element={<CreateTasks />} />
            <Route path="/dump" element={<Dump />} />
            <Route path="/AdminNotifs" element={<AdminNotifs />} />
            <Route path="/IndivNotifs" element={<IndivNotifs />} />
            <Route path="/InviteMembers" element={<InviteMembers />} />
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
            <Route path="/tasks/create" element={<CreateTask />} />
            <Route path="/tasks/details/:id" element={<ShowTask />} />
            <Route path="/tasks/edit/:id" element={<EditTask />} />
            <Route path="/tasks/delete/:id" element={<DeleteTask />} />
            <Route path="/organizations/create" element={<CreateOrg />} />
            <Route path="/organizations/details/:id" element={<ShowOrg />} />
            <Route path="/organizations/edit/:id" element={<EditOrg />} />
            <Route path="/organizations/delete/:id" element={<DeleteOrg />} />
            <Route path="/AdminPannel" element={<AdminPannel />} />
            <Route path="/IndividualPannel" element={<IndividualPannel />} />
            <Route path="/SubmitTask" element={<SubmitTask />} />
            <Route path="/SubmitTask/:id" element={<SubmitTask />} />

            <Route path="/login" element={<Login />} />

            <Route path="/TaskManager" element={<TaskManager />} />
            <Route path="/TaskViewPage" element={<TaskViewPage />} />
            <Route
              path="/ViewAssignedByYou"
              element={<ViewTasksAssignedByYou />}
            />
            <Route
              path="/ViewAssignedToYou"
              element={<ViewTasksAssignedToYou />}
            />
            <Route
              path="/MissedTasks"
              element={<MissedTasks />}
            />
            <Route
              path="/TotalTasks"
              element={<TotalTasks />}
            />
            <Route
              path="/CompletedTasks"
              element={<CompletedTasks />}
            />


            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/adminHomepage" element={<AdminHomepage />} />

              <Route path="/organizations" element={<OrganizationDetails />} />
              <Route path="/user-details/:id" element={<UserDetails />} />

              <Route path="/CreateUserForm" element={<CreateUserForm />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

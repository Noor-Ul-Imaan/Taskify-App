import './App.css';
import HomePage from './components/HomePage'
import mainPageAfterSignUp from './components/mainPageAfterSignUp';
import IndivRegis from './components/IndivRegis';
import OrgSignUp from './components/OrgSignUp';
import SignIn from './components/SignIn';
import WhoAreYou from './components/WhoAreYou';
import UserManagement from './components/UserManagement'; 
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminHomepage from './components/AdminHomepage';
import CreateTasks from './components/CreateTasks';
import Dump from './components/dump';
import AdminNotifs from './components/AdminNotifs';
// import IndivNotifs from './components/IndivNotifs';
import InviteMembers from './components/inviteMembers';

function App() {
  return (

    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/mainPageAfterSignUp' element={<mainPageAfterSignUp />} />
            <Route path='/IndivRegis' element={<IndivRegis />} />
            <Route path='/OrgSignUp' element={<OrgSignUp />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/WhoAreYou' element={<WhoAreYou />} />
            <Route path='/UserManagement' element={<UserManagement />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/ContactForm' element={<ContactForm />} />
            <Route path='/adminHomepage' element={<AdminHomepage />} />
            <Route path='/createTasks' element={<CreateTasks />} />
            <Route path='/dump' element={<Dump />} />
            <Route path='/AdminNotifs' element={<AdminNotifs />} />
            {/* <Route path='/IndivNotifs' element={<IndivNotifs />} /> */}
            <Route path='/InviteMembers' element={<inviteMembers />} />
            <Route path='/AdminHomepage' element={<AdminHomepage />} />
            


          </Routes>
        </Router>
     
    </div>

  );
}

export default App;

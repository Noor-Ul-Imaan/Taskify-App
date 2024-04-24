import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'
import mainPageAfterSignUp from './components/mainPageAfterSignUp';
import IndivRegis from './components/IndivRegis';
import OrgSignUp from './components/OrgSignUp';
import SignIn from './components/SignIn';
import WhoAreYou from './components/WhoAreYou';
import UserManagement from './components/UserManagement'; 
import Settings from './components/Settings';
import OrgSettings from './components/OrgSettings';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
            <Route path='/Settings' element={<Settings />} />
            <Route path='/OrgSettings' element={<OrgSettings />} />
          </Routes>
        </Router>
     
    </div>
  );
}

export default App;

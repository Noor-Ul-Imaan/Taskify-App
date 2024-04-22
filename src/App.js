import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'
import mainPageAfterSignUp from './components/mainPageAfterSignUp';
import IndivRegis from './components/IndivRegis';
import orgsignup from './components/orgsignup';
import SignIn from './components/SignIn';
import whoareyou from './components/whoareyou';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/mainPageAfterSignUp' element={<mainPageAfterSignUp />} />
            <Route path='/IndivRegis' element={<IndivRegis />} />
            <Route path='/orgsignup' element={<orgsignup />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/whoareyou' element={<whoareyou />} />
          </Routes>
        </Router>
     
    </div>
  );
}

export default App;

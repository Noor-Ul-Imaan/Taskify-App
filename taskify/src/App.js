import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'
import mainPageAfterSignUp from './components/mainPageAfterSignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' exact Component={HomePage}/>
            <Route path='/mainPageAfterSignUp' Component={mainPageAfterSignUp}/>
          </Routes>
        </Router>
     
    </div>
  );
}

export default App;

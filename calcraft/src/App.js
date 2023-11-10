import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import CameraPage from './components/CameraPage';
import MenuPage from './components/MenuPage';
import LogIn from './components/LogIn';
import './App.css';
import NavBar from './components/navbar.jsx';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        {/* <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/cameras">Camera</Link></li>
              <li><Link to="/menu">Menu</Link></li> 
              <li><Link to="/signIn">Sign In</Link></li>
            </ul>
        </nav> */}
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/signIn" element={<LogIn/>} />
        </Routes> 
      <p>
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
      </a>
      <script src="index.js"></script>
      </header>
      <div className="nav-bar">
        <NavBar/>
      </div>
    </div>
    </Router>
  );
}


export default App;

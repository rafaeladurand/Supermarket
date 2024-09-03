import React, {  } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import Home from './home/home';
import Login from './login/login';
import Usuario from './home/usuario';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </Router>
  );
}

export default App;

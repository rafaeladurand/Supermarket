import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import './Welcome.css'

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');  
  }

  return (
    <div className="container">
       <img className='img-logo' src={logo} alt="logo-mix" />
      <div className="card">
        <h1>Bem-Vindo ao <strong>Mix da Fátima!</strong></h1>
        <p>O melhor sistema administrativo para você e sua empresa</p>
        <button onClick={handleGetStarted}>Vamos lá</button>
      </div>
    </div>
  );
}

export default Welcome;
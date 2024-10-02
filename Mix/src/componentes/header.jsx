import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './Header.css';
import homeimage from '../assets/home.png';
import sairimage from '../assets/saida.png';
import logoImage from '../assets/logo.png';
import managerImage from '../assets/configuracoes.png';
import nookies from 'nookies'; 

const Header = () => {
    const handleLogout = () => {
        nookies.destroy(null, 'TOKEN');
        window.location.href = '/login';
    };

    return (
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={logoImage} alt="logo" className="logo" />
          </Link>
          <span className="logoText">mix.com.br</span>
        </div>
        <div className="cart">
          <Link to="/home">
            <img src={homeimage} alt="Home" className="icon" />
          </Link>
          <Link to="/funcionario">
            <img src={managerImage} alt="Gerenciamento" className="icon" />
          </Link>
          <img 
            src={sairimage} 
            alt="Logout" 
            className="icon" 
            onClick={handleLogout} 
            style={{ cursor: 'pointer' }} 
          />
        </div>
      </header>
    );
};

export default Header;

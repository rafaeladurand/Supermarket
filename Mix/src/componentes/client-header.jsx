import React, {  } from 'react'; 
import { Link } from 'react-router-dom'; 
import './Header.css';
import sairimage from '../assets/saida.png';
import logoImage from '../assets/logo.png';
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

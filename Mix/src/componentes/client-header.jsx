import React, {  } from 'react'; 
import { Link } from 'react-router-dom'; 
import './Header.css';
import sairimage from '../assets/saida.png';
import logoImage from '../assets/logo.png';

const Header = () => {
    return (
      <header className="header">
        <div className="logo">
        <Link to="/">
            <img src={logoImage} alt="logo" className="logo" />
          </Link>
          <span className="logoText">mix.com.br</span>
        </div>
        <div className="cart">
          <Link to="/login">
            <img src={sairimage} alt="Login" className="icon" />
          </Link>
        </div>
      </header>
    );
  };

export default Header;

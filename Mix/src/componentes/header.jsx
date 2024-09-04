import React, {  } from 'react'; 
import { Link } from 'react-router-dom'; 
import './header.css';
import homeimage from './home.png';
import loginimage from './login.png';
import logoImage from './logo.png';
import managerImage from './configuracoes.png'

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
          <Link to="/">
            <img src={homeimage} alt="Home" className="icon" />
          </Link>
          <Link to="/login">
            <img src={loginimage} alt="Login" className="icon" />
          </Link>
          <Link to="/funcionario">
            <img src={managerImage} alt="Gerenciamento" className="icon" />
          </Link>
        </div>
      </header>
    );
  };

export default Header;

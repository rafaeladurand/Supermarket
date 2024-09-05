import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Usuario.css';
import Header from '../componentes/Header';
import usuariosImage from '../assets/funcionarios.png';
import productsImage from '../assets/product.png';
import clientImage from '../assets/client.png';

const Usuario = () => {
    const navigate = useNavigate();

    const met = () => {
        navigate('/funcionario/cliente');
    };
    const met2 = () => {
        navigate('/funcionario/produto');
    };
    const met3 = () => {
        navigate('/funcionario/usuario');
    };

    return (
        <div>
            <Header />
            <div className="banner">
                <div className="card">
                    <img src={clientImage} alt="img" className="card-image" />
                    <h3 className="name">Gerenciamento Clientes</h3>
                    <button className="manage-button" onClick={met}>Gerenciar</button>
                </div>
                <div className="card">
                    <img src={productsImage} alt="img" className="card-image" />
                    <h3 className="name">Gerenciamento Produtos</h3>
                    <button className="manage-button" onClick={met2}>Gerenciar</button>
                </div>
                <div className="card">
                    <img src={usuariosImage} alt="img" className="card-image" />
                    <h3 className="name">Gerenciamento Usuários</h3>
                    <button className="manage-button" onClick={met3}>Gerenciar</button>
                </div>
            </div>
            <div className="grid"></div>
        </div>
    );
};

export default Usuario;

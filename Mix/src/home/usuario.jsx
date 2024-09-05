import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Header from '../componentes/Header';

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
                    <h3 className="name">Gerenciamento Clientes</h3>
                    <button className="manage-button" onClick={met}>Gerenciar</button>
                </div>
                <div className="card">
                    <h3 className="name">Gerenciamento Produtos</h3>
                    <button className="manage-button" onClick={met2}>Gerenciar</button>

                </div>
                <div className="card">
                    <h3 className="name">Gerenciamento Usuários</h3>
                    <button className="manage-button" onClick={met3}>Gerenciar</button>
                </div>

            </div>
            <div className="grid"></div>
        </div>
    );
};

export default Usuario;

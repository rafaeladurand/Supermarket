import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import './home.css'; // Certifique-se de que o CSS está correto
import Header from '../componentes/header';

const Usuario = () => {
    const navigate = useNavigate(); // Inicializa o hook useNavigate

    const met = () => {
        navigate('/funcionario/cliente'); // Redireciona para a página desejada
    };
    const met2 = () => {
        navigate('/funcionario/produto'); // Redireciona para a página desejada
    };

    return (
        <div>
            <Header />
            <div className="banner">
                <div className="card">
                    <h3 className="name">Gerenciamento Produtos</h3>
                    <button className="manage-button" onClick={met2}>Gerenciar</button>

                </div>
                <div className="card">
                    <h3 className="name">Gerenciamento Usuários</h3>
                </div>
                <div className="card">
                    <h3 className="name">Gerenciamento Clientes</h3>
                    <button className="manage-button" onClick={met}>Gerenciar</button>
                </div>
            </div>
            <div className="grid"></div>
        </div>
    );
};

export default Usuario;

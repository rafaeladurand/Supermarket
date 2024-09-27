import React, { useEffect, useState } from 'react';
import {nookies, parseCookies} from 'nookies';
import Header from '../../componentes/header';
import CadastroModal from './CadastroModal';
import './Usuarios.css';

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [isSenhaModalOpen, setIsSenhaModalOpen] = useState(false);
    const [currentUsuario, setCurrentUsuario] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const token = parseCookies().TOKEN
                const response = await fetch('http://localhost:3001/usuario', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = parseCookies().TOKEN;
            await fetch(`http://localhost:3001/usuario/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            setUsuarios(usuarios.filter(usuario => usuario._id !== id));
        } catch (error) {
            console.error('Erro ao excluir o usuário:', error);
        }
    };

    const handleEditSenha = (usuario) => {
        setCurrentUsuario(usuario);
        setIsSenhaModalOpen(true);
    };

    const handleUpdateSenha = async (senha) => {
        if (!currentUsuario) return;

        try {
            const token = parseCookies().TOKEN;
            const updatedUsuario = { ...currentUsuario, senha };
            const response = await fetch(`http://localhost:3001/usuario/${updatedUsuario._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedUsuario),
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setIsSenhaModalOpen(false);
                    setCurrentUsuario(null);
                }, 1000);
                const updatedData = await response.json();
                setUsuarios(usuarios.map(usuario => usuario._id === updatedData._id ? updatedData : usuario));
            } else {
                console.error('Erro ao atualizar a senha:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao atualizar a senha:', error);
        }
    };

    const handleCadastroSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            nome: e.target.nome.value,
            cpf: e.target.cpf.value,
            senha: e.target.senha.value,
        };

        try {
            const token = parseCookies().TOKEN;
            const response = await fetch('http://localhost:3001/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setIsCadastroModalOpen(false);
                    window.location.reload();
                }, 1000);
                const newUsuario = await response.json();
                setUsuarios([...usuarios, newUsuario]);
            } else {
                console.error('Erro ao cadastrar o usuário:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
        }
    };

    const closeCadastroModal = () => {
        setIsCadastroModalOpen(false);
    };

    const closeSenhaModal = () => {
        setIsSenhaModalOpen(false);
        setCurrentUsuario(null);
    };

    return (
        <div>
            <Header />
            <div className="banner">
                <h1>USUÁRIOS</h1>
                <button onClick={() => setIsCadastroModalOpen(true)} className="addButton">
                    Cadastrar
                </button>
            </div>
            <div className="grid-container">
                <ul className="user-list">
                    {usuarios.length > 0 ? (
                        usuarios.map(usuario => (
                            <li key={usuario._id} className="user-card">
                                <div>
                                    <p><strong>Nome:</strong> {usuario.nome}</p>
                                    <p><strong>CPF:</strong> {usuario.cpf}</p>
                                    <button onClick={() => handleEditSenha(usuario._id)} className="edit-button">Editar Senha</button>
                                    <button onClick={() => handleDelete(usuario._id)} className="delete-button">Excluir</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>Nenhum usuário encontrado.</li>
                    )}
                </ul>
            </div>

            {isCadastroModalOpen && (
                <CadastroModal
                    onClose={closeCadastroModal}
                    onSubmit={handleCadastroSubmit}
                    isSuccess={isSuccess}
                />
            )}

            {isSenhaModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h2>Editar Senha</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const senha = e.target.senha.value;
                                handleUpdateSenha(senha);
                            }}
                        >
                            <div className="formGroup">
                                <label htmlFor="senha">Nova Senha:</label>
                                <input type="password" id="senha" name="senha" required />
                            </div>
                            <button type="submit" className="submitButton">Atualizar</button>
                            <button type="button" onClick={closeSenhaModal} className="closeButton">Fechar</button>
                        </form>
                        {isSuccess && (
                            <div className="successMessage">
                                <h2>Senha atualizada com sucesso!</h2>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Usuario;
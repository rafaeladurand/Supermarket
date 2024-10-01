import React, { useEffect, useState } from 'react';
import { nookies, parseCookies } from 'nookies';
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
            const confirmAlert = confirm('Você tem certeza que quer excluir?');
            if (confirmAlert) {
                const token = parseCookies().TOKEN;
                await fetch(`http://localhost:3001/usuario/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                setUsuarios(usuarios.filter(usuario => usuario._id !== id));
            }
        } catch (error) {
            console.error('Erro ao excluir o usuário:', error);
        }
    };

    const handleEditSenha = (usuario) => {
        console.log("Usuario recebido:", usuario);

        const usuarioEncontrado = usuarios.find(u => u._id === usuario || u._id === usuario._id);
        console.log("Usuario encontrado:", usuarioEncontrado);


        setCurrentUsuario(usuarioEncontrado || { _id: usuario });
        console.log("Current Usuario definido:", currentUsuario);

        setIsSenhaModalOpen(true);
    };

    const handleUpdateSenha = async (senha, avatarFile) => {
        if (!currentUsuario || !currentUsuario._id) {
            console.error('ID do usuário não encontrado');
            return;
        }

        console.log('Current User ID:', currentUsuario._id);
        console.log('Nova senha a ser atualizada:', senha);

        try {
            const token = parseCookies().TOKEN;
            const formData = new FormData();
            formData.append('senha', senha);
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }

            const response = await fetch(`http://localhost:3001/usuario/${currentUsuario._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            console.log('Resposta da API:', response);

            if (response.ok) {
                const updatedData = await response.json();
                console.log('Dados atualizados:', updatedData);

                setUsuarios(usuarios.map(usuario => usuario._id === updatedData._id ? updatedData : usuario));
                console.log('Lista de usuários atualizada:', usuarios);
                setIsSenhaModalOpen(false);
                window.location.reload();
            } else {
                console.error('Erro ao atualizar a senha e/ou avatar:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao atualizar a senha e/ou avatar:', error);
        }
    };

    const handleCadastroSubmit = async (e, avatarFile) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nome', e.target.nome.value);
        formData.append('cpf', e.target.cpf.value);
        formData.append('senha', e.target.senha.value);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        try {
            const token = parseCookies().TOKEN;
            const response = await fetch('http://localhost:3001/usuario', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
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
                                <div className="user-info">
                                    {usuario.avatar ? (
                                        <img src={`http://localhost:3001${usuario.avatar}`} alt={`${usuario.nome} avatar`} className="avatar" />
                                    ) : (
                                        <img src="/default-avatar.png" alt="Avatar padrão" className="avatar" />
                                    )}
                                    <div>
                                        <p><strong>Nome:</strong> {usuario.nome}</p>
                                        <p><strong>CPF:</strong> {usuario.cpf}</p>
                                        <button onClick={() => handleEditSenha(usuario._id)} className="edit-button">Editar Senha e Avatar</button>
                                        <button onClick={() => handleDelete(usuario._id)} className="delete-button">Excluir</button>
                                    </div>
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
                        <h2>Editar Senha e Avatar</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const senha = e.target.senha.value;
                                const avatarFile = e.target.avatar.files[0];
                                handleUpdateSenha(senha, avatarFile);
                            }}
                            encType="multipart/form-data"
                        >
                            <div className="formGroup">
                                <label htmlFor="senha">Nova Senha:</label>
                                <input type="password" id="senha" name="senha" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="avatar">Novo Avatar:</label>
                                <input type="file" id="avatar" name="avatar" accept="image/*" />
                            </div>
                            <button type="submit" className="submitButton">Atualizar</button>
                            <button type="button" onClick={closeSenhaModal} className="closeButton">Fechar</button>
                        </form>
                        {isSuccess && (
                            <div className="successMessage">
                                <h2>Senha e/ou Avatar atualizados com sucesso!</h2>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Usuario;
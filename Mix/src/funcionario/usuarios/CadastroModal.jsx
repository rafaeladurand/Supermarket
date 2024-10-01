
import React, { useState } from 'react';
import './CadastroModal.css';

const CadastroModal = ({ onClose, onSubmit, isSuccess }) => {
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, avatar);
    };

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <h2>Cadastrar Usuário</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="formGroup">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" required />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="cpf">CPF:</label>
                        <input type="text" id="cpf" name="cpf" required />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" required />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="avatar">Avatar:</label>
                        <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="submitButton">Cadastrar</button>
                    <button type="button" onClick={onClose} className="closeButton">Fechar</button>
                </form>
                {isSuccess && (
                    <div className="successMessage">
                        <h2>Usuário cadastrado com sucesso!</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CadastroModal;

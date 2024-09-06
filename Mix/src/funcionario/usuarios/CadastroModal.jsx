import React from 'react';
import './CadastroModal.css'; // Opcional: adicione um arquivo CSS para estilizar o modal

const CadastroModal = ({ onClose, onSubmit, isSuccess }) => {
    return (
        <div className="modalOverlay">
            <div className="modalContent">
                {isSuccess ? (
                    <div className="successMessage">
                        <h2>Usuário cadastrado com sucesso!</h2>
                    </div>
                ) : (
                    <>
                        <h2>Cadastro de Usuário</h2>
                        <form onSubmit={onSubmit}>
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
                            <button type="submit" className="submitButton">Cadastrar</button>
                            <button type="button" onClick={onClose} className="closeButton">Fechar</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default CadastroModal;

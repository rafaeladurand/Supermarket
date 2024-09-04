import React from 'react';
import './CadastroModal.css'; // Crie ou mova os estilos específicos para o modal de cadastro aqui

const CadastroModal = ({ isOpen, closeCadastroModal, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <h2>Cadastro de Produto</h2>
                <form onSubmit={onSubmit}>
                    <div className="formGroup">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" required />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="precoAtual">Preço Atual:</label>
                        <input type="number" id="precoAtual" name="precoAtual" step="0.01" required />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="precoPromocao">Preço Promoção:</label>
                        <input type="number" id="precoPromocao" name="precoPromocao" step="0.01" required />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="tipo">Tipo:</label>
                        <input type="text" id="tipo" name="tipo" required />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea id="descricao" name="descricao" required />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="dataValidade">Data de Validade:</label>
                        <input type="date" id="dataValidade" name="dataValidade" required />
                    </div>
                    <button type="submit" className="submitButton">Cadastrar</button>
                    <button type="button" onClick={closeCadastroModal} className="closeButton">Fechar</button>
                </form>
            </div>
        </div>
    );
};

export default CadastroModal;



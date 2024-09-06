import React from 'react';
import './CadastroModal.css'; 

const CadastroModal = ({ isOpen, closeCadastroModal, onSubmit, isSuccess }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay-product">
            <div className="modalContent-product">
                {isSuccess ? (
                    <div className="successMessage">
                        <h2>Produto cadastrado com sucesso!</h2>
                    </div>
                ) : (
                    <>
                        <h2>Cadastro de Produto</h2>
                        <form className="container-form" onSubmit={onSubmit}>
                            <div className="formGroup-price">
                                <label htmlFor="nome">Nome:</label>
                                <input className="input-style" id="nome" name="nome" required />
                            </div>
                            <div className="container-price">
                                <div className="formGroup-price">
                                    <label htmlFor="precoAtual">Preço Atual:</label>
                                    <input
                                        className="input-style"
                                        type="number"
                                        id="precoAtual"
                                        name="precoAtual"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className="formGroup-price">
                                    <label htmlFor="precoPromocao">Preço Promoção:</label>
                                    <input
                                        className="input-style"
                                        type="number"
                                        id="precoPromocao"
                                        name="precoPromocao"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="container-type">
                                <div className="formGroup-price">
                                    <label htmlFor="tipo">Tipo:</label>
                                    <input className="input-style" id="tipo" name="tipo" required />
                                </div>
                                <div className="formGroup-price">
                                    <label htmlFor="descricao">Descrição:</label>
                                    <input className="input-style" id="descricao" name="descricao" required />
                                </div>
                            </div>
                            <div className="formGroup-date">
                                <label htmlFor="dataValidade">Data de Validade:</label>
                                <input
                                    className="input-style"
                                    type="date"
                                    id="dataValidade"
                                    name="dataValidade"
                                    required
                                />
                            </div>
                            <button type="submit" className="submitButton">Cadastrar</button>
                            <button type="button" onClick={closeCadastroModal} className="closeButton">Fechar</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default CadastroModal;

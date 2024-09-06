import React, { useState } from 'react';
import './CadastroModal.css'; // Importa o CSS

const CadastroModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        idade: '',
        tempoCliente: '',
        senha: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Erro ao cadastrar o cliente:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao cadastrar o cliente:', error);
        }
    };

    return (
        <div className="modalOverlay-client">
            <div className="modalContent-client">
                <h2>Cadastro de Cliente</h2>
                <form className='container-form' onSubmit={handleSubmit}>
                    <div className="formGroup-price">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            className='input-style'
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup-price">
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            className='input-style'
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='container-time'>
                        <div className="formGroup-price">
                            <label htmlFor="idade">Idade:</label>
                            <input
                                className='input-style'
                                type="number"
                                id="idade"
                                name="idade"
                                value={formData.idade}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="formGroup-price">
                            <label htmlFor="tempoCliente">Tempo de Cliente:</label>
                            <input
                                className='input-style'
                                id="tempoCliente"
                                name="tempoCliente"
                                value={formData.tempoCliente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="formGroup-price">
                        <label htmlFor="senha">Senha:</label>
                        <input
                            className='input-style'
                            type="password"
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submitButton">Cadastrar</button>
                    <button type="button" onClick={onClose} className="closeButton">Fechar</button>
                </form>
            </div>
        </div>
    );
};

export default CadastroModal;


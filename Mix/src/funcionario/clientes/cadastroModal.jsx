import React, { useState } from 'react';
import './CadastroModal.css'; 

const CadastroModal = ({ isOpen, onClose, onAddCliente }) => { // Recebe a função onAddCliente como prop
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
                const newCliente = await response.json();
                onAddCliente(newCliente); // Adiciona o novo cliente sem recarregar a página
                onClose();
            } else {
                console.error('Erro ao cadastrar o cliente:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao cadastrar o cliente:', error);
        }
    };

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <h2>Cadastro de Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="idade">Idade:</label>
                        <input
                            type="number"
                            id="idade"
                            name="idade"
                            value={formData.idade}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="tempoCliente">Tempo de Cliente:</label>
                        <input
                            type="text"
                            id="tempoCliente"
                            name="tempoCliente"
                            value={formData.tempoCliente}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="senha">Senha:</label>
                        <input
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

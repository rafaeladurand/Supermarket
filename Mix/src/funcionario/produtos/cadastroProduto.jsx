import React, { useState } from 'react';

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
                // Atualize a lista de clientes no componente pai se necessário
                onClose(); // Fechar o modal após o envio
            } else {
                console.error('Erro ao cadastrar o cliente:', await response.text());
            }
            window.location.reload()
        } catch (error) {
            console.error('Erro ao cadastrar o cliente:', error);
        }
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2>Cadastro de Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
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
                    <div style={styles.formGroup}>
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
                    <div style={styles.formGroup}>
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
                    <div style={styles.formGroup}>
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
                    <div style={styles.formGroup}>
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
                    <button type="submit" style={styles.submitButton}>Cadastrar</button>
                    <button type="button" onClick={onClose} style={styles.closeButton}>Fechar</button>
                </form>
            </div>
        </div>
    );
};

// Estilos em linha
const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '400px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    submitButton: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    closeButton: {
        padding: '10px 15px',
        backgroundColor: '#ccc',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default CadastroModal;

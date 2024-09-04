import React, { useEffect, useState } from 'react';
import CadastroModal from './cadastroModal'; // Modal de Cadastro
import Header from '../../componentes/header';

const Cliente = () => {
    const [clientes, setClientes] = useState([]);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [isDescontoModalOpen, setIsDescontoModalOpen] = useState(false);
    const [currentCliente, setCurrentCliente] = useState(null); // Estado para o cliente atual

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch('http://localhost:3001/cliente');
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                console.error('Erro ao buscar os clientes:', error);
            }
        };

        fetchClientes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/cliente/${id}`, {
                method: 'DELETE',
            });
            setClientes(clientes.filter(cliente => cliente._id !== id));
        } catch (error) {
            console.error('Erro ao excluir o cliente:', error);
        }
    };

    const handleEditDesconto = (cliente) => {
        setCurrentCliente(cliente);
        setIsDescontoModalOpen(true);
    };

    const handleUpdateDesconto = async (desconto) => {
        if (!currentCliente) return;

        try {
            const updatedCliente = { ...currentCliente, desconto };
            const response = await fetch(`http://localhost:3001/cliente/${updatedCliente._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCliente),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setClientes(clientes.map(cliente => cliente._id === updatedData._id ? updatedData : cliente));
                setIsDescontoModalOpen(false);
            } else {
                console.error('Erro ao atualizar o desconto:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao atualizar o desconto:', error);
        }
    };

    const closeCadastroModal = () => {
        setIsCadastroModalOpen(false);
    };

    const closeDescontoModal = () => {
        setIsDescontoModalOpen(false);
        setCurrentCliente(null);
    };

    return (
        <div>
            <Header />
            <div className="banner" style={{ position: 'relative' }}>
                <h1>TELA DE CLIENTE DO SISTEMA</h1>
                <button onClick={() => setIsCadastroModalOpen(true)} style={styles.addButton}>Cadastrar</button>
            </div>
            <div className="grid">
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {clientes.length > 0 ? (
                        clientes.map(cliente => (
                            <li key={cliente._id} style={{ marginBottom: '10px' }}>
                                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                                    <p><strong>Nome:</strong> {cliente.nome}</p>
                                    <p><strong>CPF:</strong> {cliente.cpf}</p>
                                    <p><strong>Idade:</strong> {cliente.idade}</p>
                                    <p><strong>Tempo de cliente:</strong> {cliente.tempoCliente}</p>
                                    <p><strong>Desconto:</strong> {cliente.desconto || 'N/A'}</p>

                                    <button onClick={() => handleEditDesconto(cliente)} style={{ marginRight: '10px' }}>Editar Desconto</button>
                                    <button onClick={() => handleDelete(cliente._id)} style={{ backgroundColor: 'red', color: 'white' }}>Excluir</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>Nenhum cliente encontrado.</li>
                    )}
                </ul>
            </div>
            <CadastroModal isOpen={isCadastroModalOpen} onClose={closeCadastroModal} />
            {isDescontoModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Editar Desconto</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const desconto = parseFloat(e.target.desconto.value);
                                handleUpdateDesconto(desconto);
                            }}
                        >
                            <div style={styles.formGroup}>
                                <label htmlFor="desconto">Desconto:</label>
                                <input
                                    type="number"
                                    id="desconto"
                                    name="desconto"
                                    step="0.01"
                                    defaultValue={currentCliente ? currentCliente.desconto || '' : ''}
                                    required
                                />
                            </div>
                            <button type="submit" style={styles.submitButton}>Atualizar</button>
                            <button type="button" onClick={closeDescontoModal} style={styles.closeButton}>Fechar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Estilos em linha
const styles = {
    addButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
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

export default Cliente;

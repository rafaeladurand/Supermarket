import React, { useEffect, useState } from 'react';
import CadastroModal from './CadastroCliente'; // Modal de Cadastro
import Header from '../../componentes/header';
import './Cliente.css'; // Importa o CSS

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
            <div className="banner">
                <h1>CLIENTES</h1>
                <button onClick={() => setIsCadastroModalOpen(true)} className="addButton">Cadastrar</button>
            </div>
            <div className="grid-container">
                {clientes.length > 0 ? (
                    clientes.map(cliente => (
                        <div key={cliente._id} className="client-card">
                            <p><strong>Nome:</strong> {cliente.nome}</p>
                            <p><strong>CPF:</strong> {cliente.cpf}</p>
                            <p><strong>Idade:</strong> {cliente.idade}</p>
                            <p><strong>Tempo de cliente:</strong> {cliente.tempoCliente} anos</p>
                            <p><strong>Desconto:</strong> {cliente.desconto || 'N/A'}</p>
    
                            <button onClick={() => handleEditDesconto(cliente)} className="edit-button">Editar Desconto</button>
                            <button onClick={() => handleDelete(cliente._id)} className="delete-button">Excluir</button>
                        </div>
                    ))
                ) : (
                    <p>Nenhum cliente encontrado.</p>
                )}
            </div>
            <CadastroModal isOpen={isCadastroModalOpen} onClose={closeCadastroModal} />
            {isDescontoModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h2>Editar Desconto</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const desconto = parseFloat(e.target.desconto.value);
                                handleUpdateDesconto(desconto);
                                window.location.reload();
                            }}
                        >
                            <div className="formGroup">
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
                            <button type="submit" className="submitButton">Atualizar</button>
                            <button type="button" onClick={closeDescontoModal} className="closeButton">Fechar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};    

export default Cliente;


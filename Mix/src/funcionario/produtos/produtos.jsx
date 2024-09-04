import React, { useEffect, useState } from 'react';
import Header from '../../componentes/header';

const Produto = () => {
    const [produtos, setProdutos] = useState([]);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [isDescontoModalOpen, setIsDescontoModalOpen] = useState(false);
    const [currentProduto, setCurrentProduto] = useState(null); // Estado para o produto atual

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3001/produto');
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error('Erro ao buscar os produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/produto/${id}`, {
                method: 'DELETE',
            });
            setProdutos(produtos.filter(produto => produto._id !== id));
        } catch (error) {
            console.error('Erro ao excluir o produto:', error);
        }
    };

    const handleEditDesconto = (produto) => {
        setCurrentProduto(produto);
        setIsDescontoModalOpen(true);
    };

    const handleUpdateDesconto = async (precoPromocao) => {
        if (!currentProduto) return;

        try {
            const updatedProduto = { ...currentProduto, precoPromocao };
            const response = await fetch(`http://localhost:3001/produto/${updatedProduto._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduto),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setProdutos(produtos.map(produto => produto._id === updatedData._id ? updatedData : produto));
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
        setCurrentProduto(null);
    };

    return (
        <div>
            <Header />
            <div className="banner" style={{ position: 'relative' }}>
                <h1>TELA DE PRODUTO DO SISTEMA</h1>
                <button onClick={() => setIsCadastroModalOpen(true)} style={styles.addButton}>Cadastrar</button>
            </div>
            <div className="grid">
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {produtos.length > 0 ? (
                        produtos.map(produto => (
                            <li key={produto._id} style={{ marginBottom: '10px' }}>
                                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                                    <p><strong>Nome:</strong> {produto.nome}</p>
                                    <p><strong>Preço Atual:</strong> {produto.precoAtual}</p>
                                    <p><strong>Preço Promoção:</strong> {produto.precoPromocao}</p>
                                    <p><strong>Tipo:</strong> {produto.tipo}</p>
                                    <p><strong>Descrição:</strong> {produto.descricao}</p>
                                    <p><strong>Data de Validade:</strong> {new Date(produto.dataValidade).toLocaleDateString()}</p>

                                    <button onClick={() => handleEditDesconto(produto)} style={{ marginRight: '10px' }}>Editar Promoção</button>
                                    <button onClick={() => handleDelete(produto._id)} style={{ backgroundColor: 'red', color: 'white' }}>Excluir</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>Nenhum produto encontrado.</li>
                    )}
                </ul>
            </div>

            {/* Modal de Cadastro */}
            {isCadastroModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Cadastro de Produto</h2>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = {
                                    nome: e.target.nome.value,
                                    precoAtual: parseFloat(e.target.precoAtual.value),
                                    precoPromocao: parseFloat(e.target.precoPromocao.value),
                                    tipo: e.target.tipo.value,
                                    descricao: e.target.descricao.value,
                                    dataValidade: e.target.dataValidade.value,
                                };

                                try {
                                    const response = await fetch('http://localhost:3001/produto', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(formData),
                                    });
                                    if (response.ok) {
                                        const newProduto = await response.json();
                                        setProdutos([...produtos, newProduto]);
                                        closeCadastroModal();
                                    } else {
                                        console.error('Erro ao cadastrar o produto:', await response.text());
                                    }
                                } catch (error) {
                                    console.error('Erro ao cadastrar o produto:', error);
                                }
                            }}
                        >
                            <div style={styles.formGroup}>
                                <label htmlFor="nome">Nome:</label>
                                <input type="text" id="nome" name="nome" required />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="precoAtual">Preço Atual:</label>
                                <input type="number" id="precoAtual" name="precoAtual" step="0.01" required />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="precoPromocao">Preço Promoção:</label>
                                <input type="number" id="precoPromocao" name="precoPromocao" step="0.01" required />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="tipo">Tipo:</label>
                                <input type="text" id="tipo" name="tipo" required />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="descricao">Descrição:</label>
                                <textarea id="descricao" name="descricao" required />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="dataValidade">Data de Validade:</label>
                                <input type="date" id="dataValidade" name="dataValidade" required />
                            </div>
                            <button type="submit" style={styles.submitButton}>Cadastrar</button>
                            <button type="button" onClick={closeCadastroModal} style={styles.closeButton}>Fechar</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Edição de Desconto */}
            {isDescontoModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Editar Promoção</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const precoPromocao = parseFloat(e.target.precoPromocao.value);
                                handleUpdateDesconto(precoPromocao);
                            }}
                        >
                            <div style={styles.formGroup}>
                                <label htmlFor="precoPromocao">Preço Promoção:</label>
                                <input
                                    type="number"
                                    id="precoPromocao"
                                    name="precoPromocao"
                                    step="0.01"
                                    defaultValue={currentProduto ? currentProduto.precoPromocao || '' : ''}
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

export default Produto;

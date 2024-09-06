import React, { useEffect, useState } from 'react';
import Header from '../../componentes/header';
import CadastroModal from './CadastroProduto'; // Importe o modal
import './Produtos.css';
import botaoEditar from '../../assets/lapis.png';

const Produto = () => {
    const [produtos, setProdutos] = useState([]);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [isDescontoModalOpen, setIsDescontoModalOpen] = useState(false);
    const [currentProduto, setCurrentProduto] = useState(null);

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
            window.location.reload();
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
            window.location.reload();
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

    const handleCadastroSubmit = async (e) => {
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
            window.location.reload();
        } catch (error) {
            console.error('Erro ao cadastrar o produto:', error);
        }
    };
    return (
        <div>
            <Header />
            <div className="banner" style={{ position: 'relative' }}>
                <h1>PRODUTOS</h1>
                <button onClick={() => setIsCadastroModalOpen(true)} className="addButton">Cadastrar</button>
            </div>
            <div className="grid-container">
                {produtos.length > 0 ? (
                    produtos.map(produto => (
                        <div key={produto._id} className="product-card">
                            <p><strong>Nome:</strong> {produto.nome}</p>
                            <p><strong>Preço Atual:</strong> {produto.precoAtual}</p>
                            <p><strong>Preço Promoção:</strong> {produto.precoPromocao}</p>
                            <p><strong>Tipo:</strong> {produto.tipo}</p>
                            <p><strong>Descrição:</strong> {produto.descricao}</p>
                            <p><strong>Data de Validade:</strong> {new Date(produto.dataValidade).toLocaleDateString()}</p>
    
                            <button onClick={() => handleEditDesconto(produto)} className="edit-button">Editar Preço </button>
                            <button onClick={() => handleDelete(produto._id)} className="delete-button">Excluir</button>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>
    
            <CadastroModal
                isOpen={isCadastroModalOpen}
                closeCadastroModal={closeCadastroModal}
                onSubmit={handleCadastroSubmit}
            />
    
            {isDescontoModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h2>Editar Promoção</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const precoPromocao = parseFloat(e.target.precoPromocao.value);
                                handleUpdateDesconto(precoPromocao);
                            }}
                        >
                            <div className="formGroup">
                                <label htmlFor="precoPromocao">Novo Preço Promoção:</label>
                                <input type="number" id="precoPromocao" name="precoPromocao" step="0.01" required />
                            </div>
                            <button type="submit" className="submitButton">Atualizar</button>
                            <button type="button" onClick={closeDescontoModal} className="closeButton">Fechar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}  

export default Produto;

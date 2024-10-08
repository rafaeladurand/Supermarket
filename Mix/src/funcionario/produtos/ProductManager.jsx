import React, { useEffect, useState } from 'react';
import { nookies, parseCookies } from 'nookies';
import Header from '../../componentes/header';
import CadastroModal from './CadastroProduto';
import './Produtos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';



const Produto = () => {
    const [produtos, setProdutos] = useState([]);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [isDescontoModalOpen, setIsDescontoModalOpen] = useState(false);
    const [currentProduto, setCurrentProduto] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const token = parseCookies().TOKEN;
                const response = await fetch('http://localhost:3001/produto', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
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
            const confirmAlert = confirm('Você tem certeza que quer excluir?');
            if (confirmAlert) {
                const token = parseCookies().TOKEN;
                await fetch(`http://localhost:3001/produto/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                setProdutos(produtos.filter(produto => produto._id !== id));
                window.location.reload();
            }
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
            const token = parseCookies().TOKEN;
            const updatedProduto = { ...currentProduto, precoPromocao };
            const response = await fetch(`http://localhost:3001/produto/${updatedProduto._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedProduto),
            });

            if (response.ok) {
                window.location.reload();
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

    const handleCadastroSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            nome: e.target.nome.value,
            precoAtual: parseFloat(e.target.precoAtual.value),
            precoPromocao: parseFloat(e.target.precoPromocao.value),
            tipo: e.target.tipo.value,
            descricao: e.target.descricao.value,
            dataValidade: e.target.dataValidade.value,
            image: e.target.image.value,
        };

        try {
            const token = parseCookies().TOKEN;
            const response = await fetch('http://localhost:3001/produto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                const newProduto = await response.json();
                setProdutos([...produtos, newProduto]);
            } else {
                console.error('Erro ao cadastrar o produto:', await response.text());
            }

        } catch (error) {
            console.error('Erro ao cadastrar o produto:', error);
        }
    };

    const filteredProdutos = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Header />
            <div className="banner" >
                <h1>PRODUTOS</h1>
                <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar produto pelo nome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
                <button onClick={() => setIsCadastroModalOpen(true)} className="addButton"> <FontAwesomeIcon icon={faPlus}/> </button>
            </div>

            

            <div className="grid-container">
                {filteredProdutos.length > 0 ? (
                    filteredProdutos.map(produto => (
                        <div key={produto._id} className="product-card">
                            <img
                                src={produto.image}
                                alt={produto.nome}
                                className="product-image"
                            />
                            <p><strong>Nome:</strong> {produto.nome}</p>
                            <p><strong>Preço Atual:</strong> {produto.precoAtual}</p>
                            <p><strong>Preço Promoção:</strong> {produto.precoPromocao}</p>
                            <p><strong>Tipo:</strong> {produto.tipo}</p>
                            <p><strong>Descrição:</strong> {produto.descricao}</p>
                            <p><strong>Data de Validade:</strong> {new Date(produto.dataValidade).toLocaleDateString()}</p>
                            <div className="button-container">
                            <button onClick={() => handleEditDesconto(produto)} className="edit-button"><FontAwesomeIcon icon={faEdit} /></button>
                            <button onClick={() => handleDelete(produto._id)} className="delete-button">  <FontAwesomeIcon icon={faTrash} /> </button>
                            </div>
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
                isSuccess={isSuccess}
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

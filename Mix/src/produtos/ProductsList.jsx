import React, { useEffect, useState } from 'react';
import './Produtos.css';

const ProductCard = ({ product }) => {
  const { nome, precoAtual, precoPromocao } = product;

  return (
    <div className="card">
      <h3 className="name">{nome}</h3>
      <p className="price">Preço Atual: R$ {precoAtual.toFixed(2)}</p>
      <p className="price">Preço Promoção: R$ {precoPromocao.toFixed(2)}</p>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/produto');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid">
      {products.map(product => (
      
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

import React, { useEffect, useState } from 'react';
import { nookies, parseCookies } from 'nookies';
import './Produtos.css';

const ProductCard = ({ product }) => {
  const { nome, precoAtual, precoPromocao, image } = product;

  return (
    <div className="card">

      <img
        src={image}
        alt={nome}
        className="product-image"
      />


      <h3 className="name">{nome}</h3>
      <p className={precoPromocao ? "current-price" : "without-price"}>R$ {precoAtual.toFixed(2)}</p>
      {precoPromocao && (<p className="price">R$ {precoPromocao.toFixed(2)}</p>)}
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = parseCookies().TOKEN
        const response = await fetch('http://localhost:3001/produto', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
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

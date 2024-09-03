import React, {  } from 'react'; 
import './produtos.css';

const ProductCard = ({ product }) => {
  const { name, price } = product;

  return (
    <div className="card">
      <h3 className="name">{name}</h3>
      <p className="price">R$ {price.toFixed(2)}</p>
    </div>
  );
};


const ProductList = () => {
  const products = [
    { id: 1, name: 'Azeite Português Extra Virgem Gallo 500ml', price: 20.49 },
    { id: 2, name: 'Bebida Energética Vibe 2L', price: 8.99 },
    { id: 3, name: 'Energético Red Bull Energy Drink 355ml', price: 10.79 },
  ];

  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

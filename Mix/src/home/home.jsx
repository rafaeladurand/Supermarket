import React, { } from 'react';
import Header from '../componentes/Header';
import './Home.css';
import ProductList from '../produtos/ProductsList';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="banner">
      </div>
      <ProductList />
    </div>
  );
}

export default Home;
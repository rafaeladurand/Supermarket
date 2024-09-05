import React, { } from 'react';
import './Home';
import Header from '../componentes/Header';
import ProductList from '../produtos/ProductsList';

const Cliente = () => {
    return (<div>
        <div>
            <Header />
            <div className="banner">
            </div>
            <ProductList />
        </div>
        <div className="grid"></div>
    </div>
    );
};

export default Cliente;


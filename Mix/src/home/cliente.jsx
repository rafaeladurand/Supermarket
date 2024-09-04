import React, { } from 'react';
import './home';
import Header from '../componentes/header';
import ProductList from '../produtos/produtos';

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


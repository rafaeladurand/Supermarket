import React, { } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './home/home';
import Login from './login/login';
import Usuario from './home/usuario';
import Cliente from './home/cliente';
import ClienteFuncionario from './funcionario/clientes/cliente';
import ClienteProduto from './funcionario/produtos/produtos';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/funcionario" element={<Usuario />} />
        <Route path="/cliente" element={<Cliente />} />

        <Route path="/funcionario/cliente" element={<ClienteFuncionario />} />
        <Route path="/funcionario/produto" element={<ClienteProduto />} />


      </Routes>
    </Router>
  );
}

export default App;

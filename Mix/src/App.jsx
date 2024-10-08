import React, { } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Welcome from './componentes/Welcome';
import Home from './home/Home';
import Login from './login/login';
import Usuario from './home/usuario';
import Cliente from './home/cliente';
import ClienteFuncionario from './funcionario/clientes/ClientManager'
import ProdutoFuncionario from './funcionario/produtos/ProductManager';
import UsuarioFuncionario from './funcionario/usuarios/userManager';


function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/funcionario" element={<Usuario />} />
        <Route path="/cliente" element={<Cliente />} />

        <Route path="/funcionario/cliente" element={<ClienteFuncionario />} />
        <Route path="/funcionario/produto" element={<ProdutoFuncionario />} />
        <Route path="/funcionario/usuario" element={<UsuarioFuncionario />} />

      </Routes>
    </Router>
  );
}

export default App;

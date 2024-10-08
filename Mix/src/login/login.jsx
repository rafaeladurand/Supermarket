import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import nookies from 'nookies';
import './Login.css';
import Header from './LoginHeader';

const Login = () => {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage('');
  
      try {
        const responseUsuario = await fetch('http://localhost:3001/auth/usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cpf, senha }),
        });
      
        const dataUsuario = await responseUsuario.json();
        nookies.set(null, 'TOKEN', dataUsuario.token)

        if (responseUsuario.ok) {
          navigate('/funcionario');

        } else if (!responseUsuario.ok) {      
          const responseCliente = await fetch('http://localhost:3001/auth/cliente', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf, senha }),
          });
  
          const dataCliente = await responseCliente.json();
          nookies.set(null, 'TOKEN', dataCliente.token)

          if (responseCliente.ok) {
            navigate('/cliente');
          } else {
            setMessage(dataCliente.message || 'Erro ao fazer login'); 
          }
        } else {
          setMessage(dataUsuario.message || 'Erro ao fazer login'); 
        }
      } catch (error) {
        setMessage('Erro ao conectar ao servidor');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className='container-main'>
        <Header />
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
    );
  }

  export default Login;
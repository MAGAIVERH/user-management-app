import React from 'react';
import { Link } from 'react-router-dom';
import '../global.css';

const Home = () => {
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ textAlign: 'center' }}>Bem-vindo ao nosso aplicativo</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <Link to="/login">
            <button style={{ width: '120px' }}>Login</button>
          </Link>
          <Link to="/cadastro">
            <button style={{ width: '120px', backgroundColor: 'var(--secondary-color)' }}>Cadastro</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
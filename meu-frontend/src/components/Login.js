import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api.js"
import '../global.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await api.post('/login', {username, password});
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao fazer login', error);
            setError('Erro ao fazer login. Verifique suas credenciais.');
        }
    }

    return (
        <div className="container">
            <div className="card">
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Login</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    Não tem uma conta? <Link to="/cadastro" style={{ color: 'var(--primary-color)' }}>Cadastre-se</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api.js"
import '../global.css';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await api.post('/cadastro', { username, password})
            alert("Registro realizado com sucesso")
            navigate('/login')
        } catch (error) {
            console.error('Erro ao registrar', error);
            setError('Erro ao registrar. Tente novamente.');
        }
    }

    return (
        <div className="container">
            <div className="card">
                <h2 style={{ textAlign: 'center' }}>Cadastro</h2>
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
                    <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Cadastrar</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    Já tem uma conta? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Faça login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
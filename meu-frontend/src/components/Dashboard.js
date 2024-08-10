import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api.js"
import '../global.css';

const Dashboard = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [showUsers, setShowUsers] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editUsername, setEditUsername] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/listar')
            setData(response.data.pegarUsuario)
            setShowUsers(true)
        } catch (error) {
            console.error('Erro ao buscar dados', error);
            alert('Erro ao buscar usuários. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    }  

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const getPartialToken = () => {
        const token = localStorage.getItem('token');
        return token ? token.slice(0, 10) + '...' : 'Token não encontrado';
    }

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
            try {
                await api.delete(`/delete/${id}`);
                fetchData();
            } catch (error) {
                console.error('Erro ao deletar usuário', error);
                alert('Erro ao deletar usuário. Por favor, tente novamente.');
            }
        }
    }

    const handleUpdate = async (id) => {
        try {
            await api.put(`/update/${id}`, { username: editUsername });
            setEditingId(null);
            fetchData();
        } catch (error) {
            console.error('Erro ao atualizar usuário', error);
            alert('Erro ao atualizar usuário. Por favor, tente novamente.');
        }
    }

    return (
        <div className="container" style={{ alignItems: 'flex-start', padding: '40px 20px' }}>
            <div className="card" style={{ maxWidth: '600px' }}>
                <h2 style={{ textAlign: 'center' }}>Dashboard</h2>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>Bem-vindo! Você está logado com sucesso.</p>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>Seu token (parcial): {getPartialToken()}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button onClick={handleLogout} style={{ backgroundColor: 'var(--error-color)' }}>Logout</button>
                    <button onClick={fetchData} disabled={loading}>
                        {loading ? 'Carregando...' : 'Listar Usuários'}
                    </button>
                </div>

                {showUsers && (
                    <div>
                        <h3>Lista de Usuários:</h3>
                        {data.length > 0 ? (
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {data.map((item) => (
                                    <li key={item._id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                                        {editingId === item._id ? (
                                            <>
                                                <input 
                                                    value={editUsername}
                                                    onChange={(e) => setEditUsername(e.target.value)}
                                                    style={{ marginBottom: '5px' }}
                                                />
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <button onClick={() => handleUpdate(item._id)} style={{ backgroundColor: 'var(--success-color)' }}>Salvar</button>
                                                    <button onClick={() => setEditingId(null)} style={{ backgroundColor: 'var(--secondary-color)' }}>Cancelar</button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <span>{item.username}</span>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                                    <button onClick={() => {
                                                        setEditingId(item._id);
                                                        setEditUsername(item.username);
                                                    }} style={{ backgroundColor: 'var(--secondary-color)' }}>Editar</button>
                                                    <button onClick={() => handleDelete(item._id)} style={{ backgroundColor: 'var(--error-color)' }}>Deletar</button>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nenhum usuário encontrado.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard;
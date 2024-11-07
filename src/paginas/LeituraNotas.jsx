import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenssagemErro from './componentes/MenssagemErro';

function LeituraNotas() {
    const [notas, setNotas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotas();
    }, []);

    const fetchNotas = () => {
        setError(null); // Limpa o erro antes de fazer nova tentativa
        fetch('http://127.0.0.1:5000/')
            .then((response) => response.json())
            .then((data) => setNotas(data.Notas))
            .catch(() => setError('Erro ao carregar notas'));
    };

    const removerNota = (id) => {
        fetch(`http://127.0.0.1:5000/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                fetchNotas();
            } else {
                setError('Erro ao deletar nota');
            }
        })
        .catch(() => setError('Erro ao deletar nota: verifique a conexão'));
    };

    return (
        <div className="container">
            <h1>Leitura de Notas</h1>
            {error && <MenssagemErro message={error} />}
            <Link to="/adicionar">
                <button className="adicionar">Adicionar Nota</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Texto</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {notas.map((nota) => (
                        <tr key={nota.id}>
                            <td>{nota.titulo}</td>
                            <td>{nota.texto}</td>
                            <td>
                                <Link to={`/editar/${nota.id}`}>
                                    <button className="salvar">Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button className="deletar" onClick={() => removerNota(nota.id)}>
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeituraNotas;

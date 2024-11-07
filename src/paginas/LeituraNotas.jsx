import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenssagemErro from './componentes/MenssagemErro';

function LeituraNotas() {
    const [notas, setNotas] = useState([]);
    const [error, setError] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(''); // Novo estado para feedback

    useEffect(() => {
        fetchNotas();
    }, []);

    const fetchNotas = () => {
        fetch('http://127.0.0.1:5000/')
            .then((response) => response.json())
            .then((data) => setNotas(data.Notas))
            .catch(() => setError('Erro ao carregar notas'));
    };

    const remocaoNota = (id) => {
        fetch('http://127.0.0.1:5000/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })
        .then(response => {
            if (response.ok) {
                setFeedbackMessage('Nota deletada com sucesso!');
                fetchNotas(); // Atualiza as notas após a exclusão
            } else {
                setFeedbackMessage('Erro ao deletar nota. Verifique o ID.');
            }
        })
        .catch(() => {
            setFeedbackMessage('Erro ao deletar nota: verifique a conexão');
        });

        // Limpa a mensagem após alguns segundos
        setTimeout(() => setFeedbackMessage(''), 3000);
    };

    return (
        <div className="container">
            <h1>Bloco de Notas</h1>
            {error && <MenssagemErro message={error} />}
            {feedbackMessage && <div className="feedback">{feedbackMessage}</div>}
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
                                <button
                                    className="deletar"
                                    onClick={() => remocaoNota(nota.id)}
                                >
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
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LeituraNotas() {
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        fetchNotas();
    }, []);

    const fetchNotas = () => {
        fetch('http://127.0.0.1:5000/')
            .then((response) => response.json())
            .then((data) => setNotas(data.Notas))
            .catch((error) => console.error('Erro ao carregar notas:', error));
    };

    const removerNota = (id) => {
        fetch('http://127.0.0.1:5000/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then((response) => {
                if (response.ok) {
                    fetchNotas();
                } else {
                    console.error('Erro ao deletar nota.');
                }
            })
            .catch((error) => console.error('Erro ao deletar nota:', error));
    };

    return (
        <div className="container">
            <h1>Leitura de Notas</h1>
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
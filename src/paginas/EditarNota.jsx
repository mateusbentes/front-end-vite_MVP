import React, { useState, useEffect } from 'react';
import FormularioNota from './componentes/FormularioNota';
import { useNavigate, useParams } from 'react-router-dom';

function EditarNota() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:5000/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setTitulo(data.titulo);
                setTexto(data.texto);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao carregar a nota:', error);
                setLoading(false);
            });
    }, [id]);

    const editarNota = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`http://127.0.0.1:5000/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, titulo, texto }),
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/'); // Redireciona após edição bem-sucedida
                } else {
                    console.error('Erro ao editar nota');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao editar nota:', error);
                setLoading(false);
            });
    };

    return (
        <div className="App">
            <h1>Editar Nota</h1>
            <FormularioNota
                titulo={titulo}
                setTitulo={setTitulo}
                texto={texto}
                setTexto={setTexto}
                onSubmit={editarNota}
                loading={loading}
                buttonLabel="Editar"
            />
        </div>
    );
}

export default EditarNota;
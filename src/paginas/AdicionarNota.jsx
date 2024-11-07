import React, { useState } from 'react';
import FormularioNota from './componentes/FormularioNota';
import { useNavigate } from 'react-router-dom';

function AdicionarNota() {
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const adicionarNota = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, texto }),
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/'); // Redireciona após adicionar a nota
                } else {
                    console.error('Erro ao adicionar nota');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao adicionar nota:', error);
                setLoading(false);
            });
    };

    return (
        <div className="App">
            <h1>Adicionar Nota</h1>
            <FormularioNota
                titulo={titulo}
                setTitulo={setTitulo}
                texto={texto}
                setTexto={setTexto}
                onSubmit={adicionarNota}
                loading={loading}
                buttonLabel="Adicionar"
            />
        </div>
    );
}

export default AdicionarNota;
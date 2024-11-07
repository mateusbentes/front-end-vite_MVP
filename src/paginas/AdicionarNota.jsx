import React, { useState } from 'react';
import FormularioNota from './componentes/FormularioNota';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './componentes/CarregandoSpinner';
import MenssagemErro from './componentes/MenssagemErro';

function AdicionarNota() {
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const adicionarNota = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, texto }),
        })
        .then((response) => {
            setLoading(false);
            if (response.ok) {
                navigate('/');
            } else {
                setError('Erro ao adicionar nota: verifique a resposta do servidor');
            }
        })
        .catch(() => {
            setLoading(false);
            setError('Erro ao adicionar nota: verifique a conexão');
        });
    };

    return (
        <div className="App">
            <h1>Adicionar Nota</h1>
            {loading && <LoadingSpinner />}
            {error && <MenssagemErro message={error} />}
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
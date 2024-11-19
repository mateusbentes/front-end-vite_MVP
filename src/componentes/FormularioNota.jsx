import React from 'react';

function FormularioNota({ titulo, setTitulo, texto, setTexto, onSubmit, loading, buttonLabel }) {
    return (
        <form onSubmit={onSubmit} id="notaForm">
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título"
                required
            />
            <input
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Texto"
                required
            />
            <button type="submit" className="salvar" disabled={loading || !titulo || !texto}>
                {buttonLabel}
            </button>
        </form>
    );
}

export default FormularioNota;
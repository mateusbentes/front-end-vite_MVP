import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LeituraNotas from './paginas/LeituraNotas';
import AdicionarNota from './paginas/AdicionarNota';
import EditarNota from './paginas/EditarNota';

function App() {
  return (
    <div className="App">
      {/* Definição das rotas */}
      <Routes>
        <Route path="/" element={<LeituraNotas />} />
        <Route path="/adicionar" element={<AdicionarNota />} />
        <Route path="/editar/:id" element={<EditarNota />} />
      </Routes>
    </div>
  );
}

export default App;
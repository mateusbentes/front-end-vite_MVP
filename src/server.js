const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

// Defina o diretório para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Permite que o Express entenda JSON no corpo das requisições

// Caminho para o arquivo JSON onde as notas serão armazenadas
const notasFilePath = path.join(__dirname, 'notas.json');

// Função para ler as notas do arquivo JSON
const readNotas = () => {
  if (fs.existsSync(notasFilePath)) {
    const data = fs.readFileSync(notasFilePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

// Rota para obter todas as notas
app.get('/api/notas', (req, res) => {
  const notas = readNotas();
  res.json(notas);
});

// Rota para adicionar uma nova nota
app.post('/api/notas', (req, res) => {
  const { titulo, texto } = req.body;
  const notas = readNotas();
  
  // Cria uma nova nota com um ID único
  const novaNota = { id: Date.now(), titulo, texto };
  notas.push(novaNota);
  
  // Salva as notas de volta no arquivo JSON
  fs.writeFileSync(notasFilePath, JSON.stringify(notas, null, 2));
  
  res.status(201).json(novaNota);
});

// Rota para editar uma nota existente
app.put('/api/notas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, texto } = req.body;
  const notas = readNotas();
  
  // Encontra a nota com o ID correspondente e a atualiza
  const notaIndex = notas.findIndex(nota => nota.id === parseInt(id));
  if (notaIndex === -1) {
    return res.status(404).json({ message: 'Nota não encontrada' });
  }

  notas[notaIndex] = { id: parseInt(id), titulo, texto };
  
  // Salva as notas atualizadas no arquivo JSON
  fs.writeFileSync(notasFilePath, JSON.stringify(notas, null, 2));
  
  res.json(notas[notaIndex]);
});

// Rota para deletar uma nota
app.delete('/api/notas/:id', (req, res) => {
  const { id } = req.params;
  const notas = readNotas();
  
  // Filtra a nota com o ID fornecido
  const novasNotas = notas.filter(nota => nota.id !== parseInt(id));
  if (novasNotas.length === notas.length) {
    return res.status(404).json({ message: 'Nota não encontrada' });
  }

  // Salva a nova lista de notas no arquivo JSON
  fs.writeFileSync(notasFilePath, JSON.stringify(novasNotas, null, 2));
  
  res.status(204).send();
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

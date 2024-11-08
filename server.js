const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// Habilitar o CORS
app.use(cors({
  origin: '*', // Permite qualquer origem
}));

// Usando Body Parser para lidar com o corpo das requisições
app.use(bodyParser.json());

// Caminho do arquivo JSON onde as notas serão armazenadas
const arquivoNotas = './notas.json';

// Array para armazenar notas temporariamente (poderia ser um banco de dados)
let notas = [];

// Função para salvar as notas em um arquivo JSON
function salvarNotasEmArquivo() {
  fs.writeFileSync(arquivoNotas, JSON.stringify({ Notas: notas }, null, 2), 'utf-8');
}

// Função para carregar as notas de um arquivo JSON
function carregarNotasDoArquivo() {
  // Verifica se o arquivo existe
  if (fs.existsSync(arquivoNotas)) {
    try {
      const dados = fs.readFileSync(arquivoNotas, 'utf-8');
      notas = JSON.parse(dados).Notas;
    } catch (err) {
      console.error("Erro ao carregar notas:", err);
      notas = []; // Se o arquivo não for válido, começa com um array vazio
    }
  } else {
    // Se o arquivo não existir, cria um arquivo vazio
    salvarNotasEmArquivo();
  }
}

// Função para obter todas as notas
const obterTodasNotas = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(notas);
    } catch (err) {
      reject(err);
    }
  });
};

// Função para adicionar uma nova nota
const adicionarNota = (titulo, texto) => {
  return new Promise((resolve, reject) => {
    const novaNota = { 
      id: notas.length + 1, // Gerando um ID simples (pode ser alterado)
      titulo,
      texto 
    };
    notas.push(novaNota);
    
    // Atualizando o arquivo JSON
    salvarNotasEmArquivo();

    resolve(novaNota);
  });
};

// Função para editar uma nota existente
const editarNota = (id, titulo, texto) => {
  return new Promise((resolve, reject) => {
    const idInt = parseInt(id, 10); // Garantir que o id seja numérico
    const notaIndex = notas.findIndex(nota => nota.id === idInt);
    if (notaIndex === -1) {
      reject(new Error('Nota não encontrada'));
    } else {
      notas[notaIndex] = { id: idInt, titulo, texto }; // Garantindo que o id seja numérico
      salvarNotasEmArquivo(); // Atualizando o arquivo JSON
      resolve(notas[notaIndex]);
    }
  });
};

// Função para deletar uma nota
const deletarNota = (id) => {
  return new Promise((resolve, reject) => {
    const idInt = parseInt(id, 10); // Garantir que o id seja numérico
    const novaListaNotas = notas.filter(nota => nota.id !== idInt);

    // Atualizando o arquivo JSON
    salvarNotasEmArquivo();

    resolve({ id });
  });
};

// Rota para obter todas as notas
app.get('/', async (req, res) => {
  try {
    const todasNotas = await obterTodasNotas();
    res.status(200).json({ Notas: todasNotas });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter as notas', error });
  }
});

// Rota para adicionar uma nova nota
app.post('/', async (req, res) => {
  const { titulo, texto } = req.body;
  try {
    const novaNota = await adicionarNota(titulo, texto);
    res.status(201).json(novaNota);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar a nota', error });
  }
});

// Rota para editar uma nota
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, texto } = req.body;
  try {
    const notaEditada = await editarNota(id, titulo, texto);
    res.status(200).json(notaEditada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar a nota', error });
  }
});

// Rota para deletar uma nota
app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deletarNota(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a nota', error });
  }
});

// Carregar as notas do arquivo JSON ao iniciar o servidor
carregarNotasDoArquivo();

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

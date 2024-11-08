const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// Habilitar o CORS
app.use(cors({
  origin: '*', // Permite qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite todos os métodos necessários
}));

// Usando Body Parser para lidar com o corpo das requisições
app.use(bodyParser.json());

// Caminho do arquivo JSON onde as notas serão armazenadas
const arquivoNotas = './notas.json';

// Array para armazenar notas temporariamente (poderia ser um banco de dados)
let notas = [];

// Verifica se o arquivo existe e se tem permissão para leitura e escrita
fs.access(arquivoNotas, fs.constants.F_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error('Arquivo não encontrado ou sem permissão para escrita.');
    // Cria o arquivo se ele não existir
    fs.writeFileSync(arquivoNotas, JSON.stringify({ Notas: [] }, null, 2), 'utf-8');
  } else {
    console.log('Arquivo existe e tem permissão para escrita.');
  }
});

// Função para salvar as notas em um arquivo JSON
function salvarNotasEmArquivo() {
  fs.writeFileSync(arquivoNotas, JSON.stringify({ Notas: notas }, null, 2), 'utf-8');
}

// Função para carregar as notas de um arquivo JSON
function carregarNotasDoArquivo() {
  if (fs.existsSync(arquivoNotas)) {
     // Verifica se o arquivo existe
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

// Função para deletar uma nota com base no ID
function deletarNota(id) {
  return new Promise((resolve, reject) => {
    const notaIndex = notas.findIndex(nota => nota.id === parseInt(id));
    if (notaIndex !== -1) {
      notas.splice(notaIndex, 1);
      salvarNotasEmArquivo();
      resolve();
    } else {
      reject(new Error('Nota não encontrada'));
    }
  });
}

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
app.put('/', async (req, res) => {
  const { id, titulo, texto } = req.body; // Agora pega o id do corpo da requisição
  try {
    const notaIndex = notas.findIndex(nota => nota.id === parseInt(id));
    if (notaIndex === -1) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    notas[notaIndex] = { ...notas[notaIndex], titulo, texto };
    salvarNotasEmArquivo();
    res.status(200).json(notas[notaIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar a nota', error: error.message });
  }
});

// Rota para deletar uma nota
app.delete('/', async (req, res) => {
  const { id } = req.body; // Agora pega o id do corpo da requisição
  try {
    await deletarNota(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a nota', error: error.message });
  }
});

// Carregar as notas do arquivo JSON ao iniciar o servidor
carregarNotasDoArquivo();

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
